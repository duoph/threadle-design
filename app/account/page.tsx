"use client"

import { useUser } from '@/context/useUser'
import { useRouter } from 'next/navigation'
import React from 'react'

const Account = () => {


    const { currentUser } = useUser()


    const router = useRouter()


    if (currentUser?.token && currentUser.isAdmin === true) {
        return router.push('/admin-panel')
    }

    if (currentUser?.token && currentUser.isAdmin === false) {
        return router.push(`/account/${currentUser.userId}`)
    }


    return (
        <div className='flex gap-3 items-center justify-center h-[70vh] bg-td-secondary'>
            <div className='flex gap-3 flex-col items-center justify-center w-[300px] px-10 pb-10  bg-white rounded-2xl'>

                <h1 className='py-5 font-bold text-[20px] text-td-secondary'>Join Now</h1>

                <button onClick={() => router.push('/account/login')} className='px-5 py-3 w-full rounded-2xl border bg-td-secondary text-white font-semibold'>Login</button>
                {/* <span className=''>Or</span> */}
                <button onClick={() => router.push('/account/create-account')} className='px-5 py-3 w-full rounded-2xl border bg-td-secondary text-white font-semibold'>Register</button>
            </div>
        </div>
    )
}
export default Account