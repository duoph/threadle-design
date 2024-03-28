"use client"

import { useUser } from '@/context/useUser';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';


const LoginPageAdmin = () => {
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setCurrentUser } = useUser()

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


            if (response.data.success === true) {
                toast.success(response.data.message)
            }

            if (response.data.success === false) {
                toast.success("Unable to make admin")
            }

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
    // }



    return (
        <div className='bg-td-secondary py-10 flex items-start justify-center px-5 h-[80vh]'>
            <div className='flex bg-white flex-col gap-5 items-center justify-center w-full md:w-[350px] md:px-10 py-10 px-5 rounded-2xl'>
                <div>
                    <h1 className='font-bold text-[30px] text-td-secondary'>Create new admin</h1>
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
