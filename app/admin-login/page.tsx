
"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const LoginPageAdmin = () => {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [admin, setAdmin] = useState<[]>()

  const router = useRouter()


  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return toast.error("Enter valid credentials")
      }

      const response = await axios.post('/api/admin-login', {
        email, password
      })

      if (response?.data?.success === true) {
        console.log(response)
        setAdmin(admin)
        axios.defaults.headers.common['Authorization'] = response?.data?.token;
        router.push('/admin-panel')
        toast.success("Login successful");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error unable to login");
    }
  };

  console.log(password)
  console.log(email)

  return (
    <div className='bg-td-secondary h-[70vh] flex items-center justify-center'>
      <div className='flex bg-white flex-col gap-10 items-center justify-center w-[350px] md:px-10 py-10 px-5 rounded-2xl'>
        <div>
          <h1 className='font-bold text-[30px] text-td-secondary'>Login As Admin</h1>
        </div>
        <div className='flex flex-col gap-3  w-full'>
          <input type="text" placeholder='Email' className='border px-5 py-2 rounded-2xl bg-slate-200' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' className='border px-5 py-2 rounded-2xl bg-slate-200' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className='bg-td-secondary rounded-2xl px-3 py-3 text-white font-semibold hover:bg-td-primary'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPageAdmin