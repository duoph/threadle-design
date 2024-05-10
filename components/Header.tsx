"use client"


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/useUser';

import UserSliderMenu from './Header/UserSliderMenu';
import AdminSliderMenu from './Header/AdminSliderMenu';



const Header = () => {

    const { LogOut, currentUser, cartItemCountFetch, cartCount } = useUser();

    const router = useRouter();


    const pathname = usePathname()

    useEffect(() => {
        cartItemCountFetch();
    }, []);


    return (
        <div className='bg-td-secondary flex h-[80px] items-center justify-between px-3 lg:px-10 w-full fixed top-0 z-[500] shadow-xl'>
            <Link href={"/"} className='relative w-[70px] h-[70px]' >
                <Image priority={true} src={'/td-white.png'} alt='Threadle Design' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </Link>
            <div className='flex items-center justify-center gap-2'>

                {currentUser?.token && currentUser?.isAdmin !== true && (
                    <div className='cursor-pointer text-white flex items-center justify-center gap-3'>
                        <div className='relative  cursor-pointer'>
                            <span className='absolute p-1 px-2 text-xs bg-red-800 rounded-full -right-2 -top-2 text-white'>{cartCount || "0"}</span>
                            <CiShoppingCart onClick={() => router.push('/cart')} className='text-white ' size={24} />
                        </div>
                        <CiSearch onClick={() => router.push('/shop')} className=' cursor-pointer' size={24} />
                        <span>
                            <UserSliderMenu />
                        </span>
                    </div>
                )}


                {!currentUser?.token && pathname != "/account/create-account/otp-verification" && (
                    <div className='cursor-pointer flex items-center justify-center gap-2 '>
                        <CiSearch onClick={() => router.push('/shop')} className='text-white cursor-pointer' size={24} />
                        <h1 onClick={() => router.push("/account/login")} className="text-white font-medium">Login/Register</h1>
                    </div>
                )}


                {currentUser?.isAdmin === true && (
                    <div className='text-white flex items-center justify-center'>
                        <AdminSliderMenu />
                    </div>
                )}


            </div >
        </div >
    );
};

export default Header;