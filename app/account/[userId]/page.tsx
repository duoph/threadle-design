"use client"

import { useUser } from '@/context/useUser';
import { User } from '@/types';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaAddressCard, FaPhone } from 'react-icons/fa';
import { FaLocationDot, FaSquareWhatsapp } from 'react-icons/fa6';
import { RiAccountCircleFill } from 'react-icons/ri';
import { PulseLoader } from 'react-spinners';

const UserProfile = () => {

    const router = useRouter();
    const { currentUser } = useUser();
    const [isLoading, setIsLoading] = useState<boolean>()
    const [isSubmiting, setIsSubmiting] = useState<boolean>()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        whatsAppNumber: '',
        address: '',
        pincode: '',
    });



    const fetchUser = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`/api/user/${currentUser?.userId}`)
            if (res?.data?.user) {
                setFormData({
                    name: res.data.user.name,
                    phone: res.data.user.phone,
                    whatsAppNumber: res?.data?.user?.whatsAppNumber,
                    address: res.data.user.address,
                    pincode: res.data.user.pincode,
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
        if (currentUser) {
            fetchUser();
        }
    }, [currentUser]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmiting(true);

        if (formData.name.length < 2) {
            setIsSubmiting(false);
            return toast.error("Enter a valid name");
        }

        if (formData.phone.length != 10) {
            setIsSubmiting(false);
            return toast.error("Enter a valid phone");
        }

        if (formData.whatsAppNumber.length != 10) {
            setIsSubmiting(false);
            return toast.error("Enter a valid whatsApp Number");
        }


        if (formData.address.length < 7) {
            setIsSubmiting(false);
            return toast.error("Enter a valid Address");
        }


        if (!/^\d{6}$/.test(formData.pincode)) {
            setIsSubmiting(false);
            return toast.error("Enter a valid pincode");
        }

        try {
            const res = await axios.put(`/api/user/${currentUser?.userId}`, formData);
            console.log(res)
            if (res.data?.success === true) {
                // const userData = res.data?.user;
                toast.success(res.data.message);
            }

            if (res.data?.success === false) {
                toast.error(res.data.message);
            }

            setIsSubmiting(false);
        } catch (error) {
            setIsSubmiting(false);
            console.log(error);
            toast.error('Failed to update profile');
        }
    };


    // if (!currentUser?.token) {
    //     router.push('/account/login');
    //     return null;
    // }


    // if (pathname === "/account/profile") {
    //     router.push('/shop');
    //     return null;
    // }



    if (formData.phone === "") {
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
            <span className='text-xs font-light'>You can update your name,phone,address and pincode </span>
            <div className="flex  flex-col items-center justify-center w-full h-full gap-2">
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3  px-5 py-8 rounded-md lg:w-1/2 w-full '>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <RiAccountCircleFill size={30} />
                        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} className='border px-5  py-2 rounded-md  w-full' />
                    </div>
                    <div className='flex items-center w-full justify-center gap-3'>
                        <FaPhone size={24} />
                        <div className='flex items-center justify-center border rounded-md w-full'>
                            <span className='pl-2'>+91</span>
                            <input
                                type="string"
                                // pattern='0-9'
                                id="phone"
                                name="phone"
                                maxLength={10}
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder='Phone'
                                className='w-full px-3 py-3 focus:outline-none' />
                        </div>
                    </div>
                    <div className='flex items-center w-full justify-center gap-3'>
                        <FaSquareWhatsapp size={24} />
                        <div className='flex items-center justify-center border rounded-md  w-full'>
                            <span className='pl-2'>+91</span>
                            <input
                                type="whatsAppNumber"
                                name="whatsAppNumber"
                                placeholder='whatsApp Number'
                                value={formData.whatsAppNumber}
                                onChange={handleChange}
                                maxLength={10}
                                className='w-full px-3 py-3 focus:outline-none' />
                        </div>
                    </div>
                    <div className='flex items-start justify-center gap-2 w-full '>
                        <FaAddressCard size={30} />
                        <textarea id="address" name="address" className='border px-5  py-2 w-full rounded-md  min-h-[100px]' placeholder='Address' value={formData.address} onChange={handleChange} />
                    </div>
                    <div className='flex items-center  justify-center gap-2 w-full'>
                        <FaLocationDot size={30} />
                        <input type="pincode" name="pincode" placeholder='Pincode' className='w-full px-3 py-3 border focus:outline-none' value={formData.pincode} onChange={handleChange} />
                    </div>
                </form>
                <button onClick={handleSubmit} className={`px-5 rounded-md py-3 border bg-td-secondary text-white font-bold`} type='submit'>{isSubmiting ? <PulseLoader color="white" size={9} /> : "Save"}</button>
            </div>
        </div>
    );
};

export default UserProfile;