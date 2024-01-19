"use client"

import React from 'react'
import Image from 'next/image';
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';


const Header = () => {
    return (
        <div className='bg-td-secondary h-32 flex items-center justify-between px-10'>
            <Link href={"/"} className=''>
                <Image src={'/td-white.png'} alt='Threadle Design' height={100} width={100} />
            </Link>
            <div className='flex items-center justify-center gap-2'>
                <CiSearch onClick={() => { }} className='text-white cursor-pointer' size={24} />
                <CiShoppingCart onClick={() => { }} className='text-white cursor-pointer' size={24} />
                <CiUser onClick={() => { }} className='text-white cursor-pointer' size={24} />
            </div>
        </div>
    )
}

export default Header