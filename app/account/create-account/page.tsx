"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io';
import { PulseLoader } from 'react-spinners';

interface FormData {
    phone: string;
    name: string;
    email: string;
    password: string;
}

const CreateAccount = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        phone: '',
        name: '',
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true)

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            if (formData.name === "" || formData.phone === "" || formData.email === "" || formData.password === "") {
                toast.error("Unable to create account")
                setIsLoading(false)
            }

            const response = await axios.post('/api/user-account', formDataToSend);


            if (response.data.success === true) {
                toast.success("Account created successfully")
                router.push('/account/login')
                setIsLoading(false)
            }

            if (!response.data.success === true) {
                console.log("error")
            }


            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error("Unable to create account")
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className='flex flex-col bg-td-secondary gap-3 py-5 md:px-10 px-5'>
            {/* <div className='flex text-white gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.push("/shop")} size={24} />
                <h1 className='font-bold text-[25px]'>Home</h1>
            </div> */}
            <div className='flex items-center justify-center pb-10 w-full'>
                <form onSubmit={handleSubmit} className='rounded-2xl bg-white flex flex-col gap-3 md:w-[350px] w-full md:px-10 py-10 px-5 '>
                    <h1 className='text-center font-bold text-td-secondary text-[30px]'>Create Account</h1>
                    <div className='flex flex-col'>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Name' className='border px-5 py-2 rounded-2xl bg-slate-200'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='Phone' className='border px-5 py-2 rounded-2xl bg-slate-200'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email' className='border px-5 py-2 rounded-2xl bg-slate-200'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password' className='border px-5 py-2 rounded-2xl bg-slate-200'
                        />
                    </div>
                    <button type="submit" className='bg-td-secondary h-12  text-white px-5 py-3 rounded-2xl mt-4 w-full'>
                        {isLoading && (
                            <PulseLoader color="#ffffff" size={15} />
                        )}
                        {!isLoading && (
                            <span onClick={handleSubmit} className="text-[15px] w-full">Create Account</span>
                        )}
                    </button>
                    <span className='text-center text-sm'>Already have an account?<span className='cursor-pointer text-blue-900 underline' onClick={() => router.push('/account/login')}>Login</span></span>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
