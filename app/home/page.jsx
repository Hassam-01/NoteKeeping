'use client';

import { useRouter } from "next/navigation";
import Card from "../_components/NoteCard"
// import { changeTheme } from "../_store/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../_store/hooks";

// import sql from "@/server/db/db";
import { useEffect } from "react";
import { setUserId } from "../_store/features/user/userIdSlice";
// import e from "express";


function Home() {
  const theme = useAppSelector(state => state.theme.darkMode);

  const dispatch = useAppDispatch();
  const route = useRouter();

  const id = 3;

  const setUser = (userID) => {
    dispatch(setUserId(userID));
  }

  useEffect(() => {
    fetch("http://localhost:3000/home/")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    setUser(id);

  },[])


  return (
    <div className="dark h-screen ">
      Home Page
    </div>
  )
}

export default Home
