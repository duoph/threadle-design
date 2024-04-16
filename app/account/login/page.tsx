"use client"

import { useUser } from '@/context/useUser';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';


const LoginPageAdmin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setCurrentUser, currentUser } = useUser()

  const router = useRouter();



  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (!email || !password) {
        setIsLoading(false);
        toast.error('Enter valid credentials');
        return;
      }

      const response = await axios.post('/api/login', {
        email,
        password,
      });


      if (response.data.success === false) {
        setIsLoading(false);
        toast.error(response.data.message);
      } else {
        setIsLoading(false);
        console.log(response.data.userDetails)

        setCurrentUser(response.data.userDetails)

        localStorage.setItem('currentUser', JSON.stringify(response.data.userDetails));


        if (response.data.userDetails.isAdmin) {
          router.push('/admin-panel/orders');
          toast.success(response.data.message);
        } else {
          router.push('/shop');
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error during login:', error);
      toast.error('Error unable to login');
    }
  };



  if (currentUser?.token && currentUser.isAdmin === true) {
    return router.push('/admin-panel/orders')
  }

  if (currentUser?.token && currentUser.isAdmin === false) {
    return router.push(`/account/${currentUser.userId}`)
  }





  return (
    <div className='bg-td-secondary py-10 flex items-center justify-center px-5'>
      <div className='flex bg-white flex-col gap-5 items-center justify-center w-full md:w-[350px] md:px-10 py-10 px-5 rounded-2xl'>
        <div>
          <h1 className='font-bold text-[30px] text-td-secondary'>Login</h1>
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <input type="text" placeholder='Email' className='border px-5 py-2 rounded-2xl bg-slate-200' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' className='border px-5 py-2 rounded-2xl bg-slate-200' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className='bg-td-secondary rounded-2xl h-12  px-3 py-3 text-white font-semibold'>
            {isLoading && (
              <PulseLoader color="#ffffff" size={15} />
            )}
            {!isLoading && (
              <span onClick={handleLogin} className="text-[15px] w-full">Login</span>
            )}
          </button>
          <span className='text-center text-sm'>Don&apos;t have an account?<span className='cursor-pointer text-blue-900 underline' onClick={() => router.push('/account/create-account')}>Create Account</span></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPageAdmin;
