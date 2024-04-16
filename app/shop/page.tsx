"use client"

import React, { useEffect, useState } from 'react';
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product');
      setProducts(response.data.tdProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
  };

  useEffect(() => {
    fetchProducts();
    handleSort("newAdded");
  }, []);

  useEffect(() => {
    const filtered = products.filter((product: Product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.desc?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchProducts(filtered);
  }, [search, products]);

  const indexOfLastProduct = currentPage * 20;
  const indexOfFirstProduct = indexOfLastProduct - 20;
  const currentProducts = searchProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    window.scrollTo(0, 0)
    setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    window.scrollTo(0, 0)
    setCurrentPage(currentPage - 1)
  }


  return (
    <div className='flex flex-col gap-5 items-center justify-center px-2 lg:px-3 py-10'>
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
          Showing {Math.min(currentProducts.length, 20)} of {searchProducts.length} Products
        </span>
        <select
          className='rounded-2xl text-gray-400 font-light text-[12px] md:text-[15px] px-2 py-2'
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="newAdded">Sort by</option>
          <option value="newAdded">Newly Added</option>
          <option value="lowToHigh">Price Low-To-High</option>
          <option value="highToLow">Price High-To-Low</option>
        </select>
      </div>
      <div className='flex min-h-[60vh] items-start justify-center gap-[4px] flex-wrap md:gap-5'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            product.inStock && <ProductCard getProducts={fetchProducts} key={product._id} product={product} />
          ))
        ) : (
          <div className="pt-32">
            <PulseLoader />
          </div>
        )}
      </div>
      <div>
        {searchProducts.length > 20 && (
          <ul className="pagination flex gap-3">
            <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-2xl py-2 bg-td-secondary px-6 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <button onClick={prevPage} disabled={currentPage === 1} className="page-link">Prev</button>
            </li>
            <li className={` cursor-pointer page-item border flex items-center justify-center text-white rounded-2xl py-2 bg-td-secondary px-6 ${indexOfLastProduct >= searchProducts.length ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <button onClick={nextPage} disabled={indexOfLastProduct >= searchProducts.length} className="page-link">Next</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Shop;