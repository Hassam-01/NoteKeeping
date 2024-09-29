import { use, useEffect, useState } from "react";
import axios from "axios"; 

const useUserIdApi = () => {

  const [userID, setUserID] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:3009/')
  //     .then(res => {
  //       if (res.status === 200) {
  //         setUserID(res.data.id);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, []);
  console.log("api called")
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:3009/')
    .then(res=>{
      if(res.status === 200){
        console.log("api BAR HERE: ")
        console.log(res);
        console.log(res.data.id, " id");
        console.log(res.data.message, " message");
        setUserID(res.data.id);
      }
    })
    .catch(err=>console.log(err))
  },[])
  console.log(userID, "this is user id");
  return userID; 
}

export default useUserIdApi;
