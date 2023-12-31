import Post from "../components/post";

const postsInfo = [{postTitle: "fj", postText: "d", creatingUser:true},
{postTitle: "Noteworthy technology acquisitions 2021", postText: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", creatingUser:true},
{postTitle: "Noteworthy technology acquisitions 2021", postText: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", creatingUser:true},
{postTitle: "Noteworthy technology acquisitions 2021", postText: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", creatingUser:true},
{postTitle: "Noteworthy technology", postText: "Here are the order.", creatingUser:false},
{postTitle: "Noteworthy technology", postText: "Here are the order.", creatingUser:false},
{postTitle: "Noteworthy technology", postText: "Here are the order.", creatingUser:false},
{postTitle: "Noteworthy technology", postText: "Here are the order.", creatingUser:false},
                 {postTitle: "Noteworthy dljcnk", postText: "Here dlfjslk.", creatingUser:false},
                ];

export function Feed() {
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-40 pl-5 pt-16">
      {postsInfo.filter(postInfo => !postInfo.creatingUser).map(notCurrUserPosts => (
        <Post postTitle = {notCurrUserPosts.postTitle} postText = {notCurrUserPosts.postText} creatingUser = {notCurrUserPosts.creatingUser}/>
      ))}
    </div>
  );
}

export default Feed;