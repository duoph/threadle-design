"use client"

import React, { useEffect, useState } from 'react'
import CartProductCard from '@/components/CartProductCard'
import { Cart } from '@/types'
import axios from 'axios'
import { FaLongArrowAltRight } from 'react-icons/fa'

const CartPage = () => {

  const [cart, setCart] = useState<Cart[]>()
  const [total, setTotal] = useState<number>(0)


  const cartItemsFetch = async () => {
    try {

      const res = await axios.get("/api/cart")

      if (res?.data?.success === true) {
        setCart(res?.data?.cartItems)
      }

      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }

  const subTotal = () => {
    try {
      let sum = 0;
      cart?.forEach(item => {
        sum += item?.price * item.quantity;
      });
      return sum;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };


  useEffect(() => {
    cartItemsFetch()
  }, [])

  useEffect(() => {
    cartItemsFetch()
    setTotal(subTotal())
  }, [cart]);

  return (
    <div className="flex flex-col items-center justify-center lg:px-10 px-5 py-5 ">
      <div className='flex items-center justify-center pb-5'>
        <h1 className='text-[30px] font-bold text-td-secondary'>My Cart</h1>
      </div>
      <div className='flex gap-5 md:flex-row flex-col w-full'>
        <div className=' w-full flex flex-col items-center justify-center border rounded-2xl min-h-[100px]'>
          {cart?.length === 0 || !cart && <span className='font-light'>Your cart is empty</span>}
          {cart?.map((item: Cart) => (
            <>
              <CartProductCard subTotal={subTotal} cartItemsFetch={cartItemsFetch} key={item._id} product={item} />
              <div className=' border-b w-2/3'></div>
            </>
          ))}

        </div>
        <div className='flex flex-col items-center justify-around  w-full max-h-[40vh] border rounded-2xl p-5'>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-[18px] font-medium'>Oder Summary</span>

            <span>Sub Total : <span className='text-red-600'> &#8377;{total}</span></span>
            <span>Delivery Charge : <span className='text-red-600'> &#8377;0</span></span>


            <div>
              <span> Total :<span className='text-red-600'> &#8377;{total}</span></span>
            </div>


            <span className='border-b-8 flex h-2'></span>
          </div>
          <button className='flex items-center justify-center gap-3 w-2/3 rounded-2xl px-3 py-3 text-white bg-td-primary hover:scale-95 transition-all duration-300 ease-in-out'>
            CheckOut <FaLongArrowAltRight color='white' size={20} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default CartPage