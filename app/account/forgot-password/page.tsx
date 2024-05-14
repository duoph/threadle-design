"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

const ForgotPassword = () => {

    const [otp, setOtp] = useState<number>();
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [OPTSented, setOTPSented] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false)

    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()


    const router = useRouter()


    // getCode
    const getOTPCode = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/forgot-password/${phone}`);
            if (res.data.success === true) {
                setOTPSented(true);
            }
            if (res.data.success === false) {
                toast.error(res.data?.message);
            }
        } catch (error) {
            toast.error("Couldn't verify your number");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // verification
    const handleVerification = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(`/api/forgot-password/${phone}`, {
                otp
            });
            console.log(res)
            if (res.data.success === true) {
                setOTPSented(false)
                setIsVerified(true)
                toast.success(res.data?.message);
            }
            if (res.data.success === false) {
                toast.error(res.data?.message);
            }
        } catch (error) {
            toast.error("Couldn't verify");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            const res = await axios.get(`/api/forgot-password/${phone}`);
            if (res.data.success === true) {
                setOTPSented(true);
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


    // change the password
    const handlePasswordChange = async () => {
        try {
            setIsLoading(true);
            const res = await axios.put(`/api/forgot-password/${phone}`, {
                password
            });
            if (res.data.success === true) {
                toast.success(res.data?.message);
                router.push('/account/login')
            }
            if (res.data.success === false) {
                toast.error(res.data?.message);
            }
        } catch (error) {
            toast.error("Couldn't verify");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className='bg-td-secondary py-10 flex items-center justify-center px-5 min-h-[70vh]'>
            {!OPTSented && !isVerified && (
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

            {OPTSented && !isVerified && (
                <div className='flex relative bg-white flex-col gap-3 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-md'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-bold text-[30px] text-td-secondary'>Enter OTP</h1>
                        <span className='font-light md:text-md text-sm text-td-secondary'>Enter the 6 digit otp sented to your number number</span>
                    </div>

                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex items-center justify-center gap-2'>
                            <input
                                type="number"
                                pattern="[0-9]*"
                                placeholder='OTP'
                                className='border px-5 py-2 rounded-md bg-slate-200 w-full'
                                value={otp}
                                onChange={(e) => setOtp(parseInt(e.target.value))}
                            />
                        </div>
                        {!isLoading ? (
                            <button onClick={handleVerification} className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <span className="text-[15px] w-full">Verify</span>
                            </button>
                        ) : (
                            <button className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <PulseLoader color='white' />
                            </button>
                        )}
                    </div>
                    <span onClick={handleResend} className="absolute bottom-2 cursor-pointer text-sm text-blue-500 underline">resend otp</span>
                </div>)}

            {isVerified && !OPTSented && (
                <div className='flex relative bg-white flex-col gap-3 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-md'>

                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-bold text-[30px] text-td-secondary'>Enter New Password</h1>
                        <span className={`font-light md:text-md text-sm text-red-600 ${confirmPassword && confirmPassword.length > 1 && confirmPassword !== password ? "opacity-100" : "opacity-10"}`}>
                            Password doesn't match
                        </span>
                    </div>


                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex items-center justify-center gap-2'>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='border px-5 py-2 rounded-md bg-slate-200 w-full'
                            />
                        </div>
                        <div className={`flex items-center justify-center gap-2 border-red-600 focus:border-red-500`}>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                minLength={6}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm Password'
                                className='border px-5 py-2 rounded-md bg-slate-200 w-full'
                            />
                        </div>

                        {!isLoading ? (
                            <button onClick={handlePasswordChange} className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <span className="text-[15px] w-full">Submit</span>
                            </button>
                        ) : (
                            <button className='bg-td-secondary rounded-md h-12 px-3 py-3 text-white font-semibold'>
                                <PulseLoader color='white' />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;