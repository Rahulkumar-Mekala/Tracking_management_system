import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { config } from 'dotenv';
import { eq } from 'drizzle-orm';
import * as nodemailer from 'nodemailer';
import * as speakeasy from 'speakeasy';
import { db } from 'src/db/db.connection';
import { User } from 'src/db/schema';
import * as fs from 'fs';
import * as path from 'path';
import { LoginService } from 'src/login/login.service';


config(); // load .env

interface OtpStorage {
  [email: string]: {
    secret: string;
    expiresAt: number;
    userData: {
      fullname: string;
      phone: string;
      profile_url: string;
      DateofBirth: string;
      Gender: string;
    };
  };
}

@Injectable()
export class ProfileService {
  private readonly uploadPath = path.join(
    'C:/Users/Public/Downloads',
    'CommentImages',
  );

  private otpStore: OtpStorage = {};

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  constructor(private readonly service: LoginService) {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
      console.log('Image upload folder created:', this.uploadPath);
    }
  }

  async sendOtpToEmail(
    fullname: string,
    phone: string,
    profile_url: Express.Multer.File,
    email: string,
    DateofBirth: string,
    Gender: string,
  ) {
    // Save profile image
    const filename = `${Date.now()}-${profile_url.originalname}`;
    const filepath = path.join(this.uploadPath, filename);
    fs.writeFileSync(filepath, profile_url.buffer);

    // Check if user already exists
    const existing = await db
      .select()
      .from(User)
      .where(eq(User.email, email));
    if (existing.length > 0) {
      throw new BadRequestException('Email already exists');
    }

    // Generate OTP and save in memory
    const secret = speakeasy.generateSecret().base32;
    const otp = speakeasy.totp({
      secret,
      encoding: 'base32',
      step: 300,
    });

    const expiresAt = Date.now() + 5 * 60 * 1000;

    this.otpStore[email] = {
      secret,
      expiresAt,
      userData: {
        fullname,
        phone,
        profile_url: filename,
        DateofBirth,
        Gender,
      },
    };

    // Validate email using Abstract API
    // const isvalid = await verifyEmailWithAPI(email);
    // if (!isvalid) {
    //   delete this.otpStore[email];
    //   throw new BadRequestException('Invalid email address. OTP not sent.');
    // }

    // Send OTP email
    try {
      await this.transporter.sendMail({
        from: `"Profile Verification" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      delete this.otpStore[email];
      throw new BadRequestException(
        'Failed to send OTP email. Please check the email address.',
      );
    }

    return { message: 'OTP sent to email' };
  }

  async verifyOtp(phone: string, email: string, userOtp: string) {
    const record = this.otpStore[email];
    if (!record) {
      throw new BadRequestException('OTP not sent to this email');
    }

    if (Date.now() > record.expiresAt) {
      delete this.otpStore[email];
      throw new BadRequestException('OTP expired');
    }

    const isValid = speakeasy.totp.verify({
      secret: record.secret,
      encoding: 'base32',
      token: userOtp,
      step: 300,
      window: 1,
    });

    if (!isValid) {
      throw new BadRequestException('Invalid OTP');
    }

    const { fullname, DateofBirth, Gender } = record.userData;

    await db.update(User).set({fullname,email,DateofBirth,Gender,Update_At: new Date(),}).where(eq(User.phone, phone));

    delete this.otpStore[email];
    return {
      message: 'OTP verified successfully',
    };
  }
}
