"use client"

import { useUser } from '@/context/useUser'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaAddressCard } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { RiAccountCircleFill } from 'react-icons/ri'

const UserProfile = () => {
    const router = useRouter()
    const { LogOut, currentUser } = useUser()
    const { userId } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const res = await axios.get(`/api/user/${userId}`)
            const userData = res.data
            setFormData({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await axios.put(`/api/user/${userId}`, formData)
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log(error)
            toast.error("Failed to update profile")
        }
    }

    const logOut = async () => {
        try {
            LogOut()
            await axios.get("/api/logout")
            toast.success("Logout Success")
            router.push(`/account/login`)
        } catch (error) {
            console.log(error)
        }
    }

    if (currentUser?.token && currentUser.isAdmin === true) {
        return router.push('/admin-panel')
    }

    if (!currentUser?.token) {
        return router.push(`/account/login`)
    }

    return (
        <div className='flex flex-col items-center justify-center gap-3 py-2 px-5'>
            <h1 className='text-[30px] text-td-secondary font-bold'>Profile</h1>
            <div className="flex  md:flex-row flex-col w-full h-full gap-2">
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3 border px-5 py-8 rounded-2xl lg:w-1/2 w-full bg-slate-50'>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <RiAccountCircleFill size={30} />
                        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} className='border px-5  py-2 rounded-2xl bg-slate-200 w-full' />
                    </div>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <MdEmail size={30} />
                        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} className='border px-5 w-full py-2 rounded-2xl bg-slate-200' />
                    </div>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <FaPhoneAlt size={30} />
                        <input type="phone" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} className='border px-5  w-full py-2 rounded-2xl bg-slate-200' />
                    </div>
                    <div className='flex items-start justify-center gap-2 w-full '>
                        <FaAddressCard size={30} />
                        <textarea id="address" name="address" className='border px-5  py-2 w-full rounded-2xl bg-slate-200 min-h-[150px]' placeholder='Address' value={formData.address} onChange={handleChange} />
                    </div>
                    <button className={`px-5 rounded-2xl py-3 border bg-td-secondary text-white font-bold`} type='submit'>Save</button>
                </form>
                <div className='flex items-center justify-center flex-col lg:w-1/2 w-full border px-5 py-8 gap-1 rounded-2xl'>
                    <button onClick={() => router.push(`/account/${userId}/wishlist`)} className='px-5 rounded-2xl py-3 border  bg-td-secondary text-white font-bold w-[200px]'>WishList</button>
                    <button onClick={() => router.push(`/account/${userId}/orders`)} className='px-5 rounded-2xl py-3 border bg-td-secondary text-white font-bold w-[200px]'>Orders</button>
                    <button onClick={() => router.push(`/account/${userId}/changePassword`)} className='px-5 rounded-2xl py-3 border  bg-td-secondary text-white font-bold w-[200px]'>Change Password</button>
                    <button onClick={logOut} className='px-5 rounded-2xl py-3 border  bg-red-700 text-white font-bold w-[200px]'>LogOut</button>
                </div>
            </div>

        </div>
    )
}

export default UserProfile