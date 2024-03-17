"use client"

import { useUser } from '@/context/useUser';
import { Product } from '@/types';
import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { CiHeart, CiStar } from 'react-icons/ci'
import { FaHeart, FaStar } from "react-icons/fa6";
import { MdDelete, MdEdit } from 'react-icons/md';

interface ProductCardProps {
    product: Product;
    getProducts: () => any; // Assuming getProducts is a function
}

const ProductCard = ({ product, getProducts }: ProductCardProps) => {

    const router = useRouter()
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [wishlistIds, setWishListIds] = useState<string[]>([])


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

    const userWishlist = async () => {
        try {
            const res = await axios.get(`/api/wishlist`)
            setWishListIds(res?.data?.user?.wishList?.map((item: any) => item._id))
        } catch (error) {
            console.log(error)
        }
    }


    const handleDislike = async () => {
        try {
            const res = await axios.put(`/api/wishlist/${product?._id}`)

            if (res.data.success === true) {
                toast.success("Removed from wishlist")
            }
            if (res.data.success === false) {
                toast.error(res?.data?.message)
            }
            getProducts()

        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async () => {
        try {
            const res = await axios.post(`/api/wishlist/${product?._id}`)
            if (res.data.success === true) {
                toast.success("Added to wishlist")
            }
            if (res.data.success === false) {
                toast.error(res?.data?.message)
            }
            getProducts()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userWishlist()
    }, [handleDislike, handleLike])


    return (
        <div className='relative flex gap-2 flex-col items-center justify-center w-[175px] cursor-pointer  transition-all ease-in-out duration-700 bg-gray-200 lg:hover:scale-105'>
            <div onClick={() => router.push(`/shop/${product._id}`)} className='w-full'>
                <div className='relative flex items-center justify-center h-[250px] w-full bg-gray-200 rounded-2xl'>
                    {!product?.coverImageURL && (
                        <Image src={"/noImage.jpg"} style={{ objectFit: "cover" }} alt='Image' className='rounded-2xl' quality={50} fill />
                    )}
                    {product?.coverImageURL && (
                        <Image src={product?.coverImageURL} style={{ objectFit: "cover" }} className='rounded-2xl' fill alt='Red-Dress' />
                    )}
                </div>
                <div className='w-full px-3 py-2 flex flex-col gap-2 '>
                    <p className='text-start break-all font-light truncate '>{product?.title}</p>
                    <div className='flex gap-3'>
                        <p className={` font-medium ${product?.salePrice && "line-through"}`}>&#8377;{product?.regularPrice}</p>
                        {product?.salePrice && <p className={` text-red-600 font-medium`}>&#8377;{product?.salePrice}</p>}
                    </div>
                </div>
            </div>

            {!currentUser?.isAdmin && (

                <div className='absolute w-[42px] flex gap-2 bottom-4 right-3'>

                    {wishlistIds?.includes(product?._id) ? (
                        <button onClick={handleDislike} className='flex border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                            <FaHeart className='text-center w-full text-td-secondary hover:scale-110' size={24} />
                        </button>
                    ) : (<button onClick={handleLike} className='flex  w-full border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                        <CiHeart className='text-center w-full text-td-secondary hover:scale-110' size={24} />
                    </button>)}
                </div>
            )
            }

            {
                currentUser?.isAdmin && (
                    <div className="flex items-center justify-center w-full gap-2">
                        <button onClick={() => router.push(`/admin-panel/edit-product/${product._id}`)} className='flex w-full border rounded-2xl py-3 items-center justify-center bg-gray-600'>
                            <MdEdit className='text-center w-full text-white hover:scale-110' size={24} />
                        </button>
                        <button onClick={() => setDeleteConfirm(true)} className='flex w-full border rounded-2xl py-3 items-center justify-center bg-red-600'>
                            <MdDelete className='text-center w-full text-white hover:scale-110' size={24} />
                        </button>
                    </div>
                )
            }

            {
                deleteConfirm && (
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
                )
            }

        </div >
    )
}

export default ProductCard;