"use client"

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


const OTPPage = () => {

  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { phone } = useParams()

  const sendOTP = async () => {
    try {
      const res = await axios.put("/api/sms/otp", {
        phone: phone
      })

    } catch (error) {

    }
  }

  const handleVerification = async () => {
    try {
      const res = await axios.get("/api/sms/otp")

    } catch (error) {

    }
  }

  return (
    <div className='bg-td-secondary py-10 flex items-center justify-center px-5 min-h-[70vh]'>
      <div className='flex bg-white flex-col gap-5 items-center justify-center w-full md:w-[400px] md:px-10 py-10 px-5 rounded-2xl'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-bold text-[30px] text-td-secondary'>Enter OTP</h1>
          <span className='font-bold text-[12px] text-td-secondary'>a six digit otp has beed sent to your phone number</span>
        </div>
        <div className='flex flex-col gap-3 w-full'>

          <div className='flex items-center justify-center gap-2'>
            <input
              type="text"
              pattern="[0-9]*"
              placeholder='OTP'
              className='border px-5 py-2 rounded-2xl bg-slate-200 w-full'
              value={otp}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) { 
                  setOtp(value);
                }
              }}
            />

          </div>

          <button className='bg-td-secondary rounded-2xl h-12 px-3 py-3 text-white font-semibold'>
            <span className="text-[15px] w-full">Verify</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;