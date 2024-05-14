"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation'; // Changed import to correct hook
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

const ForgotPassword = () => {

    const [otp, setOtp] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false); // Initialize isLoading with false
    const [OPTSented, setOTPSented] = useState<boolean>(false); // Initialize OPTSented with false

    const router = useRouter();


    const handleVerification = async () => {
        try {
            setIsLoading(true);
            const res = await axios.put('/api/forgot-password', { phone, otp }); // Corrected API endpoint
            if (res.data.success === true) {
                router.push('/account/login');
                toast.success(res.data?.message);
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            toast.error("Couldn't verify");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getOTPCode = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/forgot-password/${phone}`);
            if (res.data.success === true) {
                setOTPSented(true);
                toast.success(res.data?.message);
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            toast.error("Couldn't verify your number");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='bg-td-secondary py-10 flex items-center justify-center px-5 min-h-[70vh]'>
            {!OPTSented && (
                <div className='flex bg-white flex-col gap-3 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-md'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-bold text-[30px] text-td-secondary'>Forgot Password?</h1>
                        <span className='font-light md:text-md text-sm text-td-secondary'>Enter your phone number</span>
                    </div>

                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex items-center justify-center rounded-md bg-slate-200 w-full'>
                            <span className='pl-2'>+91</span>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                placeholder='Phone'
                                className='border px-5 py-2 rounded-md bg-slate-200 w-full'
                                value={phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,10}$/.test(value)) {
                                        setPhone(value);
                                    }
                                }}
                            />
                        </div>
                        {!isLoading ? (
                            <button onClick={getOTPCode} className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <span className="text-[15px] w-full">Submit</span>
                            </button>
                        ) : (
                            <button className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <PulseLoader color='white' />
                            </button>
                        )}
                    </div>
                </div>)}

            {OPTSented && (
                <div className='flex relative bg-white flex-col gap-3 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-md'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-bold text-[30px] text-td-secondary'>Enter OTP</h1>
                        <span className='font-light md:text-md text-sm text-td-secondary'>Enter the 6 digit otp sented to your number number</span>
                    </div>

                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex items-center justify-center gap-2'>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                placeholder='OTP'
                                className='border px-5 py-2 rounded-md bg-slate-200 w-full'
                                value={otp}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,6}$/.test(value)) {
                                        setOtp(value);
                                    }
                                }}
                            />
                        </div>
                        {!isLoading ? (
                            <button onClick={handleVerification} className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <span className="text-[15px] w-full">Submit</span>
                            </button>
                        ) : (
                            <button className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <PulseLoader color='white' />
                            </button>
                        )}
                    </div>
                    <span className="absolute bottom-2 text-sm text-blue-500 underline">resend otp</span>
                </div>)}
        </div>
    );
};

export default ForgotPassword;