"use client"

import { countryCode } from '@/data/countryCodes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { CiUser } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { FaLock, FaPhone, FaSquareWhatsapp, FaUser } from 'react-icons/fa6';
import { IoMdArrowBack } from 'react-icons/io';
import { MdEmail, MdOutlineEmail } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';

interface FormData {
    phone: string;
    name: string;
    email: string;
    password: string;
    whatsApp: string;
    confirmPassword: string;
    countryCode: string
}

const CreateAccount = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmPass, setConfirmPass] = useState<string>()
    const [showWhatsApp, setShowWhatsApp] = useState<boolean>(false); // State variable for showing WhatsApp input


    const [formData, setFormData] = useState<FormData>({
        phone: '',
        whatsApp: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        countryCode: ''
    });

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isMatchCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPass(value);
    };

    const passwordsMatch = () => {
        return formData.password === confirmPass;
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!passwordsMatch()) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true)

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            showWhatsApp ? formDataToSend.append('whatsApp', formData.whatsApp) : formDataToSend.append('whatsApp', formData.phone)


            if (formData.name === "" || formData.phone === "" || formData.email === "" || formData.password === "") {
                toast.error("Unable to create account")
                setIsLoading(false)
            }

            const response = await axios.post('/api/create-account', formDataToSend);


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
        <div className='flex flex-col items-center justify-center bg-td-secondary gap-3 py-5 md:px-10 px-5 min-h-[85vh]'>

            <div className='flex items-center justify-center pb-10 w-full'>

                <form onSubmit={handleSubmit} className='rounded-2xl bg-white flex flex-col gap-3 md:w-[400px] w-full md:px-10 py-8 px-5 '>
                    <div className='h-[10vh] flex flex-col items-center justify-start'>
                        <h1 className='text-center font-bold text-td-secondary text-[30px]'>Create Account</h1>
                        {!passwordsMatch() && confirmPass && <span className='text-red-600 text-center transition-all ease-in-out duration-300 '>Password dosn&#39;t match</span>}
                    </div>

                    <div className='flex items-center justify-center gap-2 '>
                        <FaUserCircle size={24} />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Name' className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
                        />
                    </div>
                    {/* <div className='flex items-center justify-center gap-2'>
                        <MdEmail size={24} />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email' className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
                        />
                    </div> */}
                    <div className='flex items-center justify-center gap-2 '>
                        <FaPhone size={24} />
                        <div className='flex rounded-2xl bg-slate-200 w-full'>
                            <select name="" id="" className='w-[80px] px-1  bg-slate-200 rounded-2xl'>
                                <option value="+91">+91</option>
                                {countryCode.map((country: any) => (
                                    <option key={country.name} value={country.dial_code}>
                                        {country.dial_code}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder='Phone' className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
                            />
                        </div>
                    </div>

                    {showWhatsApp && (
                        <div className='flex items-center justify-center gap-2 '>
                            <FaSquareWhatsapp size={24} />
                            <div className='flex rounded-2xl bg-slate-200 w-full'>
                                <select value={formData.countryCode}
                                    onChange={handleChange} className='w-[80px] px-1  bg-slate-200 rounded-2xl'>
                                    <option value="+91">+91</option>
                                    {countryCode.map((country: any) => (
                                        <option key={country.name} value={country.dial_code}>
                                            {country.dial_code} {country.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    id="whatsApp"
                                    name="whatsApp"
                                    value={formData.whatsApp}
                                    onChange={handleChange}
                                    placeholder='whatsApp' className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
                                />
                            </div>
                        </div>
                    )}

                    <div className='flex items-center justify-start gap-2 px-1'>
                        <input
                            type="checkbox"
                            id="whatsAppCheck"
                            name="whatsAppCheck"
                            checked={showWhatsApp}
                            onChange={(e) => setShowWhatsApp(!showWhatsApp)}
                            placeholder='whatsAppCheck' className='border px-5 py-2 rounded-2xl bg-slate-200'
                        />
                        <label htmlFor="whatsAppCheck" className='font-medium text-sm'>have a diffrent whatsapp number</label>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <FaLock size={24} />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
                        />
                    </div>
                    <div className={`flex items-center justify-center gap-2 ${!passwordsMatch() && 'border-red-600 focus:border-red-500'}`}>
                        <FaLock size={24} />
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPass}
                            onChange={isMatchCheck}
                            placeholder='Confirm Password'
                            className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
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
            </div >
        </div >
    );
};

export default CreateAccount;
