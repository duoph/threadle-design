import React, { useState } from 'react'
import Link from "next/link"
import ClickAwayListener from 'react-click-away-listener'
import { CiCircleRemove, CiMenuBurger, CiShoppingCart } from 'react-icons/ci'
import { AiOutlineLogout } from 'react-icons/ai'

const UserSliderMenu = () => {
    const [isMenuUser, setIsMenuUser] = useState<boolean>(true);

    const handleLogout = async () => {
        try {
            // await axios.get('/api/logout');
            // LogOut();
            // toast.success('Logout Success');
            // router.push('/account/login');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className='flex items-center justify-center'>

                {isMenuUser ? (
                    <button className=' rounded-2xl' onClick={() => setIsMenuUser(!isMenuUser)}>
                        <CiMenuBurger className='cursor-pointer' size={24} />
                    </button>
                ) : (
                    <button className=' rounded-2xl' onClick={() => setIsMenuUser(!isMenuUser)}>
                        <CiCircleRemove className='cursor-pointer' size={24} />
                    </button>
                )}
            </div>

            <ClickAwayListener onClickAway={() => setIsMenuUser(true)}>
                <div onClick={() => setIsMenuUser(true)} className={`fixed top-[81px] h-full right-0 flex flex-col items-start justify-start z-50 shadow-2xl  bg-td-secondary md:w-[300px] w-full  translate-x-[0%]  transition-all duration-300 ease-in-out ${isMenuUser && 'translate-x-[100%]'}`}>
                    <Link href="/admin-panel/orders" className={` w-full px-10 py-2 text-white  text-center`}>
                        <span className="flex items-center justify-center gap-2">
                            <CiShoppingCart />
                            <p>
                                Profile
                            </p>
                        </span>
                    </Link>
                    <button className='bg-red-600 w-full px-10 py-2 text-white text-center flex items-center justify-center gap-3' onClick={handleLogout}> LogOut<AiOutlineLogout /></button>
                </div>
            </ClickAwayListener>
        </>
    )
}

export default UserSliderMenu;