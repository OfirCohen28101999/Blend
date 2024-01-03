import { useEffect, useState } from 'react';
import blendIcon from '../blendIcon.svg';
import { Modal } from 'flowbite-react';
import EditPost from './EditPost';
import { PostProps, CommentProps } from '../shared/types';
import { postsComments } from '../shared/mock';


export function Post(postInfo: PostProps, postComments: CommentProps[]) {

  let commentsNum = 4;
let currPostComments: CommentProps[] = [];
let fj = postComments;
useEffect(() => {
  // This code will be executed after the component has been mounted
  console.log('Component is mounted!');
  currPostComments = getCommentsByPostId(postInfo.id, currPostComments);
  console.log(currPostComments);
  // You can perform any initialization logic or make API calls here
}, []); // The empty dependency array ensures that this effect runs only once (equivalent to componentDidMount)
 
  const [likePostButton, setLikePost] = useState(false);

  const handleLikeToggle = () => {
    setLikePost((current) => !current);
  };

  const [openModal, setOpenModal] = useState(false);

  const [openModalsecond, setOpenModalsecond] = useState(false);

  function getUserNameById(): string {
    //TODO: edit post and save to DB
return "ofir";
  }

  function getCommentsByPostId(postId: number, currPostComments: CommentProps[]): CommentProps[] {
    //TODO search in DB al the comments with the curr postId
  let d = postId;
  let index = 0;
  //  currPostComments: CommentProps[] = [];
   postsComments.filter((postComment) => postComment.postId == postId).map((postComment: CommentProps) => (
    currPostComments[index] = postComment,
    index++
   ));
    return currPostComments;
  }

  function editPost(): void {
    //TODO: edit post and save to DB
    // handleEditToggle();
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
    handleLikeToggle();
   }
   function unlikePost(): void {
    //TODO: like post and save to DB
    handleLikeToggle();

   }

  function viewComments(): void {
    //TODO: view the comments
    // handleviewCommentsToggle();
   }

 
  return (
<div className="h-80 w-64">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg h-20" src={blendIcon} alt="" />
        <div className="p-2">
          <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{postInfo.id}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{postInfo.postText}</p>
          <>
            {postInfo.creatingUser && (
              <div className="flex space-x-4">
                {/* onClick={editPost} (in the edit line)*/} 
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenModalsecond(true)}>edit</button> 
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
                  <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenModal(true)} >{commentsNum} comments</button>
                  <h5 className="font-normal text-gray-700 dark:text-gray-400">{postInfo.postLikes} likes</h5>
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
      <>
      <Modal show={openModalsecond} onClose={() => setOpenModalsecond(false)}>
      <EditPost id = {22} postTitle = {"sdjn"} postText = {"sdb"} creatingUser = {true} postLikes={4}/>
      </Modal>
    </>
      <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="p-1 ml-3">Post's comments</Modal.Header>
        <Modal.Body>
<>
        {currPostComments.map((currPostComment:CommentProps) => (
<div>
          <div className="space-x-4 flex items-center">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              userNum1
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {currPostComment.commentText}
            </p>
          </div>
          </div>
        ))}
        </>
        </Modal.Body>

      </Modal>
    </>  
    {/* <ViewComments  openModal={openModal === 0}
    onShow={() => setOpenModal(1)}/> */}
    </div>
  );
}

export default Post;
