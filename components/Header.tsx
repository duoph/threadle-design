"use client"

import React from 'react'
import Image from 'next/image';
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Header = () => {

    const router = useRouter()
    // const accountId = 12345

    return (
        <div className='bg-td-secondary flex items-center justify-between px-3 lg:px-10'>
            <Link href={"/"} className=''>
                <Image src={'/td-white.png'} alt='Threadle Design' height={80} width={80} />
            </Link>
            <div className='flex items-center justify-center gap-2'>
                <CiSearch onClick={() => router.push('/search')} className='text-white cursor-pointer' size={24} />
                <CiShoppingCart onClick={() => router.push('/cart')} className='text-white cursor-pointer' size={24} />
                {/* <CiUser onClick={() => { }} className='text-white cursor-pointer' size={24} /> */}
            </div>
        </div>
    )
}

export default Header