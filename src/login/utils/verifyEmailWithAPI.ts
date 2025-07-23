import axios from 'axios';

export async function verifyEmailWithAPI(email: string): Promise<boolean> {
  try {
    const response = await axios.get(`https://api.eva.pingutil.com/email?email=${email}`);
     return response.data?.data?.deliverable === true;
  } catch (error) {
    console.error('Email verification failed:', error.message);
    return false;
  }
}
