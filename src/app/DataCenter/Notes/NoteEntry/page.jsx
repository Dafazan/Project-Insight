'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  Firestore,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics, auth } from "../../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from 'react-device-detect'
import NoteMobile from '@/components/Layouts/NoteMobile'
import AppName from '@/components/Layouts/AppName'
import ButtonDefault from '@/components/Buttons/ButtonDefault'
import QuillText from '@/components/QuillText'

function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);


  const [data, setData] = useState([
    { title: "", content: "", status: "" },
  ]);

  const handleChange = (value) => {
    setContent(value);
  };


  const addData = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "notes"), {
      title: title,
      content: content,
      status: status,
      timestamp: serverTimestamp(),
      source: "web"
    });

    const handleUpload = () => {
      setData([
        ...data,
        { title: "", content: "", status: "" },
      ]);
    };

    alert("success");
  };

  return (

    <>
      <div className='flex flex-col gap-3'>
        <div className='w-full blurwindow p-3 flex justify-between items-center'>
          <div className=' text-xl'><p>Note Entry</p></div>
          <a href="/DataCenter/Notes">
            <div className='bg-red-500 py-1 px-2 text-xs'>
              <p>Abort</p>
            </div>
          </a>
        </div>
        <form onSubmit={addData} className=' flex flex-col gap-3'>
          <div className='flex md:flex-row flex-col gap-3'>
            <div className='blurwindow p-3 md:w-3/6'>
              <p>Note Title</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
              />
            </div>
            <div className='blurwindow p-3 md:w-3/6'>
              <p>Note Visibility</p>
              <div className='flex gap-2 w-full mt-2'>
                <label className='w-full'>
                  <div className=' flex justify-center items-center relative p-1'>
                    <input
                      type="radio"
                      value="private"
                      className='appearance-none border-2 border-blue-500 absolute w-full h-full checked:bg-red-500 checked:border-red-500 p-2 cursor-pointer transition duration-300'
                      checked={status === "private"}
                      onChange={() => setStatus("private")}
                    />
                    <p className='z-20'>PRIVATE</p>
                  </div>
                </label>
                <label className='w-full'>
                  <div className=' flex justify-center items-center relative p-1'>
                    <input
                      type="radio"
                      value="public"
                      className='appearance-none border-2 border-blue-500 absolute w-full h-full checked:bg-green-600 checked:border-green-500 p-2 cursor-pointer transition duration-300'
                      checked={status === "public"}
                      onChange={() => setStatus("public")}
                    />
                    <p className='z-20'>PUBLIC</p>
                  </div>
                </label>
              </div>

            </div>
          </div>
          <div className='blurwindow p-3 '>
            <p>Note Content</p>
            <QuillText
              value={content}
              onChange={handleChange}
              className='h-52'
            />
            {/* <input
              onChange={(e) => setContent(e.target.value)}
              type="text"
              required
              placeholder="Insert Content"
              color=" bg-transparent"
              className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
            /> */}
          </div>
          <ButtonDefault
            text={'SUBMIT'}
          />

        </form>

        {/* <div className='blurwindow p-3'>
          <form onSubmit={addData}>
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Title

                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Title"
                  color=" bg-transparent"
                  className=" text-black rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Content

                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setContent(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Content"
                  color=" bg-transparent"
                  className=" text-black rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <div className=" flex py-1 px-20">
              <div className=" w-2/12 text-end p-3 py-5">
                <p>
                  Status

                </p>
              </div>
              <div className=" w-10/12 p-3">
                <input
                  onChange={(e) => setStatus(e.target.value)}
                  type="text"
                  required
                  placeholder="Insert Status"
                  color=" bg-transparent"
                  className=" text-black rounded-lg w-full border-slate-300 "
                />
              </div>
            </div>
            <button type='Submit'>Send Data</button>
          </form>
        </div> */}
      </div>
    </>
  )
}
function NoteEntry() {
  const [isLoginSuceed, setIsLoginSuceed] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoginSuceed(true);
      } else {
        push("/LoginPage");
      }
    });
  }, []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <>
      {isLoginSuceed ? (
        <>
          {isClient && (
            <>
              {isMobile ? (
                <MobileInnerLayout isNotes={true} isEntry={true} backlink={'/DataCenter/Notes'}>
                  <Page />
                </MobileInnerLayout>
              ) : (
                <Page />
              )}
            </>
          )}
        </>
      ) : null}
    </>
  )
}

export default NoteEntry