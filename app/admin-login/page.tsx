import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-[50vh] flex items-center justify-center '>
      <Link href="/admin-panel" className='bg-red-600 px-10 py-4 rounded-2xl text-white'>Go To The Admin Pannel</Link>
    </div>
  )
}

export default page