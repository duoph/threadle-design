import React from 'react'

const NewsLetterContainer = () => {
    return (
        <div className='lg:px-10 px-5 w-full mb-10'>
            <div className='bg-td-secondary flex md:flex-row flex-col gap-3 md:gap-0items-center justify-between rounded-2xl w-full lg:px-10 px-5 py-10  '>
                <div className='md:w-1/2 flex items-center justify-center w-full'>
                    <h1 className='font-bold text-white text-[30px]'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                </div>
                <div className='flex flex-col items-center justify-center gap-3 md:w-1/2'>
                    <input type="text"
                        className='rounded-2xl px-5 py-2 w-full'
                        placeholder='Enter your email address' />
                    <button className='bg-white text-black px-5 py-2 rounded-2xl w-full font-bold'>Subscribe To Newsletter</button>
                </div>
            </div>
        </div>
    )
}

export default NewsLetterContainer