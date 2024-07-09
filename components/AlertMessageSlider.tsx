import React from 'react';
import Marquee from 'react-fast-marquee';

const AlertMessageSlider = () => {
    return (
        <div className='py-1 w-full bg-td-primary'>
            <Marquee loop={0} pauseOnHover={true}>
                <h1 className='text-slate-700 font-extralight'>
                    This website is still under development. The products listed are demo products . Follow us on Instagram  <a target='_blank' href="https://www.instagram.com/threadle_designs/" className="underline"> @threadle_designs</a>
                </h1>
            </Marquee>
        </div>
    );
}

export default AlertMessageSlider;
