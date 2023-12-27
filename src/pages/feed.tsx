import Post from "../components/post";

const postsInfo=["https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
            "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
        ]


// {
//   posts.map(post =>
//       <div>
//           <img className="h-auto max-w-full rounded-lg" src={post} alt=""/>
//       </div>)
// }

function Feed() {
  return (
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-10">
  {
  postsInfo.map(postInfo =>
     <Post/>
      )
  }
</div>
  );
}

export default Feed;