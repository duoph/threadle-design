"use client"

import { useUser } from '@/context/useUser';
import { User } from '@/types';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaAddressCard } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiAccountCircleFill } from 'react-icons/ri';
import { PulseLoader } from 'react-spinners';

const UserProfile = () => {

    const router = useRouter();
    const { LogOut, currentUser, setCurrentUser } = useUser();
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>()
    const [formData, setFormData] = useState({

        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const fetchUser = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`/api/user/${currentUser?.userId}`)
            setUser(res?.data?.user);
            if (res?.data?.user) {
                setFormData({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    phone: res.data.user.phone,
                    address: res.data.user.address,
                });
            }

            console.log(res)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/user/${currentUser?.userId}`, formData);

            if (res.data?.success === true) {
                const userData = res.data?.user;
                toast.success('Profile Updated Successfully');
            }
            if (res.data?.success === false) {
                toast.error('Profile Updated Successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to update profile');
        }
        fetchUser()

    };

    const logOut = async () => {
        try {
            await axios.get('/api/logout');
            LogOut();
            toast.success('Logout Success');
            router.push('/account/login');
        } catch (error) {
            console.log(error);
        }
    };

    if (!currentUser?.token) {
        router.push('/account/login');
        return null;
    }



    if (formData.email === "") {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Profile</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }


    return (
        <div className='flex flex-col items-center justify-start gap-3 py-5 px-5 min-h-[85vh]'>
            <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Profile</h1>
            <div className="flex md:flex-row flex-col w-full h-full gap-2">
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3 border px-5 py-8 rounded-2xl lg:w-1/2 w-full bg-slate-100'>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <RiAccountCircleFill size={30} />
                        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} className='border px-5  py-2 rounded-2xl bg-slate-200 w-full' />
                    </div>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <MdEmail size={30} />
                        <input type="email" name="email" disabled placeholder='Email' value={formData.email} onChange={handleChange} className='border px-5 w-full py-2 rounded-2xl bg-slate-200' />
                    </div>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <FaPhoneAlt size={30} />
                        <input type="phone" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} className='border px-5  w-full py-2 rounded-2xl bg-slate-200' />
                    </div>
                    <div className='flex items-start justify-center gap-2 w-full '>
                        <FaAddressCard size={30} />
                        <textarea id="address" name="address" className='border px-5  py-2 w-full rounded-2xl bg-slate-200 min-h-[150px]' placeholder='Address' value={formData.address} onChange={handleChange} />
                    </div>

                    <button className={`px-5 rounded-2xl py-3 border bg-td-secondary text-white font-bold`} type='submit'>Save</button>
                </form>

                <div className='flex items-center justify-center flex-col lg:w-1/2 w-full border px-5 py-8 gap-1 rounded-2xl bg-slate-100'>
                    <button onClick={() => router.push(`/account/${currentUser.userId}/wishlist`)} className='px-5 rounded-2xl py-3 border  bg-td-secondary text-white font-bold w-[200px]'>WishList</button>
                    <button onClick={() => router.push(`/account/${currentUser.userId}/orders`)} className='px-5 rounded-2xl py-3 border bg-td-secondary text-white font-bold w-[200px]'>Orders</button>
                    <button onClick={() => router.push(`/account/${currentUser.userId}/change-password`)} className='px-5 rounded-2xl py-3 border  bg-td-secondary text-white font-bold w-[200px]'>Change Password</button>
                    <button onClick={logOut} className='px-5 rounded-2xl py-3 border  bg-red-700 text-white font-bold w-[200px]'>LogOut</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;