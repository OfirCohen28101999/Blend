import { useState } from 'react';
import blendIcon from '../blendIcon.svg';

export function Post(postInfo: any) {

  let commentsNum = 4;
  let likesNum = 8;

  const [likePostButton, setLikePost] = useState(false);

  const handleToggle = () => {
    setLikePost((current) => !current);
  };

  function editPost(): void {
    //TODO: edit post and save to DB
  }

  function deletePost() {
    //TODO: delete post from DB
    return null;
  };

  function commentPost(): void {
    //TODO: comment post and save to DB
  }

  function likePost(): void {
    //TODO: like post and save to DB
    handleToggle();
   }
   function unlikePost(): void {
    //TODO: like post and save to DB
    handleToggle();

   }

  function viewComments(): void {
    //TODO: view the comments
   }

  return (
    <div className="h-80 w-64">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg h-20" src={blendIcon} alt="" />
        <div className="p-2">
          <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{postInfo.postTitle}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{postInfo.postText}</p>
          <>
            {postInfo.creatingUser && (
              <div className="flex space-x-4">
                {/* onClick={openEditPost} (in the edit line)*/} 
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={editPost}>edit</button>
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={deletePost}>delete</button>
              </div>
            )}
          </>
          <>
            {!postInfo.creatingUser && (
              <div>
                <div className="flex space-x-4 pb-2">
                {!likePostButton && (
                  <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={likePost}>like</button>
                )}
                {likePostButton && (
                  <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={unlikePost}>unlike</button>
                  )}
                  <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={viewComments} >{commentsNum} comments</button>
                  <h5 className="font-normal text-gray-700 dark:text-gray-400">{likesNum} likes</h5>
                </div>
                <div className="flex">
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-1 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Add comment" required/>
                        <button type="submit" className="absolute top-0 end-0 p-1 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={commentPost}>comment</button>
                    </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>      
    </div>
  );
}

export default Post;
