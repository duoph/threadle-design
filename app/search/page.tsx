import ProductCard from "@/components/ProductCard";
import { CiSearch } from "react-icons/ci";


const page = () => {
    return (
        <div className='mt-10 flex flex-col items-center justify-center gap-6 px-5 md:px-10'>
            <div className='rounded-2xl flex items-center justify-center gap-3 bg-td-primary pr-6 w-full'>
                <input type="text" placeholder='Search Product' className='border px-4 py-4 rounded-2xl w-full' />
                <CiSearch className="rounded-2xl text-[30px] cursor-pointer text-white" />
            </div>
            <div className="w-full flex items-center justify-between">
                <span className="text-gray-400 font-light">Showing 1-10 of 100 Products</span>
                <span>Sort by : Most Popular</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default page