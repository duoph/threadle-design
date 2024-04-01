"use client"

import { useUser } from '@/context/useUser';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';


const ForgotPassword = () => {
    const [securityCode, setSecurityCode] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();


    const handleResend = async () => {
        try {

        } catch (error) {

        }
    }


    const handleVerify = async () => {
        try {
            setIsLoading(true);

            if (!securityCode) {
                setIsLoading(false);
                toast.error('Enter valid credentials');
                return;
            }

            const response = await axios.post('/api/forgot-password', {
                securityCode
            });


            if (response.data.success) {
                toast.success(response.data.message)
                router.push("/admin-panel")
            }

            if (response.data.success === false) {
                toast.error("Unable to make admin")
            }



            setIsLoading(false);


        } catch (error) {
            setIsLoading(false);
            console.error('Error during login:', error);
            toast.error('Error unable to create admin');
        }
    };


    // if (currentUser?.token && currentUser.isAdmin === true) {
    //     return router.push('/admin-panel')
    // }

    // if (currentUser?.token && currentUser.isAdmin === false) {
    //     return router.push(`/account/${currentUser.userId}`)
    // 

    return (
        <div className='bg-td-secondary py-[50px] flex items-center justify-center px-5 h-[70vh]'>
            <div className='flex bg-white flex-col gap-5 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-2xl'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold  text-[22px] sm:text-[35px]  text-td-secondary'>Verify</h1>
                    <span className='font-bold  text-sm text-gray-500 flex gap-1'>a six digit security code is sent to your email <p onClick={handleResend} className="text-blue-950 cursor-pointer">resend</p></span>
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
            </div>
        </div>
    );
};

export default ForgotPassword;
