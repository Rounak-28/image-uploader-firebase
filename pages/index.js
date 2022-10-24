import Head from "next/head";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { useEffect, useState } from "react";

export default function Home() {
  const [allUrl, setAllUrl] = useState([]);
  const [files, setFiles] = useState([]);

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "notes-app-firebase-d51f7.firebaseapp.com",
    projectId: "notes-app-firebase-d51f7",
    storageBucket: "notes-app-firebase-d51f7.appspot.com",
    messagingSenderId: "1037775831044",
    appId: "1:1037775831044:web:7f14e8c7f3c7c4d3997551",
    storageBucket: "gs://notes-app-firebase-d51f7.appspot.com",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app);
  let fileRef;
  const uploadFile = async () => {
    const file = await document.getElementById("input")?.files[0];
    if (!file) return;
    fileRef = ref(storage, `files/${file.name}`);
    await uploadBytes(fileRef, file).then((snapShot) => {
      console.log("uploaded the file!");
    });
    await getDownloadURL(fileRef)
      .then((url) => setAllUrl((prev) => [...prev, url]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const listRef = ref(storage, "files");
    listAll(listRef)
      .then((res) => {
        setFiles(res?.items);
      })
      .catch((err) => console.log(err));
  }, [allUrl]);

  // console.log(files);
  // console.log(allUrl)

  return (
    <div className="">
      <input type="file" id="input" />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={uploadFile}>
        upload
      </button>
      {allUrl?.map((item) => {
        return <img src={item} alt="" />;
      })}
      {files?.map((item) => console.log(item))}
    </div>
  );
}
