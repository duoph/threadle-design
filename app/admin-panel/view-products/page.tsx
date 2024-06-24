"use client"

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { PulseLoader } from 'react-spinners'

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
            product.desc?.toLowerCase().includes(search.toLowerCase()) || product?.tags?.toLowerCase().includes(search.toLowerCase())
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


    if (products?.length === 0) {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>All Products</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader color={"#014051"} />
                </div>
            </div>
        )
    }


    return (
        <div className='md:px-10  w-full flex flex-col flex-wrap items-center justify-center gap-3 px-2 lg:px-3 py-5 min-h-[85vh]'>
            <div>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>All Products</h1>
            </div>
            <div className='rounded-md flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-6 w-full'>
                <input
                    type='text'
                    placeholder='Search Product'
                    className='border px-4 py-4 rounded-md w-full'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <CiSearch className='rounded-md text-[30px] cursor-pointer text-white' />
            </div>
            <div className='min-h-[80vh] md:px-5 flex flex-col items-center justify-start gap-3'>
                <div className='flex min-h-[60vh] items-start justify-center z-40 gap-[9px] flex-wrap md:gap-5'>
                    {currentProducts.map((product) => (
                        <ProductCard key={product._id} getProducts={fetchProducts} product={product} />
                    ))}
                </div>
                {searchResults.length > 20 && (
                    <ul className="flex items-center justify-between w-full md:px-16 lg:px-20 sm:px-10 px-5 ">
                        <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-3  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button onClick={prevPage} disabled={currentPage === 1} className="flex items-center justify-center "> <MdNavigateBefore size={24} /> <span className='px-2'>Prev</span> </button>
                        </li>
                        <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-3 ${indexOfLastProduct >= searchResults.length ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <button onClick={nextPage} disabled={indexOfLastProduct >= searchResults.length} className="flex items-center justify-center"><span className='px-2'>Next</span> <MdNavigateNext size={24} /></button>
                        </li>
                    </ul>
                )}
            </div>
        </div>

    )
}

export default ViewAllProducts
