'use client';
import { useEffect } from "react"

function page() {

    // const id = useAppSelector(state => state.userId.userID);
    const id = 3;
    useEffect(() => {
    fetch(`http://localhost:3009/home/${id}`)
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
    },[])

  return (
    <div>
      USER PAGE
    </div>
  )
}

export default page
