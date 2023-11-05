import type { Metadata } from 'next'
import { Saira } from 'next/font/google'
import './globals.css'
import Basecolored from '@/components/Basecolored'
import Topnav from '@/components/Topnav'
import Fullscreenrec from '@/components/Fullscreenrec'
import { isMobile } from 'react-device-detect'


const inter = Saira({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Insight Project',
  description: 'By Dafazan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {isMobile && <>

          <div className='p-5 flex justify-center items-center'>
            {children}

          </div>
        </>}
        {!isMobile &&

          <>

            <div className='relative h-screen w-screen'>
              <div className="h-full">
                <Basecolored />

                <div className='w-full h-full flex py-[98px] px-36 absolute '>
                  <div className="w-full h-full overflow-y-scroll">
                    {/* Content */}

                    {children}


                  </div>
                </div>


                <div className='w-full h-full absolute flex items-center pointer-events-none'>
                  <div className='w-full h-[420px] flex justify-between'>
                    <div className='w-[96px] h-full flex flex-col justify-between pointer-events-auto'>
                      <div className='h-32 ps-1 flex flex-col justify-between text-xs'>
                        <div className='flex'>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                          <div className=' w-full border-t border-yellow-300'></div>
                        </div>
                        <div className='flex'>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                          <div className=' w-full border-t border-yellow-300'></div>
                        </div>
                        <div className='flex'>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                          <div className=' w-full border-t border-yellow-300'></div>
                        </div>
                      </div>
                      <div className='h-32 ps-1 flex flex-col justify-between text-xs'>
                        <div className='flex'>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                          <div className=' w-full border-t border-yellow-300'></div>
                        </div>
                        <div className='flex'>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                          <div className=' w-full border-t border-yellow-300'></div>
                        </div>
                        <div className='flex'>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                          <div className=' w-full border-t border-yellow-300'></div>
                        </div>
                      </div>
                    </div>
                    <div className='w-full '></div>

                    <div className='w-[96px] h-full flex flex-col justify-between pointer-events-auto'>
                      <div className='h-36 pe-1 flex flex-col justify-between text-xs'>
                        <div className='flex'>
                          <div className=' w-full border-t border-yellow-300'></div>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                        </div>
                        <div className='flex'>
                          <div className=' w-full border-t border-yellow-300'></div>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                        </div>
                        <div className='flex'>
                          <div className=' w-full border-t border-yellow-300'></div>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                        </div>
                      </div>
                      <div className='h-32 pe-1 flex flex-col justify-between text-xs'>
                        <div className='flex'>
                          <div className=' w-full border-t border-yellow-300'></div>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                        </div>
                        <div className='flex'>
                          <div className=' w-full border-t border-yellow-300'></div>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                        </div>
                        <div className='flex'>
                          <div className=' w-full border-t border-yellow-300'></div>
                          <button className=' w-56 py-1 border border-t-0 border-yellow-300 hover:bg-[#002c41]'>Button</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Topnav />



                {/* <Fullscreenrec /> */}


              </div>

            </div>

          </>
        }


      </body>
    </html>
  )
}
