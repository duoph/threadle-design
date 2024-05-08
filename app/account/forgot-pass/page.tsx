"use client"

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';


const OTPPage = () => {

    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>()

    const router = useRouter();

    const { userId } = useParams();


    const handleVerification = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post('/next-env.d.tsapi/forgot-password', { userId, otp })
            console.log(res)
            if (res.data.success === true) {
                router.push('/account/login')
                toast.success(res.data?.message);
            }
            if (res.data.success === false) {
                toast.error(res.data?.message);
            }
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            toast.error("Couldn't verify");
            console.log(error);
        }
    }

    const getSecurityCode = async () => {
        try {
            const res = await axios.post('/api/forgot-password', {
                userId
            })
            if (res.data.success === true) {
                router.push('/account/login')
                toast.success(res.data?.message);
            }
            if (res.data.success === false) {
                toast.error(res.data?.message);
            }
            console.log(res)
        } catch (error) {
            toast.error("Couldn't verify");
            console.log(error);
        }
    }

    useEffect(() => {

    }, [])


    return (
        <div className='bg-td-secondary py-10 flex items-center justify-center px-5 min-h-[70vh]'>
            <div className='flex bg-white flex-col gap-3 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-2xl'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-[30px] text-td-secondary'>Enter Phone Number</h1>
                    {/* <span className='font-bold text-[12px] text-td-secondary'>A six-digit OTP has been sent to your phone number</span> */}
                </div>
                <div className='flex flex-col gap-3 w-full'>

                    <div className='flex items-center justify-center gap-2'>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            placeholder='Phone'
                            className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
                            value={otp}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                    setOtp(value);
                                }
                            }}
                        />
                    </div>
                    {!isLoading && (
                        <button onClick={getSecurityCode} className='bg-td-secondary rounded-2xl h-12 px-3 py-3 text-white font-semibold'>
                            <span className="text-[15px] w-full">Submit</span>
                        </button>
                    )}
                    {isLoading && (
                        <button className='bg-td-secondary rounded-2xl h-12 px-3 py-3 text-white font-semibold'>
                            <PulseLoader color='white' />
                        </button>
                    )}
                    {/* <div className="flex items-center justify-center">
                        <span onClick={getSecurityCode} className="text-xs text-center w-[100px] cursor-pointer text-blue-900 underline">Resend OTP</span>
                    </div> */}
                </div>
            </div>
        </div >
    );
};

export default OTPPage;