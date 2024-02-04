"use client"

import { useUser } from '@/context/useUser'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserProfile = () => {

    const router = useRouter()
    const { LogOut, currentUser } = useUser()



    if (currentUser?.token && currentUser.isAdmin === true) {
        return router.push('/admin-panel')
    }

    if (!currentUser?.token) {
        return router.push(`/account/login`)
    }

    return (
        <div className='flex flex-col items-center justify-center gap-3'>
            <p className='px-5 py-3 text-center rounded-2xl text-td-secondary font-bold'>This is user Profile</p>
            <button onClick={LogOut} className='px-5 rounded-2xl py-3 border bg-red-700 text-white font-bold'>LogOutt</button>
        </div>
    )
}

export default UserProfile