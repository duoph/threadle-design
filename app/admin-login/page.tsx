"use client"

import { useEffect } from 'react';
// import { useAdmin } from '@/context/admin';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface AdminData {
  _id: string;
  email: string;
  token: string;
}

const LoginPageAdmin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [admin, setAdmin] = useState<AdminData | undefined>();
  const router = useRouter();
  // const { admin: adminDetails } = useAdmin();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return toast.error('Enter valid credentials');
      }

      const response: AxiosResponse<{ success: boolean; data: AdminData; token: string }> = await axios.post('/api/admin-login', {
        email,
        password,
      });

      console.log(response);

      if (response?.data?.success === true) {
        const adminData = {
          _id: response.data.data._id,
          email: response.data.data.email,
          token: response.data.data.token,
        };

        // Save admin data in local storage
        // localStorage.setItem('admin', JSON.stringify(adminData));

        // Update the state with the admin data
        setAdmin(adminData);

        // Set Axios default headers with the token
        axios.defaults.headers.common['Authorization'] = adminData.token;

        toast.success('Login successful');
        router.push('/admin-panel')
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Error unable to login');
    }
  };

  // useEffect(() => {
  //   if (adminDetails.token) {
  //     try {
  //       router.push('/admin-panel');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [adminDetails.token, router]);

  return (
    <div className='bg-td-secondary h-[70vh] flex items-center justify-center'>
      <div className='flex bg-white flex-col gap-10 items-center justify-center w-[350px] md:px-10 py-10 px-5 rounded-2xl'>
        <div>
          <h1 className='font-bold text-[30px] text-td-secondary'>Login As Admin</h1>
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <input type="text" placeholder='Email' className='border px-5 py-2 rounded-2xl bg-slate-200' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' className='border px-5 py-2 rounded-2xl bg-slate-200' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className='bg-td-secondary rounded-2xl px-3 py-3 text-white font-semibold hover:bg-td-primary'>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPageAdmin;
