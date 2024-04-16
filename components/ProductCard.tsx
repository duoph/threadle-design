"use client"


import { useUser } from '@/context/useUser';
import { Product } from '@/types';
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from "react-icons/fa6";
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
        const userId = currentUser?.userId
        try {
            const res = await axios.get(`/api/wishlistFetch/${userId}`)
            console.log(res)
            setWishListIds(res?.data?.user.wishList)
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
            userWishlist()
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
            userWishlist()
            getProducts()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userWishlist()
    }, [handleDislike, handleLike])


    return (
        <div className='relative border flex gap-2 flex-col items-center justify-between  w-[calc(100vw-10px)] xs:w-[175px] md:w-[300px]  cursor-pointer rounded-lg  transition-all ease-in-out duration-700 bg-gray-200'>
            <div onClick={() => router.push(`/shop/${product._id}`)} className='w-full'>
                <div className='relative flex items-center justify-center h-[200px] md:h-[250px] w-full'>
                    {!product.inStock && <div className='absolute top-0 z-10 right-0 w-full h-full bg-black bg-opacity-50 rounded-lg flex items-center justify-center'>
                        <span className='text-white'>Out of stock</span>
                    </div>}
                    {!product?.coverImageURL && (
                        <Image src={"/noImage.jpg"} style={{ objectFit: "cover" }} alt='Image' className='rounded-lg' quality={50} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    )}
                    {product?.coverImageURL && (
                        <Image src={product?.coverImageURL} style={{ objectFit: "cover" }} className='rounded-lg' quality={50} fill alt='Red-Dress' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    )}
                </div>
                <div className='w-full px-3 py-2 flex flex-col gap-2 '>
                    <p className='text-start break-all font-light truncate '>{product?.title}</p>
                    <div className='flex gap-3'>
                        {!product?.isCustom ? (
                            <>
                                {product?.salePrice ? (
                                    <>
                                        <p className={`font-medium ${product?.salePrice && "line-through"}`}>&#8377;{product?.regularPrice}</p>
                                        <p className={`text-red-600 font-medium`}>&#8377;{product?.salePrice}</p>
                                    </>
                                ) : (
                                    <p className={`font-medium`}>&#8377;{product?.regularPrice}</p>
                                )}
                            </>
                        ) : (
                            <span className={`text-red-600 font-medium flex items-center gap-2`}>  &#8377; <span className={`text-red-600 text-[14px] md:text-[16px]`}>Custom Pricing</span></span>
                        )}
                    </div>
                </div>
            </div>

            {!currentUser?.isAdmin && (

                <div className='absolute w-[42px] flex z-20 gap-2 top-2 right-2'>

                    {wishlistIds?.includes(product?._id) ? (
                        <button onClick={handleDislike} className='flex border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                            <FaHeart className='text-center w-full text-td-secondary hover:scale-110' size={20} />
                        </button>
                    ) : (<button onClick={handleLike} className='flex border rounded-full py-2 items-center justify-center px-2 bg-white text-white '>
                        <CiHeart className='text-center w-full text-td-secondary hover:scale-110' size={20} />
                    </button>)}
                </div>
            )
            }

            {
                currentUser?.isAdmin && (
                    <div className="flex items-center justify-center w-full gap-1 p-1">
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
                    <div className=' fixed top-0 bg-black bg-opacity-50 left-0 w-full h-full flex items-center justify-center z-50 md:px-10 px-5'>
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