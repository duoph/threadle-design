"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io';

interface FormData {
    phone: string;
    name: string;
    email: string;
    password: string;
}

const CreateAccount = () => {
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
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            const response = await fetch('/api/user-account', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                // Handle non-successful response here
                console.error('Failed to create account:', response.statusText);
                return;
            }

            const result = await response.json();
            console.log('Account created successfully:', result);
            // Add any additional logic or redirect after successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='flex flex-col bg-td-secondary gap-3 py-5 md:px-10 px-5'>
            <div className='flex text-white gap-2 items-center justify-start'>
                <IoMdArrowBack className="cursor-pointer hover:scale-110" onClick={() => router.back()} size={24} />
                <h1 className='font-bold text-[25px]'>Home</h1>
            </div>

            <div className='flex items-center justify-center  w-full'>
                <form onSubmit={handleSubmit} className='rounded-2xl bg-white px-5 py-10 md:w-[400px] w-full text-[20px] '>
                    <h1 className='text-center font-bold text-td-secondary text-[30px]'>Create Account</h1>
                    <div className='flex flex-col'>
                        <h1 className="font-bold text-[18px]">Name</h1>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='bg-gray-200 rounded-2xl px-5 py-3 '
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className="font-bold text-[18px]">Phone</h1>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className='bg-gray-200 rounded-2xl px-5 py-3'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className="font-bold text-[18px]">Email</h1>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='bg-gray-200 rounded-2xl px-5 py-3'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className="font-bold text-[18px]" >Password</h1>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='bg-gray-200 rounded-2xl px-5 py-3'
                        />
                    </div>
                    <button type="submit" className='bg-td-secondary text-white px-5 py-3 rounded-2xl mt-4 w-full'>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
