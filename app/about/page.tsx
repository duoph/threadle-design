import React from 'react';

const About = () => {
    return (
        <div className='flex flex-col gap-5 md:gap-10 px-5 md:px-10 py-8'>

            <div className=''>
                <h1 className='text-td-secondary text-[35px] font-bold text-center py-3'>Threadle Designs</h1>
                <p className='break-all'>At Threadle, we blend the artistry of bespoke tailoring with the convenience of ready-made fashion to cater to the diverse needs of modern women. Our boutique offers a seamless fusion of customization and curated collections, ensuring every customer finds their perfect ensemble, whether they seek a uniquely crafted garment or a ready-to-wear masterpiece.</p>
            </div>

            <div className='flex flex-col md:flex-row items-start justify-center gap-5 w-full'>
                <div className='w-full'>
                    <h1 className='text-td-secondary text-[20px] font-bold text-center'>Custom Creations</h1>
                    <p className='break-all'>Step into the world of personalized fashion with our custom creation service. At Threadle, we believe that every woman deserves clothing that speaks to her individuality. Our skilled artisans work closely with clients to bring their visions to life, crafting one-of-a-kind garments that fit like a dream and reflect personal style preferences. From intricate bridal gowns to sophisticated corporate attire, our bespoke designs are tailored to perfection, ensuring each piece is as unique as the woman who wears it.</p>
                </div>
                <div className='w-full'>
                    <h1 className='text-td-secondary text-[20px] font-bold text-center'>Ready-Made Elegance</h1>
                    <p className='break-all'>At Threadle, we prioritize the customer experience above all else. Our knowledgeable stylists are on hand to offer personalized guidance and styling advice, ensuring every visit is a memorable and enjoyable experience. Whether you&apos;re embarking on a custom design journey or browsing our ready-made offerings, we&apos;re dedicated to providing unparalleled service and attention to detail at every step of the way.</p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row items-start justify-center gap-5 w-full'>
                <div className='w-full'>
                    <h1 className='text-td-secondary text-[20px] font-bold text-center'>Quality Craftsmanship</h1>
                    <p className='break-all'>We take pride in the quality of our craftsmanship, sourcing only the finest fabrics and materials to create garments that stand the test of time. From intricate embroidery to precision tailoring, every stitch is executed with care and expertise, resulting in garments that exude luxury and sophistication. Whether you&apos;re investing in a bespoke masterpiece or selecting from our ready-made collection, you can trust that every Threadle creation is crafted to the highest standards of excellence.</p>
                </div>
                <div className='w-full'>
                    <h1 className='text-td-secondary text-[20px] font-bold text-center'>Experience the Difference</h1>
                    <p className='break-all'>Discover the perfect blend of customization and convenience at Threadle. Whether you&apos;re seeking a bespoke masterpiece or a ready-made gem, our boutique offers a world of possibilities for the modern woman who values quality, style, and individuality. Experience the difference of personalized fashion at Threadle – where every stitch tells a story, and every garment is a work of art.</p>
                </div>
            </div>

        </div>
    )
}

export default About;
