"use client"

import { useUser } from '@/context/useUser';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const AdminPanel = () => {


  const { LogOut, currentUser } = useUser()
  const router = useRouter()

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


  // useEffect(() => {
  //     if (!currentUser?.token || currentUser?.isAdmin === false) {
  //       router.push('/account/login');
  //     }
  //   }, [currentUser]);


  return (
    <div className='py-10 flex flex-col items-center justify-center gap-4 '>
      <Link href="/admin-panel/create-product" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Product</Link>
      <Link href="/admin-panel/create-category" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Category</Link>
      <Link href="/admin-panel/view-products" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>View All Product</Link>
      <Link href="/admin-panel/view-categories" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>View All Category</Link>
      <Link href="/" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Orders</Link>
      <button className='bg-red-600 px-10 py-4 rounded-2xl text-white' onClick={logOut}>Logout</button>
    </div>
  )
}

export default AdminPanel