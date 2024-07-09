import React from 'react';

const AlertMessageSlider = () => {
    return (
        <div className='py-1 w-full bg-red-500'>
            <div className='animate-marquee whitespace-nowrap'>
                <h1 className='inline-block text-sm text-white'>
                    This website is still under development. The products listed are demo products. Follow us on Instagram <a target='_blank' href="https://www.instagram.com/threadle_designs/" className="text-blue-600 underline">@threadle_designs</a>
                </h1>
            </div>
        </div>
    );
}

export default AlertMessageSlider;
