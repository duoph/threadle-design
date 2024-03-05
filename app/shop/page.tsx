"use client"

import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { PulseLoader } from 'react-spinners';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product');
      setProducts(response.data.tdProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearch(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setSearchProducts([]);
    } else {
      const filtered = products.filter((product: Product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.desc.toLowerCase().includes(search.toLowerCase())
      );
      setSearchProducts(filtered);
    }
  }, [search, products]);

  return (
    <div className='flex flex-col gap-5 items-center justify-center px-5 lg:px-10 py-10'>
      <div className='rounded-2xl flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-6 w-full'>
        <input
          type='text'
          placeholder='Search Product'
          className='border px-4 py-4 rounded-2xl w-full'
          value={search}
          onChange={onSearch}
        />
        <CiSearch className='rounded-2xl text-[30px] cursor-pointer text-white' />
      </div>
      <div className='w-full flex items-center justify-between'>
        <span className='text-gray-400 font-light text-[12px] md:text-[15px]'>
          {searchProducts?.length
            ? `Showing ${Math.min(searchProducts.length, 20)} of ${searchProducts?.length} Products`
            : `Showing ${Math.min(products.length, 20)} of ${products.length} Products`}
        </span>

        <select className='rounded-2xl text-gray-400 font-light text-[12px] md:text-[15px] px-2 py-2'>
          <option value="lowToHigh">Sort By</option>
          <option value="lowToHigh">Price Low-To-High</option>
          <option value="highToLow">Price High-To-Low</option>
          <option value="newAdded">Newly Added</option>
        </select>

      </div>
      <div className='flex min-h-[60vh] items-center justify-center gap-5 flex-wrap md:px-10 px-5'>
        {search.trim() !== ''
          ? searchProducts.map((product) => (
            <ProductCard getProducts={fetchProducts} key={product._id} product={product} />
          ))
          : products.length > 0
            ? products.map((product) => (
              <ProductCard getProducts={fetchProducts} key={product._id} product={product} />
            ))
            : <PulseLoader />}
      </div>
    </div >
  );
};

export default Shop;
