"use client"


import React from 'react';
import Image from 'next/image';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/useUser';

import UserSliderMenu from './Header/UserSliderMenu';
import AdminSliderMenu from './Header/AdminSliderMenu';



export const fetchCache = 'force-no-store';

const Header = () => {

    const { currentUser, cartItemCountFetch, cartCount } = useUser();

    const router = useRouter();


    const pathname = usePathname()

    const href = pathname === '/admin-panel/orders' ? pathname : '/';





    return (
        <>
            <div className='bg-td-secondary flex h-[80px] items-center justify-between px-3 lg:pl-5 lg:pr-3 w-full fixed top-0 z-[500] shadow-xl'>
                <Link href={href} className='relative w-[70px] h-[70px]'>
                    <Image priority={true} src={'/td-white.png'} alt='Threadle Design' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </Link>
                <div className='flex items-center justify-center gap-2'>
                    {currentUser?.token && currentUser?.isAdmin !== true && (
                        <div className='cursor-pointer text-white flex items-center justify-center gap-3'>
                            <div className='relative  cursor-pointer'>
                                <Link href={"/cart"} >
                                    <span className='absolute p-1 px-2 text-xs bg-red-800 rounded-full -right-2 -top-2 text-white'>{cartCount || "0"}</span>
                                    <CiShoppingCart className='text-white ' size={24} />
                                </Link>

                            </div>
                            <Link href={"/shop"} >
                                <CiSearch className='text-white cursor-pointer' size={24} />
                            </Link>
                            <span>
                                <UserSliderMenu />
                            </span>
                        </div>
                    )}


                    {!currentUser?.token && pathname != "/account/create-account/otp-verification" && (
                        <div className='cursor-pointer flex items-center justify-center gap-2 '>
                            <Link href={"/shop"} >
                                <CiSearch className='text-white cursor-pointer' size={24} />
                            </Link>
                            <Link href={"/account/login"} >
                                <h1 onClick={() => router.push("/account/login")} className="text-white font-medium">Login/Register</h1>
                            </Link>
                        </div>
                    )}


                    {currentUser?.isAdmin === true && (
                        <div className='text-white flex items-center justify-center'>
                            <AdminSliderMenu />
                        </div>
                    )}

                </div >
            </div >


        </>
    );
};

export default Header;