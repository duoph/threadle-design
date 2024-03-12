"use client"

import React, { useEffect, useState } from 'react'
import CartProductCard from '@/components/CartProductCard'
import { Cart } from '@/types'
import axios from 'axios'
import { FaLongArrowAltRight } from 'react-icons/fa'

const CartPage = () => {

  const [cart, setCart] = useState<Cart[]>()


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

  useEffect(() => {
    cartItemsFetch()
  }, [])


  return (
    <div className="flex flex-col items-center justify-center lg:px-10 px-5 py-5 ">
      <div className='flex items-center justify-center pb-5'>
        <h1 className='text-[30px] font-bold text-td-secondary'>My Cart</h1>
      </div>
      <div className='flex gap-5 md:flex-row flex-col w-full'>
        <div className=' w-full flex flex-col items-center justify-center border rounded-2xl min-h-[100px]'>
          {cart?.length === 0 && <span className='font-light'>Your cart is empty</span>}
          {cart?.map((item: Cart) => (
            <>
              <CartProductCard cartItemsFetch={cartItemsFetch} key={item._id} product={item} />
              <div className=' border-b w-2/3'></div>
            </>

          ))}

          {/* <div className=' border-b w-2/3'></div> */}
        </div>
        <div className='flex items-center justify-center  w-full h-[20vh] border rounded-2xl p-5'>
          <button className='flex items-center justify-center gap-3 w-2/3 rounded-2xl px-3 py-3 text-white bg-td-primary hover:scale-105 transition-all duration-300 ease-in-out'>
            CheckOut <FaLongArrowAltRight color='white' size={20} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default CartPage