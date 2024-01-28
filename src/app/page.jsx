'use client'
import Image from 'next/image'
import { Carousel } from 'react-responsive-3d-carousel'
import Card1 from '@/components/Card1'
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db, storage, firebaseAnalytics, auth } from "../firebase";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import MobileLayout from "@/components/Layouts/mobile"
import DesktopLayout from "@/components/Layouts/desktop"
import { isMobile } from 'react-device-detect';
import SideButton from '@/components/Buttons/SideButton'
import React from 'react'
import { useSearchParams } from "next/navigation";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  deleteDoc,
  query,
  where,
  Firestore,
  getDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";

function Page() {

  const [dataNotes, setDataNotes] = useState([]);
  const [dataNotesResult, setDataNotesResult] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e);
    const searchTerm = e.toLowerCase();
    const results = dataNotes.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
    setDataNotesResult(results);
  };

  useEffect(() => {
    getDataNotes();
  }, []);
  async function getDataNotes() {
    try {
      const ordersRef = collection(db, "notes");
      const q = query(ordersRef, orderBy("title"));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setDataNotes(data);

    } catch (error) {
      console.log(error);
    }
  }
  return (

    <>
      {/* <button

        onClick={() => {
          signOut(auth);
          localStorage.removeItem("auth");
          localStorage.clear();

        }}
      >Logout</button>
      <br />
      <br />
      <p>Note Traffic</p>
      {dataNotes.map((data, i) => (

        <>
          <p>Title: {data.title}</p>
          <p>Status: {data.status}</p>
          <p>Visitor: {data.click}</p>
          <p>========================</p>
        </>
      ))} */}


    </>
  )
}

export default function Home() {
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
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    // Change the value of the number variable here
    setNumber(number + 1);
  };

  return (
    <>
      {isLoginSuceed ? (
        <>
          {isClient && (
            <>
              {isMobile ? (
                <MobileLayout>
                  <p>Use Desktop To View This Page</p>
                </MobileLayout>
              ) : (
                <DesktopLayout
                  button1={<SideButton click={handleClick} text={'ADD'} />}
                  button2={<SideButton text={'ACT1'} />}
                  button3={<SideButton text={'ACT2'} />}
                  button4={<SideButton text={'ACT3'} />}
                  button5={<SideButton text={'ACT4'} />}
                  button6={<SideButton text={'ACT5'} />}
                  button7={<SideButton text={'ACT6'} />}
                  button8={<SideButton text={'ACT7'} />}
                  button9={<SideButton text={'ACT8'} />}
                  button10={<SideButton text={'ACT9'} />}
                  button11={<SideButton text={'ACT10'} />}
                  button12={<SideButton text={'ACT11'} />}>
                  <Page />
                  <p>Num{number}</p>
                </DesktopLayout>
              )}
            </>
          )}

        </>
      ) : null}
    </>
  )
}
