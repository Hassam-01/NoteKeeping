'use client';

import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
const [userID, setUserID] = useState(null);

axios.defaults.withCredentials = true;
useEffect(()=>{
  axios.get('http://localhost:3009/')
  .then(res=>{
    if(res.status === 200){
      setUserID(res.data.id);
    }
  })
  .catch(err=>console.log(err))
},[])


  console.log("user id: ", userID);
  return (
    <div className="dark h-screen dark:bg-[#0c0c0c] bg-orange-100">
      Home Page
      <p>User ID: {userID}</p>
    </div>
  );
}

export default Home;
