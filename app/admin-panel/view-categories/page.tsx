"use client"


import { Category } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ViewAllCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [idToDelete, setIdToDelete] = useState<string | null>(null) // Changed to nullable type

    const router = useRouter()

    const fetchCategory = async () => {
        try {
            const response = await axios.get('/api/category')
            setCategories(response?.data?.tdCategory)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleDelete = async () => {
        try {
            if (idToDelete) {
                // Perform deletion
                const res = await axios.delete(`/api/category/${idToDelete}`)
                // Update categories after deletion
                fetchCategory()
                toast.success(res.data.message)
                setDeleteConfirm(false)
                setIdToDelete(null)
            }
        } catch (error) {
            console.log(error)
            // Handle error appropriately (e.g., show error message)
        }
    }

    if (categories?.length === 0) {
        return (
            <div className='min-h-[80vh] md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3'>
                <div>
                    <p className='font-medium'>No Categories Available</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex items-center justify-center md:px-10 px-5'>
            {deleteConfirm && (
                <div className=' fixed top-0 bg-black bg-opacity-50 left-0 w-full h-full z-50 flex items-center justify-center  md:px-10 px-5'>
                    <div className='bg-white p-6 rounded-md shadow-2xl py-10 px-10'>
                        <h1 className='text-xl font-bold'>Are you sure?</h1>
                        {/* <p className='text-gray-700'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, vero.</p> */}
                        <div className='mt-4 flex justify-center'>
                            <button className='bg-red-600 text-white px-4 py-2 rounded-2xl mr-2' onClick={handleDelete}>Delete</button>
                            <button className='bg-gray-300 text-gray-800 px-4 py-2 rounded-2xl' onClick={() => setDeleteConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='min-h-[80vh] py-10 flex flex-col items-center justify-center gap-3 '>
                <div>
                    <h1 className='text-[30px] font-bold text-td-secondary'>Categories</h1>
                </div>

                <div className='flex flex-wrap items-center justify-center gap-5'>
                    {categories.map((cat: Category, i) => (
                        <div key={i} className='relative w-[300px] shadow-2xl pb-10 flex flex-col bg-td-secondary rounded-2xl'>
                            <Image
                                quality={50}
                                src={cat.imageURL || "/noImage.jpg"}
                                alt='Image'
                                className='rounded-2xl min-h-[300px] max-h-[300px]'
                                style={{ objectFit: "cover" }}
                                height={400}
                                width={400}
                                onClick={() => router.push(`/admin-panel/edit-category/${cat._id}`)}
                            />
                            <span className='w-full text-white px-5 py-5 text-center rounded-2xl cursor-pointer'>{cat.categoryName}</span>
                            <div className='flex flex-col w-full gap-4 items-center justify-evenly text-white px-5'>
                                <button className='bg-td-primary w-full px-4 py-3 rounded-xl font-medium' onClick={() => router.push(`/admin-panel/edit-category/${cat._id}`)}>Edit</button>
                                <button onClick={() => router.push(`/admin-panel/view-products/${cat._id}`)} className='bg-td-primary w-full px-4 py-3 rounded-xl font-medium'>View Products</button>
                                <button onClick={() => { setDeleteConfirm(true); setIdToDelete(cat._id) }} className='bg-red-600 w-full px-4 py-3 rounded-xl font-medium'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ViewAllCategories
