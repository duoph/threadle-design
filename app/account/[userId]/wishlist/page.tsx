"use client"

import ProductCard from '@/components/ProductCard'
import { useUser } from '@/context/useUser'
import { Product } from '@/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const WishList = () => {


    const [products, setProducts] = useState<Product[]>([])

    const { currentUser } = useUser()

    const { userId } = useParams()

    const config = {
        headers: {
            'Authorization': `${currentUser?.token} ` as string
        }
    };

    const fetchWishlist = async () => {
        try {
            const res = await axios.get('/api/wishlist', config)
            setProducts(res?.data?.wishlist)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    return (
        <div className='px-5 lg:px-10 flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
                <h1 className='text-[30px] font-bold text-td-secondary'>Wishlist</h1>
            </div>
            <div className='flex items-center justify-center gap-5 flex-wrap md:px-10 px-5'>
                {products?.map((product) => (
                    <ProductCard getProducts={fetchWishlist} key={product._id} product={product} />
                ))}
            </div>

        </div>
    )
}

export default WishList