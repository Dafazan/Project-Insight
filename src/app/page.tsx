'use client'
import Image from 'next/image'
import { Carousel } from 'react-responsive-3d-carousel'
import Card1 from '@/components/Card1'
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";


export default function Home() {
  const [isLoginSuceed, setIsLoginSuceed] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setIsLoginSuceed(true);

        // ...
      } else {
        push("/LoginPage");
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      {isLoginSuceed ? (
        <>
          <p>Welcome my friend, Still nothing huh</p>
          <button

            onClick={() => {
              signOut(auth);
              localStorage.removeItem("auth");
              localStorage.clear();
              push("/LoginPage");
            }}
          >Logout</button>
        </>
      ) : null}
    </>
  )
}
