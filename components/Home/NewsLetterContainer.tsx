"use client"


import React, { useState } from 'react'
import toast from 'react-hot-toast'

const NewsLetterContainer = () => {

    const [phone, setPhone] = useState<string>()

    const handleSubmit = () => {
        try {
            setPhone("")
            toast.success("Succesfully subscribed to Newsletter")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='lg:px-10 px-5 w-full mb-10'>
            <div className='bg-td-secondary flex md:flex-row flex-col gap-3 md:gap-3  rounded-md w-full lg:px-10 px-5 py-10  '>
                <div className='md:w-1/2 flex items-center justify-center w-full'>
                    <h1 className='font-bold text-white text-[30px]'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                </div>
                <div className='flex flex-col items-center justify-center gap-3 md:w-1/2'>
                    <input type="text"
                        value={phone}
                        maxLength={10}
                        onChange={(e) => setPhone(e.target.value)}
                        className='rounded-md px-5 py-2 w-full'
                        placeholder='Enter Your Phone Number' />
                    <button onClick={handleSubmit} className='bg-white text-td-secondary font-normal px-5 py-2 rounded-md w-full'>Subscribe To Newsletter</button>
                </div>
            </div>
        </div>
    )
}

export default NewsLetterContainer