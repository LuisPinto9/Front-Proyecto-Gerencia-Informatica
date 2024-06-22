// import Topbar from "../../Components/topbar/Topbar";
// import Sidebar from "../../Components/sidebar/Sidebar";
// import Feed from "../../Components/feed/Feed";
// import Rightbar from "../../Components/rightbar/Rightbar";



// export default function Home() {
//   return (
//     <>
//       <Topbar />
//       <div className="homeContainer">
//         <Sidebar />
//         <Feed />
//         <Rightbar />
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../../Components/topbar/Topbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Feed from "../../Components/feed/Feed";
import Rightbar from "../../Components/rightbar/Rightbar";
import { SaveLocalStorage } from "../../helpers/SaveLocalStorage";

export default function Home() {
  const location = useLocation();
  const [tokenSaved, setTokenSaved] = useState(false);
  const [username, setUsername] = useState("");
  // console.log(username2)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const username2 = searchParams.get("username");
   
    if (token) {
      SaveLocalStorage("token", token);
      setTokenSaved(true);
    }
    if (username2) {
      setUsername(username2);
    }
  
  }, [location]);

  return (
    <>
      <Topbar username={username}/>
      <div className="homeContainer">
        <Sidebar />
        
        <Feed username={username} />
        <Rightbar />
      </div>
      {tokenSaved ? <div>Token saved successfully</div> : <div>Saving token...</div>}
      {username ? <div> ${username}</div> : <div>Saving token...</div>}
    </>
  );
}