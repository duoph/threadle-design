"use client"

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { PulseLoader } from 'react-spinners'

const Shop = () => {


  const [products, setProducts] = useState<Product[]>([])


  const router = useRouter()

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product')

      console.log(response.data.tdProduct)

      setProducts(response.data.tdProduct)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchProducts()
  }, [])

  console.log(products)


  return (
    <div className='flex flex-col gap-5  items-center justify-center px-10 py-10'>
      <div className='rounded-2xl flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-6 w-full'>
        <input type="text" placeholder='Search Product' className='border px-4 py-4 rounded-2xl w-full' />
        <CiSearch className="rounded-2xl text-[30px] cursor-pointer text-white" />
      </div>
      <div className="w-full flex items-center justify-between">
        <span className="text-gray-400 font-light">Showing 1-{products?.length} of 100 Products</span>
        <span>Sort by : Most Popular</span>
      </div>
      {products && (<div className='flex items-center justify-center gap-5 flex-wrap md:px-10 px-5'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>)}
      {products.length === 0 && (<div className='flex min-h-[60vh] items-center justify-center gap-5 flex-wrap md:px-10 px-5'>
        <PulseLoader />
      </div>)}
    </div>
  )
}

export default Shop