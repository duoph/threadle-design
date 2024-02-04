"use client"

import { useUser } from '@/context/useUser'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const UserProfile = () => {

    const router = useRouter()
    const { LogOut, currentUser } = useUser()


    const { userId } = useParams()

    console.log(userId)


    if (currentUser?.token && currentUser.isAdmin === true) {
        return router.push('/admin-panel')
    }

    if (!currentUser?.token) {
        return router.push(`/account/login`)
    }

    return (
        <div className='flex flex-col items-center justify-center gap-3'>
            <h1 className='px-5 py-3 text-center rounded-2xl text-[20px] text-td-secondary font-bold'>This is user {userId}</h1>
            <input type="text" value={currentUser.email} disabled className='border px-5 py-2 rounded-2xl bg-slate-200' />
            <input type="text" value={currentUser.phone} disabled className='border px-5 py-2 rounded-2xl bg-slate-200' />
           
            <button onClick={LogOut} className='px-5 rounded-2xl py-3 border bg-red-700 text-white font-bold'>LogOutt</button>
        </div>
    )
}

export default UserProfile