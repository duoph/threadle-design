"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/useUser';
// import NextNProgress from 'nextjs-progressbar';

import axios from 'axios';
import { Cart } from '@/types';


const Header = () => {



    const { LogOut, currentUser, cartItemCountFetch, cartCount } = useUser()

    const router = useRouter()


    const onAccountClick = () => {
        try {

            if (!currentUser) {
                return router.push('/account')
            }

            if (currentUser?.token && currentUser.isAdmin === true) {
                return router.push('/admin-panel/orders')
            }

            if (currentUser?.token && currentUser.isAdmin === false) {
                return router.push(`/account/${currentUser.userId}`)
            }


        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        -
            cartItemCountFetch()
    }, [])

    return (
        <div className='bg-td-secondary flex h-[80px] items-center justify-between px-3 lg:px-10 w-full fixed top-0 z-[500] shadow-xl'>
            <Link href={"/"} className='relative w-[70px] h-[70px]' >
                <Image priority={true} src={'/td-white.png'} alt='Threadle Design' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </Link>
            <div className='flex items-center justify-center gap-2'>
                <CiSearch onClick={() => router.push('/shop')} className='text-white cursor-pointer' size={24} />
                {currentUser?.isAdmin === false && (
                    <div className='relative cursor-pointer'>
                        <span className='absolute p-1 px-2 text-xs bg-red-800 rounded-full -right-2 -top-2 text-white'>{cartCount || "0"}</span>
                        <CiShoppingCart onClick={() => router.push('/cart')} className='text-white ' size={24} />
                    </div>
                )}
                <CiUser onClick={onAccountClick} className='text-white cursor-pointer' size={24} />
            </div>
            {/* <NextNProgress /> */}
        </div>
    )
}

export default Header