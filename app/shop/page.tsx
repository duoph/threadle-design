"use client";

import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export const revalidate = 5000;

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product');
      setProducts(response.data.tdProduct);
      setSearchProducts(response.data.tdProduct); // Initially display all products
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Directly update the search state
  };

  const onSearch = () => {
    // Filter the products based on the search input
    if (search.trim() === '') {
      setSearchProducts(products); // Show all products if search is empty
    } else {
      const filteredProducts = products.filter((product: Product) =>
        product.title?.toLowerCase().includes(search.toLowerCase()) ||
        product.desc?.toLowerCase().includes(search.toLowerCase()) ||
        product?.tags?.toLowerCase().includes(search.toLowerCase())
      );
      setSearchProducts(filteredProducts);
    }
    setCurrentPage(1); // Reset to the first page after a search
  };

  const handleSort = (sortBy: string) => {
    setIsLoading(true);
    let sortedProducts: Product[] = searchProducts.length > 0 ? [...searchProducts] : [...products];

    switch (sortBy) {
      case 'lowToHigh':
        sortedProducts = sortedProducts.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0));
        break;
      case 'highToLow':
        sortedProducts = sortedProducts.sort((a, b) => (b.salePrice || 0) - (a.salePrice || 0));
        break;
      case 'newAdded':
        sortedProducts = sortedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        break;
      default:
        break;
    }

    setCurrentPage(1);
    setSearchProducts(sortedProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    handleSort('newAdded');
  }, []);

  const indexOfLastProduct = currentPage * 18;
  const indexOfFirstProduct = indexOfLastProduct - 18;
  const currentProducts = searchProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    window.scrollTo(0, 0);
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    window.scrollTo(0, 0);
    setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-start px-2 lg:px-3 py-5 min-h-[85vh]'>
        <div className="max-w-6xl w-full flex-col flex items-center justify-center">
          <div className='rounded-md flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-6 w-full'>
            <input
              type='text'
              placeholder='Search Product'
              className='border px-4 py-4 rounded-md w-full focus:outline-none'
              value={search}
              onChange={handleSearchChange}
            />
            <CiSearch className='rounded-md text-[30px] cursor-pointer text-white' />
          </div>
          <div>
            <PulseLoader color='#6A9AA7' className='mt-5' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-start px-2 lg:px-3 py-5 min-h-[85vh]'>
      <div className="max-w-6xl w-full flex-col flex items-center justify-center">
        <div className='rounded-md flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-6 w-full'>
          <input
            type='text'
            placeholder='Search Product'
            className='border px-4 py-4 rounded-md w-full focus:outline-none'
            value={search}
            onChange={handleSearchChange}
          />
          <CiSearch onClick={onSearch} className='rounded-md text-[30px] cursor-pointer text-white' />
        </div>
        <>
          <div className='w-full flex items-center justify-between my-4'>
            <span className='text-gray-400 font-light text-[12px] md:text-[15px]'>
              Showing {Math.min(currentProducts.length, 18)} of {searchProducts.length} Products
            </span>
            <select
              className='rounded-md text-gray-400 font-light text-[12px] md:text-[15px] px-2 py-2'
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="newAdded">Sort by</option>
              <option value="newAdded">Newly Added</option>
              <option value="lowToHigh">Price Low-To-High</option>
              <option value="highToLow">Price High-To-Low</option>
            </select>
          </div>
          <div className='flex min-h-[60vh] items-start justify-center gap-[9px] flex-wrap md:gap-5'>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                product.inStock && <ProductCard getProducts={fetchProducts} key={product._id} product={product} />
              ))
            ) : (
              <div className='flex items-center justify-center h-full w-full'>
                <span className=''>No Products Available</span>
              </div>
            )}
          </div>
          {searchProducts.length > 18 && (
            <ul className="flex items-center justify-between mt-4 gap-5 max-w-4xl">
              <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-3  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <button onClick={prevPage} disabled={currentPage === 1} className="flex items-center justify-center ">
                  <MdNavigateBefore size={24} /> <span className='px-2'>Prev</span>
                </button>
              </li>
              <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-3 ${indexOfLastProduct >= searchProducts.length ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <button onClick={nextPage} disabled={indexOfLastProduct >= searchProducts.length} className="flex items-center justify-center">
                  <span className='px-2'>Next</span> <MdNavigateNext size={24} />
                </button>
              </li>
            </ul>
          )}
        </>
      </div>
    </div>
  );
};

export default Shop;
