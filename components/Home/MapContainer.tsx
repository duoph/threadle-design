"use client"

import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// const libraries: string[] = ['places'];

const mapContainerStyle = {
    height: '50vh',
};
const center = {
    lat: 11.0433600,
    lng: 76.071780,
};

const MapContainer = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBU1onFYu4AsvQHRO5Ugacrjo0ObuF7kVo',
    });



    if (loadError) {
        return (
            <div className=' lg:px-10 px-5 mt-5 lg:mt-10 mb-10 flex flex-col gap-2 items-center justify-center'>
                <h1 className='lg:text-[40px] text-[25px] font-bold text-td-secondary'>Locate Our Store</h1>

                <div>
                    Error loading maps
                </div>
            </div>
        )
    }


    if (!isLoaded) {
        return (
            <div className=' lg:px-10 px-5 mt-5 lg:mt-10 mb-10 flex flex-col gap-2 items-center justify-center'>
                <h1 className='lg:text-[40px] text-[25px] font-bold text-td-secondary'>Locate Our Store</h1>

                <div>
                    Loading
                </div>
            </div>
        )
    }

    return (
        <div className=' lg:px-10 px-5 mt-5 lg:mt-10 mb-10 flex flex-col gap-2 items-center justify-center'>
            <h1 className='lg:text-[40px] text-[25px] font-bold text-td-secondary'>Locate Our Store</h1>
            <div className='w-full h-full'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={20}
                    center={center}
                >
                    <Marker position={center} />
                </GoogleMap>
            </div>
        </div>
    );
};

export default MapContainer;