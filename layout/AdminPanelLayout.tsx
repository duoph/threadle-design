"use client"

import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';

const AdminPanelLayout = ({ children }: { children: ReactNode }) => {
    const [isMenu, setIsMenu] = useState<boolean>(false);

    return (
        <div className='relative w-full h-full flex gap-10 z-50 '>

            {/* Side 1 (Menu) */}
            <div className='absolute text-td-secondary sm:px-6 sm:py-5 px-3 py-3'>
                <button className=' rounded-2xl' onClick={() => setIsMenu(true)}>
                    <IoMenu className='cursor-pointer' size={30} />
                </button>
            </div>

            <div className='absolute to-0 right-0 bg-black'>

            </div>

            {isMenu && (
                <ClickAwayListener onClickAway={() => setIsMenu(false)}>
                    <div className={`fixed top-5 left-0 md:flex items-center z-50 justify-center bg-slate-200 md:w-[300px] w-full  h-full  transition-transform duration-300 ease-in-out ${isMenu ? 'translate-x-0' : '-translate-x-[100%]'}`}>
                        <div className='absolute top-2 right-2 cursor-pointer' onClick={() => setIsMenu(false)}>
                            <IoMdClose className='text-black cursor-pointer' size={24} />
                        </div>
                        <h1 className='text-center py-2 font-semibold'>Admin Panel</h1>
                        <div className="flex flex-col gap-2 items-center justify-center ">
                            <div onClick={() => setIsMenu(false)} className=' flex flex-col items-center justify-center gap-[4px] w-full px-3'>
                                <Link  href="/admin-panel/orders" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>Orders</Link>
                                <Link href="/admin-panel/create-product" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>Add Product</Link>
                                <Link href="/admin-panel/create-category" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>Add Category</Link>
                                <Link href="/admin-panel/view-products" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>View All Product</Link>
                                <Link href="/admin-panel/view-categories" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>View All Category</Link>
                                <Link href="/admin-panel/create-admin" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>Create a New Admin</Link>
                                <button className='bg-red-600 w-full px-10 py-2 text-white text-center flex items-center justify-center gap-3' onClick={() => { }}> LogOut<AiOutlineLogout />
                                </button>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            )}

            {/* Side 2 (Main Content) */}
            <div className='flex flex-col items-center justify-center w-full py-10'>
                {children}
            </div>
        </div>
    );
};

export default AdminPanelLayout;