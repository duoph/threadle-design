import React, { useState } from 'react'
import Link from "next/link"
import ClickAwayListener from 'react-click-away-listener'
import { CiCircleRemove, CiHeart, CiMenuBurger, CiShop, CiShoppingCart } from 'react-icons/ci'
import { AiOutlineLogout } from 'react-icons/ai'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useUser } from '@/context/useUser'
import { FaUserCircle } from 'react-icons/fa'

const UserSliderMenu = () => {
    const [isMenuUser, setIsMenuUser] = useState<boolean>(true);

    const { LogOut, currentUser } = useUser();

    const router = useRouter();

    const pathname = usePathname()

    const handleLogout = async () => {
        try {
            LogOut();
            toast.success("LogOut Successfully");
            router.push('/account/login');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ClickAwayListener onClickAway={() => setIsMenuUser(true)}>

            <div className="flex items-center justify-center">
                {isMenuUser ? (
                    <button className=' w-[40px] rounded-md' onClick={() => setIsMenuUser(!isMenuUser)}>
                        <CiMenuBurger className='cursor-pointer' size={24} />
                    </button>
                ) : (
                    <button className=' w-[40px] rounded-md' onClick={() => setIsMenuUser(!isMenuUser)}>
                        <CiCircleRemove className='cursor-pointer' size={24} />
                    </button>
                )}

                <div onClick={() => setIsMenuUser(true)} className={`fixed top-[81px] h-full right-0 flex flex-col items-start justify-start z-50 shadow-2xl  bg-td-secondary md:w-[300px] w-full  translate-x-[0%]  transition-all duration-300 ease-in-out ${isMenuUser && 'translate-x-[100%]'}`}>
                    <Link href={`/account/${currentUser?.userId}`} className={` w-full px-10 py-2 text-white  text-center ${pathname === `/account/${currentUser?.userId}` && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <FaUserCircle />
                            <p className='text-start'>
                                Profile
                            </p>
                        </span>
                    </Link>
                    <Link href={`/shop`} className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith(`/shop`) && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <CiShop />
                            <p className='text-start'>
                                Shop
                            </p>
                        </span>
                    </Link>
                    <Link href="/category" className={` w-full px-10 py-2 text-white text-center ${pathname?.startsWith(`/category`) && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <CiShop />
                            <p>
                                All Categories
                            </p>
                        </span>
                    </Link>
                    <Link href={`/account/${currentUser?.userId}/wishlist`} className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith(`/account/${currentUser?.userId}/wishlist`) && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start r gap-8">
                            <CiHeart />
                            <p>
                                Wishlist
                            </p>
                        </span>
                    </Link>
                    <Link href={`/account/${currentUser?.userId}/orders`} className={` w-full px-10 py-2 text-white  text-center ${pathname?.startsWith(`/account/${currentUser?.userId}/orders`) && "bg-td-primary"}`}>
                        <span className="flex items-center justify-start gap-8">
                            <CiShoppingCart />
                            <p>
                                My Orders
                            </p>
                        </span>
                    </Link>
                    <button className='bg-red-600 w-full px-10 py-2 text-white text-center flex items-center justify-center gap-3' onClick={handleLogout}> LogOut<AiOutlineLogout /></button>
                </div>
            </div >
        </ClickAwayListener >
    )
}

export default UserSliderMenu;