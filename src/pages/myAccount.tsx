import { useState } from "react";
import EditPost from "../components/EditPost";
import ProfileInfo from "../components/profileInfo";
import Post from "../components/post";
import { postsComments, postsInfo } from "../shared/mock";

const generateNewId = 19;

function MyAccount() {
  const [createNew, setcreateNew] = useState(false);

  const handleToggle = () => {
    setcreateNew((current) => !current);
  };
  
  return (
    <div className="ml-40 pl-5 pt-16">
              {/* <div>
            <iframe className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" src="https://www.youtube.com/embed/KaLxCiilHns" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div> */}
      <ProfileInfo/>
      <p className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"/>
 <div>
 {!createNew && (
 <button type="button" className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleToggle}>Create NewPost</button>
 )}
{createNew && (
  <div>
   <button type="button" className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleToggle}>cancle</button>
      <EditPost id= {generateNewId}  title = {""} description = {""} creatingUser = {true}/>
      </div>
      )}
 </div>
 <p className="mt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"></p>
 <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">My posts:</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {postsInfo.filter(postInfo => postInfo.creatingUser).map(currUserPost => (
        //postComments ={postsComments} send to Post
        <Post id = {currUserPost.id} title = {currUserPost.title} description = {currUserPost.description} creatingUser = {currUserPost.creatingUser}/>
      ))}
    </div>
  </div>
  );
}

export default MyAccount;
