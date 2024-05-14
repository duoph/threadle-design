"use client"


import { Category } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PulseLoader } from 'react-spinners'

const ViewAllCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [idToDelete, setIdToDelete] = useState<string | null>(null)

    const router = useRouter()

    const fetchCategory = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('/api/category')
            setCategories(response?.data?.tdCategory)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleDelete = async () => {
        try {
            if (idToDelete) {
                const res = await axios.delete(`/api/category/${idToDelete}`)
                fetchCategory()
                toast.success(res.data.message)
                setDeleteConfirm(false)
                setIdToDelete(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh] '>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Categories</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen w-full flex items-start justify-center md:px-5 '>
            {deleteConfirm && (
                <div className=' fixed top-0 bg-black bg-opacity-50 left-0 w-full h-full flex items-center justify-center  md:px-10 px-5 z-50'>
                    <div className='bg-white p-6 rounded-md shadow-2xl py-10 px-10'>
                        <h1 className='text-xl font-bold'>Are you sure?</h1>
                        <div className='mt-4 flex justify-center'>
                            <button className='bg-red-600 text-white px-4 py-2 rounded-md mr-2' onClick={handleDelete}>Delete</button>
                            <button className='bg-gray-300 text-gray-800 px-4 py-2 rounded-md' onClick={() => setDeleteConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className=' py-5 flex flex-col items-center justify-start gap-5 min-h-[85vh]'>
                <div>
                    <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Categories</h1>
                </div>

                <div className='flex flex-wrap items-center justify-center gap-4'>
                    {categories.map((cat: Category, i) => (
                        <div key={i} className='relative w-[calc(100vw-10px)] xs:w-[175px] md:w-[300px] shadow-2xl pb-10 flex flex-col bg-td-secondary rounded-md'>
                            <Image
                                quality={50}
                                src={cat.imageURL || "/noImage.jpg"}
                                alt='Image'
                                className='rounded-md min-h-[300px] max-h-[300px]'
                                style={{ objectFit: "cover" }}
                                height={400}
                                width={400}
                                onClick={() => router.push(`/admin-panel/edit-category/${cat._id}`)}
                            />
                            <span className='w-full text-white px-5 py-3 text-center rounded-md cursor-pointer font-medium'>{cat.categoryName}</span>
                            <div className='flex flex-col w-full gap-4 items-center justify-evenly text-white px-5'>
                                <Link href={`/admin-panel/edit-category/${cat._id}`} className='bg-td-primary w-full px-2 py-2 rounded-md text-center font-light' >Edit</Link>
                                <Link href={`/admin-panel/view-products/${cat._id}`} className='bg-td-primary w-full px-4 py-3 rounded-md text-center font-light'>View Products</Link>
                                <button onClick={() => { setDeleteConfirm(true); setIdToDelete(cat._id) }} className='bg-red-600 w-full px-4 py-3 rounded-md font-light'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >

    )
}
export default ViewAllCategories
