"use client"

// import { useAdmin } from '@/context/admin';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const AdminPanel = () => {

    // const { admin: adminDetails } = useAdmin();
    // const router = useRouter()

    // useEffect(() => {
    //     if (adminDetails.token) {
    //         try {
    //             router.push('/admin-panel');
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }, [adminDetails.token, router]);

    return (
        <div className='h-[50vh] flex flex-col items-center justify-center gap-4 '>
            <Link href="/admin-panel/create-product" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Product</Link>
            <Link href="/admin-panel/create-category" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Category</Link>
        </div>
    )
}

export default AdminPanel