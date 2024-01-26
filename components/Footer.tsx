"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { FaFacebook, FaInstagram } from 'react-icons/fa6'



const Footer = () => {

    const router = useRouter()

    return (
        <div className='py-5 flex flex-col gap-3  bg-slate-200 w-full md:px-20 px-5'>
            <div className='flex md:flex-row flex-col justify-between items-center gap-4 '>
                <div className='flex flex-col  md:w-1/2 w-full gap-3'>
                    <Image src={'/td-green.png'} alt='Logo' width={100} height={100} />
                    <p className='break-all'>We have clothes that suits your style and which you're proud to wear.</p>
                    <span className='flex gap-3'>
                        <FaFacebook className='cursor-pointer' size={24} />
                        <FaInstagram className='cursor-pointer' size={24} />
                    </span>
                </div>
                <div className='flex flex-col items-end md:w-1/2 w-full gap-3'>
                    <span className='font-semibold text-[20px] underline'>Quick Links</span>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/terms-condition'}>Terms & Conditions</Link>
                    <Link href={'/privacy-policy'}>Privacy Policy</Link>
                    <Link href={'/admin-login'}>Login as admin</Link>
                </div>
            </div>
            <hr className='h-[1px] bg-gray-300 border-none' />
            <div className='flex flex-col gap-2 items-center justify-between'>
                <div>
                    <p className="text-gray-400 text-center">Threadle Design© 2020-2024, All Rights Reserved</p>
                </div>
                <div>
                    <p className="text-gray-400">Designed and developed By <Link target='_blank' href={"https://www.duoph.com/"}>Duoph</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Footer