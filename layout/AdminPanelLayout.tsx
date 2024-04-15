"use client"

import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { IoMdClose } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';

const AdminPanelLayout = ({ children }: { children: ReactNode }) => {
    const [isMenu, setIsMenu] = useState<boolean>(false);

    return (
        <div className='relative w-full h-full flex gap-10'>

            {/* Side 1 (Menu) */}
            <div className='text-td-secondary px-6 py-5'>
                <button className=' rounded-2xl' onClick={() => setIsMenu(true)}>
                    <IoMenu className='cursor-pointer' size={24} />
                </button>
            </div>

            <div className='absolute to-0 right-0 bg-black'>

            </div>

            {isMenu && (
                <ClickAwayListener onClickAway={() => setIsMenu(false)}>
                    <div className={`fixed top-5 left-0 md:flex items-start justify-center bg-slate-200 w-[300px] z-[99] h-full  transition-transform duration-300 ease-in-out ${isMenu ? 'translate-x-0' : '-translate-x-[100%]'}`}>
                        <div className='absolute top-2 right-2 cursor-pointer' onClick={() => setIsMenu(false)}>
                            <IoMdClose className='text-white cursor-pointer' size={24} />
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center pt-8 ">
                            <div className='py-10 flex flex-col items-center justify-center gap-[4px] w-full'>
                                <Link href="/admin-panel/create-product" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>Add Product</Link>
                                <Link href="/admin-panel/create-category" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>Add Category</Link>
                                <Link href="/admin-panel/view-products" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>View All Product</Link>
                                <Link href="/admin-panel/view-categories" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>View All Category</Link>
                                <Link href="/admin-panel/create-admin" className='bg-td-secondary w-full px-10 py-2 text-white text-center'>Create New Admin</Link>
                                <button className='bg-red-600 w-full px-10 py-2 text-white text-center' onClick={() => { }}>Logout</button>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            )}

            {/* Side 2 (Main Content) */}
            <div className='flex flex-col items-center justify-center w-full'>
                {children}
            </div>
        </div>
    );
};

export default AdminPanelLayout;
