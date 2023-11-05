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


function LoginForm() {
  const { push } = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
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
    <div className='w-full md:h-full h-[90vh] flex justify-center items-center text-center relative'>
      <form onSubmit={onSubmit} action="" method='POST'>
        <div className="md:py-5 bgblur md:bg-transparent md:px-0 p-5 md:w-96 w-full">
          <h1 className='text-red-500 text-2xl font-semibold'>ENTER YOUR CREDENTIALS TO GAIN ACCESS</h1>

          <div className='py-3'>
            <div className='py-4 '>

              <input
                id="email"
                name="email"
                type="text"
                className="text-blue-300 text-center border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='py-4 '>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                className="text-blue-300 text-center border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
          </div>
          <button className="w-full my-3 p-2 bg-blue-700 text-white hover:bg-blue-600">AUTHENTICATE</button>

        </div>
      </form>
      {isLoginFailed ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 400 }}
          transition={{ duration: 0.2 }}
          className='absolute md:w-3/6 w-[95%] md:h-5/6 h-[70%] bgblur rounded-md'>
          <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
            <p className='text-5xl font-semibold blink-once text-red-600'>ACCESS DENIED</p>
            <button className='bg-blue-500 px-5 py-1'
              onClick={handleRetryLog}
            >RETRY</button>
          </div>
        </motion.div>
      ) : null}
      {isLoginSuceed ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 400 }}
          transition={{ duration: 0.2 }}
          className='absolute w-3/6 h-5/6 bgblur rounded-md '>
          <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
            <p className='text-5xl font-semibold text-green-500 '>ACCESS GRANTED</p>
            <p className='mt-4'>Whre do you want to proceed?</p>
            <div className='flex gap-5'>
              <a href="/">
                <button className='bg-blue-500 px-5 py-1'>DATA CONTROL</button>
              </a>
              <a href="/">
                <button className='bg-blue-500 px-5 py-1'>ACCESS CONTROL</button>
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}

    </div>
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