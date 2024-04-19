"use client"

import React, { useEffect, useState, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<string>("newAdded");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/product');
      setProducts(response.data.tdProduct);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSort = (sortBy: string) => {
    let sortedProducts: Product[] = searchProducts.length > 0 ? [...searchProducts] : [...products];

    switch (sortBy) {
      case "lowToHigh":
        sortedProducts = sortedProducts.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0));
        break;
      case "highToLow":
        sortedProducts = sortedProducts.sort((a, b) => (b.salePrice || 0) - (a.salePrice || 0));
        break;
      case "newAdded":
        sortedProducts = sortedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        break;
      default:
        break;
    }

    setSearchProducts(sortedProducts);
    setSortBy(sortBy);
  };

  useEffect(() => {
    fetchProducts();
    handleSort("newAdded");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        bottomBoundaryRef.current &&
        window.innerHeight + window.scrollY >= bottomBoundaryRef.current.offsetTop
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = products.filter((product: Product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.desc?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchProducts(filtered);
  }, [search, products]);

  const currentProducts = searchProducts.slice(0, currentPage * 20);

  return (
    <div className='flex flex-col gap-5 items-center justify-center px-2 lg:px-3 py-5 min-h-[85vh]'>
      <div className='rounded-2xl flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-6 w-full'>
        <input
          type='text'
          placeholder='Search Product'
          className='border px-4 py-4 rounded-2xl w-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CiSearch className='rounded-2xl text-[30px] cursor-pointer text-white' />
      </div>
      <div className='w-full flex items-center justify-between'>
        <span className='text-gray-400 font-light text-[12px] md:text-[15px]'>
          Showing {Math.min(currentProducts.length, searchProducts.length)} of {searchProducts.length} Products
        </span>
        <select
          className='rounded-2xl text-gray-400 font-light text-[12px] md:text-[15px] px-2 py-2'
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="newAdded">Sort by</option>
          <option value="newAdded">Newly Added</option>
          <option value="lowToHigh">Price Low-To-High</option>
          <option value="highToLow">Price High-To-Low</option>
        </select>
      </div>
      <div className='flex min-h-[60vh] items-start justify-center gap-[4px] flex-wrap md:gap-5'>
        {currentProducts.map((product, index) => (
          <ProductCard getProducts={fetchProducts} key={index} product={product} />
        ))}
        {loading && (
          <div className="pt-32">
            <PulseLoader />
          </div>
        )}
        <div ref={bottomBoundaryRef} />
      </div>
    </div>
  );
};

export default Shop;
