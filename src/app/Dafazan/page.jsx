'use client'
import Image from 'next/image'
import { Carousel } from 'react-responsive-3d-carousel'
import Card1 from '@/components/Card1'
import { useState, useEffect } from "react";

import MobileLayout from "@/components/Layouts/mobile"
import DesktopPortfolio from "@/components/Layouts/DesktopPortfolio"
import { isMobile } from 'react-device-detect';
import ButtonDefault from '@/components/Buttons/ButtonDefault';

function Page() {

  return (
    <>
      <div className='h-full w-full flex items-center justify-center'>

        <div className="uppercase bgblurblue md:scale-100 scale-90 border-2 border-blue-800 p-1 md:w-[450px] w-full flex flex-col">
          <div className=' w-full h-5 flex justify-between'>
            <div className='w-5 h-full  border-s-2 border-t-2 border-blue-500'></div>
            <div className='w-5 h-full  border-e-2 border-t-2 border-blue-500'></div>
          </div>
          <div className='px-5  '>


            <div className=' flex flex-col items-center justify-center '>
              <p className='text-2xl text-blue-400 font-medium'>Clearance Level 1 File</p>


              <p className='text-xl text-green-500 font-medium'>Dafazan&lsquo;s Credentials</p>

              <div>

                <ButtonDefault
                  text={'ACCESS FILE'}
                />
              </div>
            </div>
          </div>
          <div className=' w-full h-5 flex justify-between'>
            <div className='w-5 h-full  border-s-2 border-b-2 border-blue-500 '></div>
            <div className='w-5 h-full  border-e-2 border-b-2 border-blue-500 '></div>
          </div>

        </div>

      </div>
    </>
  )
}

function Dafazan() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <>
          {isMobile ? (
            <MobileLayout>
              <Page />
            </MobileLayout>
          ) : (
            <DesktopPortfolio>
              <Page />
            </DesktopPortfolio>
          )}
        </>
      )}
    </>
  )
}

export default Dafazan