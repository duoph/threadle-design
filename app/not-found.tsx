import Image from 'next/image'
import React from 'react'

const Notfound = () => {
    return (
        <div className='min-h-[70vh] w-full flex flex-col items-center justify-center'>
            <Image src={"/pg-notfound.jpg"} alt='404 Erorr' height={400} width={400} />
            <h1 className='font-bold'>Page Not found</h1>
        </div>
    )
}

export default Notfound