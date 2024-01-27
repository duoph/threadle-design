
"use client"

import React, { useState } from 'react'

const LoginPageAdmin = () => {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()


  const handleLogin = () => {
    try {

    } catch (error) {

    }
  }

  console.log(password)
  console.log(email)

  return (
    <div className='flex flex-col gap-10 items-center justify-center w-full md:px-10 px-5 py-[200px]'>
      <div>
        <h1 className='font-bold text-[30px] text-td-secondary'>Login As Admin</h1>
      </div>
      <div className='flex flex-col gap-3 md:w-[400px] w-full'>
        <input type="text" placeholder='Email' className='border px-5 py-2 rounded-2xl bg-slate-200' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className='border px-5 py-2 rounded-2xl bg-slate-200' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} className='bg-td-secondary rounded-2xl px-3 py-3 text-white font-semibold hover:bg-td-primary'>Login</button>
      </div>
    </div>
  )
}

export default LoginPageAdmin