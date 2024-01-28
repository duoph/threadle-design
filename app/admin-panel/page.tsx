import Link from 'next/link'
import React from 'react'

const AdminPanel = () => {
    return (
        <div className='h-[50vh] flex flex-col items-center justify-center gap-4 '>
            <Link href="/admin-panel/add-product" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Product</Link>
            <Link href="/admin-panel/create-category" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Add Category</Link>
        </div>
    )
}

export default AdminPanel