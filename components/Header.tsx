"use client"


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CiSearch, CiUser, CiShoppingCart, CiMenuBurger, CiCircleRemove } from "react-icons/ci";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/useUser';
import { AiOutlineLogout } from 'react-icons/ai';
import ClickAwayListener from 'react-click-away-listener';
import axios from 'axios';
import toast from 'react-hot-toast';


const Header = () => {
    const { LogOut, currentUser, cartItemCountFetch, cartCount } = useUser();
    const router = useRouter();
    const [isMenu, setIsMenu] = useState<boolean>(true);

    const onAccountClick = () => {
        try {
            if (!currentUser) {
                return router.push('/account');
            }

            if (currentUser?.token && currentUser.isAdmin === true) {
                return router.push('/admin-panel/orders');
            }

            if (currentUser?.token && currentUser.isAdmin === false) {
                return router.push(`/account/${currentUser.userId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleLogout = async () => {
        try {
            await axios.get('/api/logout');
            LogOut();
            toast.success('Logout Success');
            router.push('/account/login');
        } catch (error) {
            console.log(error);
        }

    }



    useEffect(() => {
        cartItemCountFetch();
    }, []);

    return (
        <div className='bg-td-secondary flex h-[80px] items-center justify-between px-3 lg:px-10 w-full fixed top-0 z-[500] shadow-xl'>
            <Link href={"/"} className='relative w-[70px] h-[70px]' >
                <Image priority={true} src={'/td-white.png'} alt='Threadle Design' fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </Link>
            <div className='flex items-center justify-center gap-2'>

                {currentUser?.isAdmin === false && currentUser?.token && (
                    <div className='relative cursor-pointer'>
                        <span className='absolute p-1 px-2 text-xs bg-red-800 rounded-full -right-2 -top-2 text-white'>{cartCount || "0"}</span>
                        <CiShoppingCart onClick={() => router.push('/cart')} className='text-white ' size={24} />
                    </div>
                )}
                {!currentUser?.isAdmin === true && (
                    <div className='cursor-pointer flex items-center justify-center gap-2 '>
                        <CiSearch onClick={() => router.push('/shop')} className='text-white cursor-pointer' size={24} />
                        <CiUser onClick={onAccountClick} className='text-white cursor-pointer' size={24} />
                    </div>
                )}

                {currentUser?.isAdmin === true && (
                    <div className='text-white flex items-center justify-center'>
                        {!isMenu ? (
                            <button className=' rounded-2xl' onClick={() => setIsMenu(true)}>
                                <CiMenuBurger className='cursor-pointer' size={24} />
                            </button>
                        ) : (
                            <button className=' rounded-2xl' onClick={() => setIsMenu(true)}>
                                <CiCircleRemove className='cursor-pointer' size={24} />
                            </button>
                        )}
                    </div>
                )}

                <ClickAwayListener onClickAway={() => setIsMenu(false)}>
                    {/* <div onClick={() => setIsMenu(false)} className={`fixed top-[81px] h-full right-0 flex flex-col items-center justify-start z-50 shadow-2xl  bg-td-secondary md:w-[300px] w-full  translate-x-[100%]  transition-all duration-300 ease-in-out ${isMenu && 'translate-x-[0%]'}`}> */}
                    <div onClick={() => setIsMenu(false)} className={`fixed top-[81px] h-full right-0 flex flex-col items-center justify-start z-50 shadow-2xl  bg-td-secondary md:w-[300px] w-full  translate-x-[0%]  transition-all duration-300 ease-in-out`}>
                        <Link href="/admin-panel/orders" className=' w-full px-10 py-2 text-white text-center '>Orders</Link>
                        <Link href="/admin-panel/create-product" className=' w-full px-10 py-2 text-white text-center  '>Add Product</Link>
                        <Link href="/admin-panel/create-category" className=' w-full px-10 py-2 text-white text-center '>Add Category</Link>
                        <Link href="/admin-panel/view-products" className=' w-full px-10 py-2 text-white text-center '>View All Product</Link>
                        <Link href="/admin-panel/view-categories" className=' w-full px-10 py-2 text-white text-center  '>View All Category</Link>
                        <Link href="/admin-panel/create-admin" className=' w-full px-10 py-2 text-white text-center '>Create a New Admin</Link>
                        <button className='bg-red-600 w-full px-10 py-2 text-white text-center flex items-center justify-center gap-3' onClick={handleLogout}> LogOut<AiOutlineLogout /></button>
                    </div>
                </ClickAwayListener>

            </div>
        </div>
    );
};

export default Header;