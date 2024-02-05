"use client"

import React from 'react'
import Image from 'next/image';
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/useUser';


const Header = () => {

    const { LogOut, currentUser } = useUser()

    const router = useRouter()

    const onAccountClick = () => {
        try {

            if (!currentUser) {
                return router.push('/account')
            }

            if (currentUser?.token && currentUser.isAdmin === true) {
                return router.push('/admin-panel')
            }

            if (currentUser?.token && currentUser.isAdmin === false) {
                return router.push(`/account/${currentUser.userId}`)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-td-secondary flex items-center justify-between px-3 lg:px-10'>
            <Link href={"/"} className=''>
                <Image src={'/td-white.png'} alt='Threadle Design' height={80} width={80} />
            </Link>
            <div className='flex items-center justify-center gap-2'>
                <CiSearch onClick={() => router.push('/search')} className='text-white cursor-pointer' size={24} />
                <CiShoppingCart onClick={() => router.push('/cart')} className='text-white cursor-pointer' size={24} />
                <CiUser onClick={onAccountClick} className='text-white cursor-pointer' size={24} />
            </div>
        </div>
    )
}

export default Header