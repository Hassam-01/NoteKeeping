'use client';

import Card from "../_components/NoteCard"
import { changeTheme } from "../_store/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../_store/hooks";


function Home() {
  const theme = useAppSelector(state => state.theme.darkMode);
  const dispatch = useAppDispatch();
  console.log(theme)
  return (
    <div className="dark h-screen ">
      <div className="dark:bg-[#0c0c0c] h-full  bg-orange-100 dark:text-white text-black p-10">
          <div className="lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid gap-y-5">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          </div>
      </div>
      <button className="text-white" onClick={()=> dispatch(changeTheme())}> click me</button>
    </div>
  )
}

export default Home
