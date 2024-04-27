"use client"


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CiSearch, CiUser, CiShoppingCart, CiMenuBurger, CiCircleRemove, CiCirclePlus, CiShop } from "react-icons/ci";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/useUser';
import { AiOutlineLogout } from 'react-icons/ai';
import ClickAwayListener from 'react-click-away-listener';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RiAdminLine } from 'react-icons/ri';


const Header = () => {
    const { LogOut, currentUser, cartItemCountFetch, cartCount } = useUser();
    const router = useRouter();
    const [isMenu, setIsMenu] = useState<boolean>(true);


    const pathname = usePathname()

    console.log(pathname)

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

                {currentUser?.isAdmin !== true && currentUser?.token && (
                    <div className='relative  cursor-pointer'>
                        <span className='absolute p-1 px-2 text-xs bg-red-800 rounded-full -right-2 -top-2 text-white'>{cartCount || "0"}</span>
                        <CiShoppingCart onClick={() => router.push('/cart')} className='text-white ' size={24} />
                    </div>
                )}

                {currentUser?.token && currentUser?.isAdmin !== true && (
                    <div className='cursor-pointer flex items-center justify-center gap-2 '>
                        <CiSearch onClick={() => router.push('/shop')} className='text-white cursor-pointer' size={24} />
                        <CiUser onClick={onAccountClick} className='text-white cursor-pointer' size={24} />
                    </div>
                )}

                {!currentUser?.token && (
                    <div className='cursor-pointer flex items-center justify-center gap-2 '>
                        <CiSearch onClick={() => router.push('/shop')} className='text-white cursor-pointer' size={24} />
                        <h1 onClick={() => router.push("/account/login")} className="text-white font-medium">Login/Register</h1>
                    </div>
                )}


                {currentUser?.isAdmin === true && (
                    <div className='text-white flex items-center justify-center'>
                        {isMenu ? (
                            <button className=' rounded-2xl' onClick={() => setIsMenu(!isMenu)}>
                                <CiMenuBurger className='cursor-pointer' size={24} />
                            </button>
                        ) : (
                            <button className=' rounded-2xl' onClick={() => setIsMenu(!isMenu)}>
                                <CiCircleRemove className='cursor-pointer' size={24} />
                            </button>
                        )}
                    </div>
                )}


                <ClickAwayListener onClickAway={() => setIsMenu(true)}>
                    <div onClick={() => setIsMenu(true)} className={`fixed top-[81px] h-full right-0 flex flex-col items-start justify-start z-50 shadow-2xl  bg-td-secondary md:w-[300px] w-full  translate-x-[0%]  transition-all duration-300 ease-in-out ${isMenu && 'translate-x-[100%]'}`}>
                        <Link href="/admin-panel/orders" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/orders") && "bg-td-primary"}`}>
                            <span className="flex items-center justify-center gap-2">
                                <CiShoppingCart />
                                <p>
                                    Orders
                                </p>
                            </span>
                        </Link>
                        <Link href="/admin-panel/create-product" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/create-product") && "bg-td-primary"}`}>
                            <span className="flex items-center justify-center gap-2">
                                <CiCirclePlus />
                                <p>
                                    Add Product
                                </p>
                            </span>
                        </Link>
                        <Link href="/admin-panel/create-category" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/create-category") && "bg-td-primary"}`}> <span className="flex items-center justify-center gap-2">
                            <CiCirclePlus />
                            <p>
                                Add Category
                            </p>
                        </span>
                        </Link>
                        <Link href="/admin-panel/view-products" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/view-products") && "bg-td-primary"} ${pathname?.startsWith("/admin-panel/edit-product/") && "bg-td-primary"}`}>
                            <span className="flex items-center justify-center gap-2">
                                <CiShop />
                                <p>
                                    View All Products
                                </p>
                            </span>
                        </Link>
                        <Link href="/admin-panel/view-categories" className={` w-full px-10 py-2 text-white text-center ${pathname?.startsWith("/admin-panel/edit-category") && "bg-td-primary"} ${pathname?.startsWith("/admin-panel/view-categories") && "bg-td-primary"}`}>
                            <span className="flex items-center justify-center gap-2">
                                <CiShop />
                                <p>
                                    View All Categories
                                </p>
                            </span>
                        </Link>
                        <Link href="/admin-panel/create-admin" className={` w-full px-10 py-2 text-white text-center ${pathname?.startsWith("/admin-panel/create-admin") && "bg-td-primary"}`}>
                            <span className="flex items-center justify-center gap-2">
                                <RiAdminLine />
                                <p>
                                    Create new Admin
                                </p>
                            </span>
                        </Link>
                        <button className='bg-red-600 w-full px-10 py-2 text-white text-center flex items-center justify-center gap-3' onClick={handleLogout}> LogOut<AiOutlineLogout /></button>
                    </div>
                </ClickAwayListener>

            </div >
        </div >
    );
};

export default Header;