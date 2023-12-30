import { useState } from "react";
import EditPost from "../components/EditPost";
import ProfileInfo from "../components/profileInfo";
import Post from "../components/post";

const postsInfo = [{postTitle: "fj", postText: "d", postOwner:true},
                 {postTitle: "Noteworthy technology acquisitions 2021", postText: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", postOwner:true},
                 {postTitle: "Noteworthy technology", postText: "Here are the order.", postOwner:false},
                 {postTitle: "Noteworthy dljcnk", postText: "Here dlfjslk.", postOwner:false},
                ];

function MyAccount() {
  const [createNew, setcreateNew] = useState(false);

  const handleToggle = () => {
    setcreateNew((current) => !current);
  };

  return (
    <div className="ml-40 pl-5 pt-16">
      <ProfileInfo/>
      <p className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"/>
 <div>
 <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleToggle}>Create NewPost</button>
 <>
{createNew && (
      <EditPost/>
      )}
</>
 </div>
 <p className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"></p>
 <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">My posts:</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {postsInfo.filter(postInfo => postInfo.postOwner).map(notCurrUserPosts => (
        <Post postTitle = {notCurrUserPosts.postTitle} postText = {notCurrUserPosts.postText} postOwner = {notCurrUserPosts.postOwner}/>
      ))}
    </div>
    {/* <EditPost postTitle = {notCurrUserPosts.postTitle} postText = {notCurrUserPosts.postText} postOwner = {notCurrUserPosts.postOwner}/> */}

  </div>
  );
}

export default MyAccount;
