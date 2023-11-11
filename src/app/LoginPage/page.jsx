'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import MobileLayout from "@/components/Layouts/mobile"
import DesktopLayout from "@/components/Layouts/desktop"
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import ButtonLinkDefault from '@/components/Buttons/ButtonLinkDefault';


function LoginForm() {
  const { push } = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("dafazanlbs@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isLoginSuceed, setIsLoginSuceed] = useState(false);

  const onSubmit = async (e) => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoginSuceed(true);
      })
      .catch((error) => {
        setIsLoginFailed(true);
      });
    e.preventDefault();

  };
  const handleRetryLog = () => {
    setIsLoginFailed(false);
  };
  useEffect(() => {
    const textElement = document.querySelector('.blink-once');

    if (textElement) {
      textElement.classList.add('blink-once');

      setTimeout(() => {
        textElement.classList.remove('blink-once');
      }, 700); // 1000ms (1 second) matches the animation duration
    }
  }, []);

  return (
    <>

      <div className='w-full md:h-full h-[90vh] flex justify-center items-center text-center'>
        <form className='w-full relative' onSubmit={onSubmit} action="" method='POST'>
          <div className=" bgblurblue md:scale-100 scale-90 border-2 border-blue-800 p-1 md:w-[400px] w-full flex flex-col">
            <div className=' w-full h-5 flex justify-between'>
              <div className='w-5 h-full  border-s-2 border-t-2 border-blue-500'></div>
              <div className='w-5 h-full  border-e-2 border-t-2 border-blue-500'></div>
            </div>
            <div className='px-5  '>
              <h1 className='text-red-500 text-2xl font-semibold'>ENTER THE PASSCODE TO GAIN ACCESS</h1>

              <div className='py-3'>
                {/* <div className='py-4 '>

                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="text-blue-300 text-center border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}

                <div className='py-4 '>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter The Passcode"
                    className="text-blue-300 text-center border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                    onChange={(e) => setPassword(e.target.value)}

                  />
                </div>
              </div>
              <ButtonDefault
                text={'AUTHENTICATE'}
              />
              {/* <button className="w-full my-1 p-2 bg-blue-700 text-white hover:bg-blue-600">AUTHENTICATE</button> */}

            </div>
            <div className=' w-full h-5 flex justify-between'>
              <div className='w-5 h-full  border-s-2 border-b-2 border-blue-500 '></div>
              <div className='w-5 h-full  border-e-2 border-b-2 border-blue-500 '></div>
            </div>

          </div>

        </form>
        {isLoginFailed ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 400 }}
            transition={{ duration: 0.2 }}
            className='absolute md:w-3/6 w-[95%] md:h-5/6 h-[70%] bgblurred flex flex-col'>
            <div className='w-full h-2 border-t-2 border-red-600 flex justify-between'>
              <div className='bg-red-600 w-4 h-2'></div>
              <div className='bg-red-600 w-4 h-2'></div>
            </div>
            <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
              <p className='md:text-5xl text-4xl font-semibold blink-once text-red-600'>ACCESS DENIED</p>
              <div className='flex flex-col gap-1'>

                <ButtonDefault
                  className='md:scale-100 scale-90'
                  text={'RETRY'}
                  action={handleRetryLog}
                />
              </div>

            </div>
            <div className='w-full h-2 border-t-2 border-red-600 flex justify-between rotate-180'>
              <div className='bg-red-600 w-4 h-2'></div>
              <div className='bg-red-600 w-4 h-2'></div>
            </div>
          </motion.div>
        ) : null}
        {isLoginSuceed ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 400 }}
            transition={{ duration: 0.2 }}
            className='absolute md:w-3/6 w-[95%] md:h-5/6 h-[70%] bgblurgreen flex flex-col'>
            <div className='w-full h-2 border-t-2 border-green-600 flex justify-between'>
              <div className='bg-green-600 w-4 h-2'></div>
              <div className='bg-green-600 w-4 h-2'></div>
            </div>
            <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
              <p className='md:text-5xl text-4xl font-semibold text-green-500 '>ACCESS GRANTED</p>
              <p className='mt-4'>Where do you want to proceed?</p>
              <div className='flex flex-col gap-1'>
                <ButtonLinkDefault
                  text={'DATA CONTROL'}
                  action={'/DataCenter'}
                />
                <ButtonLinkDefault
                  text={'ACCESS CONTROL'}
                  action={'/AccessCenter'}
                />
              </div>
            </div>
            <div className='w-full h-2 border-t-2 border-green-600 flex justify-between rotate-180'>
              <div className='bg-green-600 w-4 h-2'></div>
              <div className='bg-green-600 w-4 h-2'></div>
            </div>
          </motion.div>
        ) : null}

      </div>
    </>
  )

}
function LoginPage() {
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
              <LoginForm />
            </MobileLayout>
          ) : (
            <DesktopLayout>
              <LoginForm />
            </DesktopLayout>
          )}
        </>
      )}
    </>
  )
}

export default LoginPage