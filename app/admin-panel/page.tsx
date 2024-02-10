"use client"

// import { useAdmin } from '@/context/admin';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const AdminPanel = () => {

    return (
        <div className='py-10 flex flex-col items-center justify-center gap-4 '>
            <Link href="/admin-panel/create-product" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Product</Link>
            <Link href="/admin-panel/create-category" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Category</Link>
            <Link href="/admin-panel/view-products" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>View All Product</Link>
            <Link href="/admin-panel/view-categories" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>View All Category</Link>
            <Link href="/" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Orders</Link>
        </div>
    )
}

export default AdminPanel