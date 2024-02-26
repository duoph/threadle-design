"use client"

import { useUser } from '@/context/useUser';
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CiHeart, CiStar } from 'react-icons/ci'
import { FaCartPlus, FaStar } from "react-icons/fa6";
import { MdDelete, MdEdit } from 'react-icons/md';


const ProductCard = ({ product, getProducts }: any) => {

    const router = useRouter()
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)

    console.log(product)

    const { currentUser } = useUser()

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/product/${product._id}`)
        } catch (error) {
            console.log(error)
        }
        setDeleteConfirm(false)
        getProducts()
    }



    return (
        <div className='flex gap-2 flex-col items-center justify-center min-w-[300px] max-w-[300px] cursor-pointer shadow-xl rounded-2xl transition-all ease-in-out duration-700 py-4 px-3'>
            <div onClick={() => router.push(`/shop/${product._id}`)} className='w-full'>
                <div className='relative flex items-center justify-center h-[250px] w-full bg-gray-200 rounded-2xl'>
                    {!product?.coverImageURL && (
                        <Image src={"/noImage.jpg"} style={{ objectFit: "cover" }} alt='Image' className='rounded-2xl' fill />
                    )}
                    {product?.coverImageURL && (
                        <Image src={product?.coverImageURL} style={{ objectFit: "cover" }} className='rounded-2xl' fill alt='Red-Dress' />
                    )}
                </div>
                <div className='w-full px-3 py-2 flex flex-col gap-2 '>
                    <p className='text-start break-all'>{product?.title}</p>
                    <span className='text-start break-all flex items-center justify-start'>
                        <FaStar size={24} className='text-yellow-300' />
                        <FaStar size={24} className='text-yellow-300' />
                        <FaStar size={24} className='text-yellow-300' />
                        <FaStar size={24} className='text-yellow-300' />
                        <CiStar size={24} className='text-yellow-300' />
                        <span className='font-thin text-sm px-1'>4/5</span>
                    </span>
                    <p className='text-start break-all'>&#8377;3000</p>
                </div>

            </div>

            {!currentUser?.isAdmin && (
                <div className='flex gap-2 w-full items-center justify-between'>
                    <button className='flex  w-full border rounded-2xl py-3 items-center justify-center bg-white text-white '>
                        <CiHeart className='text-center w-full text-td-secondary hover:scale-110' size={24} />
                    </button>
                    <button className='flex w-full border rounded-2xl py-3 items-center justify-center bg-white text-white '>
                        <FaCartPlus className='text-center w-full text-td-secondary hover:scale-110' size={24} />
                    </button>
                </div>
            )}

            {currentUser?.isAdmin && (
                <div className="flex items-center justify-center w-full gap-2">
                    <button onClick={() => router.push(`/admin-panel/edit-product/${product._id}`)} className='flex w-full border rounded-2xl py-3 items-center justify-center bg-gray-600'>
                        <MdEdit className='text-center w-full text-white hover:scale-110' size={24} />
                    </button>
                    <button onClick={() => setDeleteConfirm(true)} className='flex w-full border rounded-2xl py-3 items-center justify-center bg-red-600'>
                        <MdDelete className='text-center w-full text-white hover:scale-110' size={24} />
                    </button>
                </div>
            )}

            {deleteConfirm && (
                <div className=' fixed top-0 bg-black bg-opacity-50 left-0 w-full h-full flex items-center justify-center z-10 md:px-10 px-5'>
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

        </div>
    )
}

export default ProductCard;