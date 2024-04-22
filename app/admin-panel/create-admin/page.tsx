"use client"

import { useUser } from '@/context/useUser';
import AdminPanelLayout from '@/layout/AdminPanelLayout';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';


const LoginPageAdmin = () => {
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();


    const handleCreateAdmin = async () => {
        try {
            setIsLoading(true);

            if (!email) {
                setIsLoading(false);
                toast.error('Enter valid credentials');
                return;
            }

            const response = await axios.post('/api/admin-panel/admin', {
                email
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
        <div className=' py-[50px] flex items-center justify-center px-5 h-[70vh] w-full'>
            <div className='flex bg-white flex-col gap-5 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-2xl'>
                <div>
                    <h1 className='font-bold  text-[22px] sm:text-[35px]  text-td-secondary'>Create new admin</h1>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <input type="email" placeholder='Email' className='border px-5 py-2 rounded-2xl bg-slate-200' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <button onClick={handleCreateAdmin} className='bg-td-secondary rounded-2xl h-12  px-3 py-3 text-white font-semibold'>
                        {isLoading && (
                            <PulseLoader color="#ffffff" size={15} />
                        )}
                        {!isLoading && (
                            <span className="text-[15px] w-full">Make Admin</span>
                        )}
                    </button>
                    {/* <span className='text-center text-sm'>view admin accounts?<span className='cursor-pointer text-blue-900 underline' onClick={() => router.push('/account/create-account')}>Click here</span></span> */}
                </div>
            </div>
        </div>

    );
};

export default LoginPageAdmin;
