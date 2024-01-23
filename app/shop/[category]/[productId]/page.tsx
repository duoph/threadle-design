import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import Image from 'next/image'
import { CiStar } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa6'


const page = () => {
  return (
    <div className='w-full px-5 py-3 md:px-10 flex flex-col gap-3 mb-5'>
      <div className=''>
        <h1 >Shop -  Categoy  - 123</h1>
      </div>
      <div className='flex flex-col w-full gap-3'>
        <div className='flex lg:flex-row flex-col gap-2 items-center justify-center bg-slate-200 '>
          <div>
            <Image src={"/greendress.png"} alt='greenDress' width={300} height={300} />
          </div>
          <div className='flex gap-2'>
            <Image src={"/greendress.png"} alt='greenDress' width={100} height={100} />
            <Image src={"/greendress.png"} alt='greenDress' width={100} height={100} />
            <Image src={"/greendress.png"} alt='greenDress' width={100} height={100} />
          </div>
        </div>
        <div className='flex flex-col gap-5 items-start justify-start md:w-1/2'>
          <h1 className='text-lg font-bold'>Green Dress</h1>
          <span className='text-start break-all flex items-center justify-start'>
            <FaStar size={24} className='text-yellow-300' />
            <FaStar size={24} className='text-yellow-300' />
            <FaStar size={24} className='text-yellow-300' />
            <FaStar size={24} className='text-yellow-300' />
            <CiStar size={24} className='text-yellow-300' />
            <span className='font-thin text-sm px-1'>4/5</span>
          </span>
          <p className='text-lg font-bold'>Rs 30000</p>
          <div className='flex flex-col gap-5 w-full'>
            <p>Select Colors</p>
            <div className='flex gap-3'>
              <span className='h-[25px] bg-red-700 w-[25px] rounded-[50%] inline-block'></span>
              <span className='h-[25px] bg-green-700 w-[25px] rounded-[50%] inline-block'></span>
              <span className='h-[25px] bg-blue-700 w-[25px] rounded-[50%] inline-block'></span>
            </div>
            <div className='flex gap-3 font-semibold'>
              <button className=' px-4 py-2 bg-gray-200 rounded-2xl '>Small</button>
              <button className='bg-td-primary text-white px-4 py-2  rounded-2xl '>Medium</button>
              <button className=' px-4 py-2 bg-gray-200 rounded-2xl '>Large</button>
            </div>
            <div className='flex gap-3 font-semibold w-full'>
              <span className='bg-gray-200 flex items-center justify-between gap-4 px-8 py-2 rounded-2xl w-1/2'>
                <span>-</span>
                <span>2</span>
                <span>+</span>
              </span>
              <button className='w-1/2 py-2 bg-td-primary rounded-2xl text-white'> Add to Cart </button>
            </div>
          </div>
        </div>
      </div>


      <div className='mt-5'>

        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore voluptatibus saepe voluptas quae sit harum cumque. Amet veritatis accusamus asperiores enim voluptas et sint, ad aliquam iure, autem fuga itaque error voluptatibus, hic laboriosam corrupti! Laborum minima debitis placeat, eius animi asperiores ad earum repudiandae. Quaerat ea natus doloribus suscipit?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum eum et culpa esse magnam nam eaque tenetur repellat numquam libero hic, repudiandae nihil est quos recusandae doloremque adipisci maxime, non in labore eius? Obcaecati, in ducimus ea id aliquam possimus optio at iste illum quisquam porro a nobis cupiditate laborum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, eos doloremque recusandae, sit voluptas error facere quaerat aliquam provident, voluptate accusantium suscipit fugit minus aut enim velit molestiae quis qui maiores optio soluta rem!</p>

      </div>

      <div>
        <ProductContainerWithCategory />
      </div>

    </div >
  )
}

export default page