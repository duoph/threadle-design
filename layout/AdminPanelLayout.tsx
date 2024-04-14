import React, { ReactNode, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const AdminPanelLayout = ({ children }: { children: ReactNode }) => {

    const [isMenu, setIsMenu] = useState<boolean>(true);

    return (
        <div className=' w-full h-full flex gap-10'>

            {/* Side 1 (Menu) */}
            <div className="relative flex ic bg-red-700 md:w-[250px] lg:w-[300px] h-full shadow-2xl">
                <div className='absolute top-2 right-2 cursor-pointer' onClick={() => setIsMenu(!isMenu)}>
                    <IoMdClose className='text-white cursor-pointer' size={24} />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center py-8">
                    <span>Orders</span>
                    <span>Orders</span>
                    <span>Orders</span>
                    <span>Orders</span>
                </div>
            </div >

            {/* Side 2 (Main Content) */}
            <div className='flex flex-col items-center justify-center w-full'>
                {children}
            </div>

        </div >
    );
};

export default AdminPanelLayout;
