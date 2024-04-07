"use client"

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const ViewAllProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [search, setSearch] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchResults, setSearchResults] = useState<Product[]>([])

    const router = useRouter()

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product')
            console.log(response.data.tdProduct)
            setProducts(response.data.tdProduct)
            setSearchResults(response.data.tdProduct)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        const filtered = products.filter((product: Product) =>
            product.title?.toLowerCase().includes(search.toLowerCase()) ||
            product.desc?.toLowerCase().includes(search.toLowerCase())
        )
        setSearchResults(filtered)
        setCurrentPage(1)
    }, [search, products])

    const indexOfLastProduct = currentPage * 20
    const indexOfFirstProduct = indexOfLastProduct - 20
    const currentProducts = searchResults.slice(indexOfFirstProduct, indexOfLastProduct)


    const nextPage = () => {
        window.scrollTo(0, 0)
        setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        window.scrollTo(0, 0)
        setCurrentPage(currentPage - 1)
    }
    return (
        <div className='md:px-10 px flex flex-col flex-wrap items-center justify-center gap-3 px-2 lg:px-3 py-10'>
            <div>
                <h1 className='text-[30px] font-bold text-td-secondary'>All Products</h1>
            </div>
            <div className='rounded-2xl flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-6 w-full'>
                <input
                    type='text'
                    placeholder='Search Product'
                    className='border px-4 py-4 rounded-2xl w-full'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <CiSearch className='rounded-2xl text-[30px] cursor-pointer text-white' />
            </div>
            <div className='min-h-[80vh] md:px-10 py-10 flex flex-col items-center justify-center gap-3'>

                <div className='flex min-h-[60vh] items-start justify-center gap-[4px] flex-wrap md:gap-5'>
                    {currentProducts.map((product) => (
                        <ProductCard key={product._id} getProducts={fetchProducts} product={product} />
                    ))}
                </div>
                {searchResults.length > 20 && (
                    <ul className='pagination flex gap-3'>
                        <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-2xl py-2 bg-td-secondary px-6 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button onClick={prevPage} disabled={currentPage === 1} className='page-link'>
                                Prev
                            </button>
                        </li>
                        <li className={` cursor-pointer page-item border flex items-center justify-center text-white rounded-2xl py-2 bg-td-secondary px-6 ${indexOfLastProduct >= searchResults.length ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button onClick={nextPage} disabled={indexOfLastProduct >= searchResults.length} className='page-link'>
                                Next
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default ViewAllProducts
