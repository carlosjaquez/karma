import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await axios.get('/api/login');
        window.location.href = response.data.loginUrl;
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    handleLogin();
  }, []);

  return null;
};

export default Login;
