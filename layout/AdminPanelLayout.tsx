import React, { ReactNode, useState } from 'react';

const AdminPanelLayout = ({ children }: { children: ReactNode }) => {

    const [isMenu, setIsMenu] = useState<boolean>(true);

    return (
        <div className='bg-blue-600 w-full h-full'>
            <button className="relative bg-red-700 rounded-2xl px-3 py-2" onClick={() => setIsMenu(!isMenu)}>Open Menu</button>

            <div className='absolute bg-red-700  left-0 top-0 z-10 h-[100vh]'>
                <h1 className='text-red-600 text-[30px]'>This is Layout</h1>
            </div>
            {children}
        </div>
    );
};

export default AdminPanelLayout;
