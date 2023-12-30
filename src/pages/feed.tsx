import Post from "../components/post";

const postsInfo = [{postTitle: "fj", postText: "d", postOwner:true},
                 {postTitle: "Noteworthy technology acquisitions 2021", postText: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", postOwner:true},
                 {postTitle: "Noteworthy technology", postText: "Here are the order.", postOwner:false},
                 {postTitle: "Noteworthy dljcnk", postText: "Here dlfjslk.", postOwner:false},
                ];

export function Feed() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-40 pl-5 pt-16">
      {postsInfo.filter(postInfo => !postInfo.postOwner).map(notCurrUserPosts => (
        <Post postTitle = {notCurrUserPosts.postTitle} postText = {notCurrUserPosts.postText} postOwner = {notCurrUserPosts.postOwner}/>
      ))}
    </div>
  );
}

export default Feed;