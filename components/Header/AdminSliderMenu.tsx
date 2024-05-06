import React, { useState } from 'react'
import Link from "next/link"
import ClickAwayListener from 'react-click-away-listener'
import { CiCirclePlus, CiCircleRemove, CiMenuBurger, CiShop, CiShoppingCart } from 'react-icons/ci'
import { AiOutlineLogout } from 'react-icons/ai'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@/context/useUser'
import axios from 'axios'
import toast from 'react-hot-toast'

const UserSliderMenu = () => {
    const [isMenu, setIsMenu] = useState<boolean>(true);

    const { LogOut } = useUser();

    const router = useRouter();

    const pathname = usePathname()

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


    return (
        <ClickAwayListener onClickAway={() => setIsMenu(true)}>
            <div className="flex  items-center justify-center">
                {isMenu ? (
                    <button className='w-[40px] rounded-2xl' onClick={() => setIsMenu(!isMenu)}>
                        <CiMenuBurger className='cursor-pointer' size={24} />
                    </button>
                ) : (
                    <button className='w-[40px] rounded-2xl' onClick={() => setIsMenu(!isMenu)}>
                        <CiCircleRemove className='cursor-pointer' size={24} />
                    </button>
                )}


                <div onClick={() => setIsMenu(true)} className={`fixed top-[81px] h-full right-0 flex flex-col items-start justify-start z-50 shadow-2xl  bg-td-secondary md:w-[300px] w-full  translate-x-[0%]  transition-all duration-300 ease-in-out ${isMenu && 'translate-x-[100%]'}`}>
                    <Link href="/admin-panel/orders" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/orders") && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <CiShoppingCart />
                            <p>
                                Orders
                            </p>
                        </span>
                    </Link>
                    <Link href="/admin-panel/create-product" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/create-product") && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <CiCirclePlus />
                            <p>
                                Add Product
                            </p>
                        </span>
                    </Link>
                    <Link href="/admin-panel/create-category" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/create-category") && "bg-td-primary"}`}> <span className="flex items-center justify-start gap-8">
                        <CiCirclePlus />
                        <p>
                            Add Category
                        </p>
                    </span>
                    </Link>
                    <Link href="/admin-panel/view-products" className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith("/admin-panel/view-products") && "bg-td-primary"} ${pathname?.startsWith("/admin-panel/edit-product/") && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <CiShop />
                            <p>
                                View All Products
                            </p>
                        </span>
                    </Link>
                    <Link href="/admin-panel/view-categories" className={` w-full px-10 py-2 text-white text-center ${pathname?.startsWith("/admin-panel/edit-category") && "bg-td-primary"} ${pathname?.startsWith("/admin-panel/view-categories") && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <CiShop />
                            <p>
                                View All Categories
                            </p>
                        </span>
                    </Link>
                    <button className='bg-red-600 w-full px-10 py-2 text-white text-center flex items-center justify-center gap-3' onClick={handleLogout}> LogOut<AiOutlineLogout /></button>
                </div>
            </div >
        </ClickAwayListener>
    )
}

export default UserSliderMenu;