"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { FaLock, FaPhone, FaSquareWhatsapp } from 'react-icons/fa6';
import { PulseLoader } from 'react-spinners';

interface FormData {
    phone: string;
    name: string;
    email: string;
    password: string;
    whatsApp: string;
    confirmPassword: string;
}

const CreateAccount = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showWhatsApp, setShowWhatsApp] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        phone: '',
        whatsApp: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const passwordsMatch = () => {
        return formData.password === formData.confirmPassword;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.email || !formData.password || (showWhatsApp && !formData.whatsApp)) {
            toast.error("All fields are required");
            return;
        }

        if (!passwordsMatch()) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('whatsApp', showWhatsApp ? formData.whatsApp : formData.phone);

            const response = await axios.post('/api/create-account', formDataToSend);

            if (response.data.success) {
                toast.success("Account created successfully");
                router.push(`/account/login`);
            } else {
                toast.error(response.data.message);
                console.log(response.data);
            }
        } catch (error) {
            toast.error("Unable to create account");
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center gap-3 py-5 md:px-10 px-5 min-h-[90vh]'>
            <div className='flex items-center justify-center pb-10 w-full'>
                <form onSubmit={handleSubmit} className='rounded-md bg-white flex flex-col gap-3 md:w-[400px] w-full md:px-10 py-8 px-5'>
                    <div className='flex flex-col items-center justify-start'>
                        <h1 className='text-center font-bold text-td-secondary text-[30px]'>Create Account</h1>
                        {!passwordsMatch() && formData.confirmPassword && <span className='text-red-600 text-center transition-all ease-in-out duration-300'>Passwords do not match</span>}
                    </div>
                    <div className='flex items-center justify-center gap-2 rounded-md border px-2'>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Name'
                            className='w-full px-3 py-3 focus:outline-none'
                        />
                    </div>
                    <div className='flex items-center justify-center gap-2 rounded-md border px-2'>
                        <span className=''>+91</span>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            maxLength={10}
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='Phone'
                            className='w-full px-3 py-3 focus:outline-none'
                        />
                    </div>
                    {showWhatsApp && (
                        <div className='flex items-center justify-center gap-2 rounded-md border px-2'>
                            <span className=''>+91</span>
                            <input
                                type="text"
                                id="whatsApp"
                                name="whatsApp"
                                maxLength={10}
                                value={formData.whatsApp}
                                onChange={handleChange}
                                placeholder='WhatsApp'
                                className='w-full px-3 py-3 focus:outline-none'
                            />
                        </div>
                    )}
                    <div className='flex items-center justify-start gap-2'>
                        <input
                            type="checkbox"
                            id="whatsAppCheck"
                            name="whatsAppCheck"
                            checked={showWhatsApp}
                            onChange={() => setShowWhatsApp(!showWhatsApp)}
                            className='border px-5 py-2 rounded-md'
                        />
                        <label htmlFor="whatsAppCheck" className='font-medium text-sm'>Have a different WhatsApp number</label>
                    </div>
                    <div className='flex items-center justify-center gap-2 rounded-md border px-2'>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className='w-full px-3 py-3 focus:outline-none'
                        />
                    </div>
                    <div className={`flex items-center justify-center gap-2 rounded-md border px-2 ${!passwordsMatch() && formData.confirmPassword ? 'border-red-600 focus:border-red-500' : ''}`}>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            className='w-full px-3 py-3 focus:outline-none'
                        />
                    </div>
                    <button type="submit" className='bg-td-secondary h-12 text-white px-5 py-3 rounded-md mt-4 w-full'>
                        {isLoading ? (
                            <PulseLoader color="#ffffff" size={15} />
                        ) : (
                            <span className="text-[15px] w-full">Create Account</span>
                        )}
                    </button>
                    <span className='text-center text-sm'>Already have an account? <span className='cursor-pointer text-blue-900 underline' onClick={() => router.push('/account/login')}>Login</span></span>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
