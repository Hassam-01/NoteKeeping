'use client'
import { ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'next/navigation';

function page() {
    const {meetingID} = useParams();
    const [userID, setUserID] = useState(null);
    console.log(meetingID, "from room")
    useEffect(() => {
        const fetchUserID = async () => {
            try {
                // await new Promise(resolve => setTimeout(resolve, 200)); // 2-second delay
                const res = await axios.get("http://localhost:3009/");
                if (res.status === 200) {
                    setUserID(res.data.id);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserID();
    }, []);
    console.log(userID, "user id here")
    
    const Mymeeting = async (element) => {
        const appID = 550177510;
        const serverSecret = "733f62ca76f5bb152f18c3ca16608108";

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, meetingID, userID.toString(), "hassam")

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference
            },
        
        })
    }

  return (
    <div className="dark h-screen">
      <div className="dark:bg-[#0c0c0c] h-full bg-orange-100 dark:text-white text-black p-10 flex flex-col relative justify-center">
        <div ref={Mymeeting} className='shadow-none'/>
    </div>
    </div>
  )
}

export default page