import Image from 'next/image'
import Blueframe from '@/components/blueframe'
import { useEffect, useState } from 'react';

export default function Home() {
  const FullscreenDetector = () => {
    const [isFullscreen, setIsFullscreen] = useState(0);

    useEffect(() => {
      const handleFullscreenChange = () => {
        if (
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        ) {
          setIsFullscreen(1);
        } else {
          setIsFullscreen(0);
        }
      };

      // Add event listeners to handle fullscreen changes
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('msfullscreenchange', handleFullscreenChange);

      // Cleanup by removing event listeners when the component unmounts
      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      };
    }, []);
    return (
      <>

        <div className='relative h-screen w-screen  '>

          <div className="h-full">

            {/* Layer 1 */}
            <div className="w-full h-full p-24 absolute">
              <div className=' h-full flex mx-24'>
                <div className='bg-black h-full w-full border-y-2 border-blue-500'></div>
                <div className='bg-black h-full w-full flex flex-col justify-between'>
                  <div className='flex justify-between'>
                    <div className='w-10 h-10 bg-black rotate-45 -translate-x-5 -translate-y-5 border-s-2  border-blue-500'></div>
                    <div className='w-10 h-10 bg-black -rotate-45 translate-x-5 -translate-y-5 border-e-2  border-blue-500'>

                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='w-10 h-10 bg-black -rotate-45 -translate-x-5 translate-y-5 border-s-2 border-blue-500'></div>
                    <div className='w-10 h-10 bg-black rotate-45 translate-x-5 translate-y-5 border-e-2 border-blue-500'></div>
                  </div>
                </div>
                <div className='bg-black h-full w-full border-y-2 border-blue-500'></div>
              </div>

            </div >

            <div className="w-full h-full p-24 absolute">
              <div className='h-full w-full flex flex-col'>
                <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                <div className='bg-black w-full h-[100%] border-x-2 border-blue-500'></div>
                <div className=' w-full max-h-[40px] min-h-[40px] '></div>
              </div>
            </div>

            <div className="w-full h-full p-24 absolute">
              <div className=' h-full flex mx-24'>
                <div className='h-full w-full'></div>
                <div className='bg-black h-full w-full flex flex-col justify-between'>
                  <div className='bg-black w-full h-10 -translate-y-7 border-t-2 border-blue-500'></div>
                  <div className='bg-black w-full h-10 translate-y-7 border-b-2 border-blue-500'></div>
                </div>
                <div className=' h-full w-full'></div>
              </div>

            </div >

            <div className='w-full h-full absolute justify-between flex'>
              <div className=' w-[117px] flex flex-col justify-center'>
                <div className='bg-black w-full h-24 flex flex-col justify-between items-end border-y-2 border-blue-500'>
                  <div className='bg-black rotate-45 w-10 h-10 -translate-y-[21px] border-s-2 border-blue-500'></div>
                  <div className='bg-black -rotate-45 w-10 h-10 translate-y-[21px] border-s-2 border-blue-500'></div>
                </div>
              </div>
              <div className=' w-[117px] flex flex-col justify-center'>
                <div className='bg-black w-full h-24 flex flex-col justify-between items-start border-y-2 border-blue-500'>
                  <div className='bg-black rotate-45 w-10 h-10 -translate-y-[21px] border-t-2 border-blue-500'></div>
                  <div className='bg-black -rotate-45 w-10 h-10 translate-y-[21px] border-b-2 border-blue-500'></div>
                </div>
              </div>


            </div>

            <div className="w-full h-full p-24 absolute">
              <div className='w-full h-full flex flex-col justify-between '>
                <div className='flex'>
                  <div className='flex '>
                    <div className='h-14 w-14 rotate-45 translate-x-3 translate-y-3 bg-black border-s-2 border-blue-500'></div>
                    <div className='h-14 w-14 bg-black -translate-x-4 border-t-2 border-blue-500'></div>
                  </div>
                  <div className='h-full w-full'></div>
                  <div className='flex'>
                    <div className='h-14 w-14 bg-black translate-x-4 border-t-2 border-blue-500'></div>
                    <div className='h-14 w-14  bg-black -rotate-45 -translate-x-3 translate-y-3 border-e-2 border-blue-500'></div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='flex '>
                    <div className='h-14 w-14 rotate-45 translate-x-3 -translate-y-3 bg-black border-b-2 border-blue-500'></div>
                    <div className='h-14 w-14 bg-black -translate-x-4 border-b-2 border-blue-500'></div>
                  </div>
                  <div className='h-full w-full'></div>
                  <div className='flex'>
                    <div className='h-14 w-14 bg-black translate-x-4 border-b-2 border-blue-500'></div>
                    <div className='h-14 w-14  bg-black -rotate-45 -translate-x-3 -translate-y-3 border-b-2 border-blue-500'></div>
                  </div>
                </div>
              </div>
            </div >
            {/* End Of Layer 1 */}

            {/* Layer 2 */}
            <div className="w-full h-full p-24 absolute">
              <div className=' h-full flex mx-24'>
                <div className='base1 h-full w-full border-y-2 border-blue-500'></div>
                <div className='base1 h-full w-full flex flex-col justify-between'>
                  <div className='flex justify-between'>
                    <div className='w-10 h-10 base1 rotate-45 -translate-x-5 -translate-y-5 border-s-2 border-blue-500 '></div>
                    <div className='w-10 h-10 base1 -rotate-45 translate-x-5 -translate-y-5 border-e-2 border-blue-500 '>

                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='w-10 h-10 base1 -rotate-45 -translate-x-5 translate-y-5 border-s-2 border-blue-500'></div>
                    <div className='w-10 h-10 base1 rotate-45 translate-x-5 translate-y-5 border-e-2 border-blue-500'></div>
                  </div>
                </div>
                <div className='base1 h-full w-full border-y-2 border-blue-500'></div>
              </div>

            </div >

            <div className="w-full h-full p-24 absolute">
              <div className='h-full w-full flex flex-col'>
                <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                <div className='base1 w-full h-[100%] border-x-2 border-blue-500'></div>
                <div className=' w-full max-h-[40px] min-h-[40px] '></div>
              </div>
            </div>

            <div className="w-full h-full p-24 absolute">
              <div className=' h-full flex mx-24'>
                <div className='h-full w-full'></div>
                <div className='base1 h-full w-full flex flex-col justify-between'>
                  <div className='base1 w-full h-10 -translate-y-7 border-t-2 border-blue-500'></div>
                  <div className='base1 w-full h-10 translate-y-7 border-b-2 border-blue-500'></div>
                </div>
                <div className=' h-full w-full'></div>
              </div>

            </div >

            <div className='w-full h-full absolute justify-between flex'>
              <div className=' w-[117px] flex flex-col justify-center'>
                <div className='base1 w-full h-24 flex flex-col justify-between items-end border-y-2 border-blue-500'>
                  <div className='base1 rotate-45 w-10 h-10 -translate-y-[21px] border-s-2 border-blue-500'></div>
                  <div className='base1 -rotate-45 w-10 h-10 translate-y-[21px] border-s-2 border-blue-500'></div>
                </div>
              </div>
              <div className=' w-[117px] flex flex-col justify-center'>
                <div className='base1 w-full h-24 flex flex-col justify-between items-start border-y-2 border-blue-500'>
                  <div className='base1 rotate-45 w-10 h-10 -translate-y-[21px] border-t-2 border-blue-500'></div>
                  <div className='base1 -rotate-45 w-10 h-10 translate-y-[21px] border-b-2 border-blue-500'></div>
                </div>
              </div>


            </div>

            <div className="w-full h-full p-24 absolute">
              <div className='w-full h-full flex flex-col justify-between '>
                <div className='flex'>
                  <div className='flex '>
                    <div className='h-14 w-14 rotate-45 translate-x-3 translate-y-3 base1 border-s-2 border-blue-500'></div>
                    <div className='h-14 w-14 base1 -translate-x-4 border-t-2 border-blue-500'></div>
                  </div>
                  <div className='h-full w-full'></div>
                  <div className='flex'>
                    <div className='h-14 w-14 base1 translate-x-4 border-t-2 border-blue-500'></div>
                    <div className='h-14 w-14  base1 -rotate-45 -translate-x-3 translate-y-3 border-e-2 border-blue-500'></div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='flex '>
                    <div className='h-14 w-14 rotate-45 translate-x-3 -translate-y-3 base1 border-b-2 border-blue-500 '></div>
                    <div className='h-14 w-14 base1 -translate-x-4 border-b-2 border-blue-500 '></div>
                  </div>
                  <div className='h-full w-full'></div>
                  <div className='flex'>
                    <div className='h-14 w-14 base1 translate-x-4 border-b-2 border-blue-500 '></div>
                    <div className='h-14 w-14  base1 -rotate-45 -translate-x-3 -translate-y-3 border-b-2 border-blue-500 '></div>
                  </div>
                </div>
              </div>
            </div >

            <div className='w-full h-full absolute flex items-center'>
              <div className='w-full h-[420px] flex justify-between'>
                <div className='w-[96px] h-full flex flex-col justify-between'>
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
                <div className='w-[96px] h-full flex flex-col justify-between'>
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

            <div className=' w-full h-16 flex items-center justify-center text-xs relative'>
              <div className='w-full h-[2px] bg-blue-500'></div>
              <div className=' h-full w-full text-blue-400 flex justify-between items-center gap-2'>
                <div className='w-[2px] h-[15px] bg-blue-500'></div>
                <a className='hover:text-yellow-300' href="">Homepage</a>
                <div className='w-[1px] h-[15px] bg-blue-500'></div>
                <a className='hover:text-yellow-300' href="">About</a>
                <div className='w-[1px] h-[15px] bg-blue-500'></div>
                <a className='hover:text-yellow-300' href="">Portofolios</a>
                <div className='w-[1px] h-[15px] bg-blue-500'></div>
                <a className='hover:text-yellow-300' href="">Repositories</a>
                <div className='w-[1px] h-[15px] bg-blue-500'></div>
                <a className='hover:text-yellow-300' href="">Social</a>
                <div className='w-[1px] h-[15px] bg-blue-500'></div>
                <a className='hover:text-yellow-300' href="">Contact</a>
                <div className='w-[2px] h-[15px] bg-blue-500'></div>
              </div>
              <div className='w-full h-[2px] bg-blue-500'></div>

            </div>

          </div>

        </div>

      </>
    )
  }
