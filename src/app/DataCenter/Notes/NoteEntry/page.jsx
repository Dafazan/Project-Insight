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
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../../firebase";
import { useEffect, useState } from "react";


function NoteEntry() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);


  const [data, setData] = useState([
    { title: "", content: "", status: "" },
  ]);


  const addData = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "notes"), {
      title: title,
      content: content,
      status: status,
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
      <div>NoteEntry</div>
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
    </>
  )
}

export default NoteEntry