import React from 'react'

const Orders = () => {
    return (
        <div className='flex flex-col justify-center items-center py-5 gap-5'>
            <h1 className='text-td-secondary font-bold text-[30px]'>Order Dashboard</h1>
            <div className=' h-[30vh] flex  items-center justify-center'>
                <div className='flex flex-col md:flex-row gap-3 text-td-secondary font-bold text-[20px]'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className=''>Total Orders</h1>
                        <span>99</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h1>Paid Orders</h1>
                        <span>99</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h1>Shipped Orders</h1>
                        <span>99</span>
                    </div>
                </div>
            </div>
            <div className='bg-green-500 h-[30vh]'>

            </div>

        </div>
    )
}

export default Orders