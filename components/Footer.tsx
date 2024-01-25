"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {

    const router = useRouter()

    return (
        <div className='h-[100px] bg-slate-400 w-full'>
            <h1 className='font-bold text-[30px] text-center'>Threadle Design</h1>
            <p onClick={() => router.push('/admin-panel')} className='text-center cursor-pointer'>Admin Pannel</p>
        </div>
    )
}

export default Footer