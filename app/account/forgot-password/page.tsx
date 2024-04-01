"use client"

import { useUser } from '@/context/useUser';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';


const ForgotPassword = () => {
    const [securityCode, setSecurityCode] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [confirmedPassword, setConfirmedPassword] = useState<string>('')

    const router = useRouter();

    const generateSecurityCode = async () => {
        try {
            const res = await axios.put('/api/forgot-password')
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        generateSecurityCode()
    }, [])

    const handleResend = async () => {
        try {

        } catch (error) {

        }
    }



    const handleVerify = async () => {
        setVerified(true)
        try {
            // const res = await 
        } catch (error) {

        }
    };


    const handleNewPassword = () => {

        setIsLoading(true)
        try {
            if (password !== confirmedPassword) {
                toast.error("Password dosn't match")
                setIsLoading(false)

            }
            if (password === confirmedPassword) {
                setIsLoading(false)
                toast.success("Password updated successfully")
            }
        } catch (error) {

        }
    }


    // if (currentUser?.token && currentUser.isAdmin === true) {
    //     return router.push('/admin-panel')
    // }

    // if (currentUser?.token && currentUser.isAdmin === false) {
    //     return router.push(`/account/${currentUser.userId}`)
    // 

    return (
        <div className='bg-td-secondary py-[50px] flex items-center justify-center px-5 h-[70vh]'>
            <div className='flex bg-white items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-2xl'>
                {!verified && (<div className='flex flex-col items-center justify-normal w-full gap-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-bold  text-[22px] sm:text-[35px]  text-td-secondary'>Verify</h1>
                        <div className='flex font-semibold text-sm gap-1'>
                            <span className=' text-gray-500 flex flex-wrap'>a six digit security code is sent to your email</span>

                        </div>
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <input type="email" placeholder='Enter the verification code' className='border px-5 py-2 rounded-2xl bg-slate-200' value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} />

                        <button onClick={handleVerify} className='bg-td-secondary rounded-2xl h-12  px-3 py-3 text-white font-semibold'>
                            {isLoading && (
                                <PulseLoader color="#ffffff" size={15} />
                            )}
                            {!isLoading && (
                                <span className="text-[15px] w-full">Verify</span>
                            )}
                        </button>
                    </div>
                    <span onClick={handleResend} className="text-sm cursor-pointer font-semibold">didnt recive the code?<span className='text-blue-950'>resend</span></span>
                </div>
                )}

                {verified && (<div className='flex flex-col items-center justify-normal w-full gap-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-bold  text-[22px] sm:text-[35px]  text-td-secondary'>New Password</h1>
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <input type="email" placeholder='Enter new password' className='border px-5 py-2 rounded-2xl bg-slate-200' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="email" placeholder='confirm the password' className='border px-5 py-2 rounded-2xl bg-slate-200' value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                        <button onClick={handleNewPassword} className='bg-td-secondary rounded-2xl h-12  px-3 py-3 text-white font-semibold'>
                            {isLoading && (
                                <PulseLoader color="#ffffff" size={15} />
                            )}
                            {!isLoading && (
                                <span className="text-[15px] w-full">Change password</span>
                            )}
                        </button>
                    </div>
                    {/* <span onClick={handleResend} className="text-sm cursor-pointer font-semibold">didnt recive the code?<span className='text-blue-950'>resend</span></span> */}
                </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
