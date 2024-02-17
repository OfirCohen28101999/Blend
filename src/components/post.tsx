import { ChangeEvent, useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import EditPost from './EditPost';
import { PostProps, CommentProps } from '../shared/types';
import { commentApi, useCreateCommentMutation } from '../services/api/commentApi';
import { userApi } from '../services/api/userApi';


export function Post(postInfo: PostProps) {

  // : UserProps
  const currentUser = userApi.endpoints.getMe.useQuery(null, { 
    skip: false
  }).data;

  const isCurrUserPost: boolean = postInfo.creatingUser._id == currentUser?._id;
  
  const postComments = commentApi.endpoints.getAllCommentsByPostId.useQuery(postInfo._id, {
    skip: false,
  }).data?.data?.comments;

  const [openModal, setOpenModal] = useState(false);

  const [openModalsecond, setOpenModalsecond] = useState(false);

  const [inputText, setInputText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputText(e.target.value);
  };

  const [createComment] =
  useCreateCommentMutation();
  
  function editPost(): void {
    //TODO: edit post and save to DB
    // handleEditToggle();
  }

  function deletePost() {
    //TODO: delete post from DB
    return null;
  };

  function commentPost(): void {
    createComment({description: inputText, postId: postInfo._id, title: " "});
  }
 
  return (
<div className="h-80 w-64">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <iframe src={`https://open.spotify.com/embed/track/${postInfo?.track?.spotifyId}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>  
                 <div className="p-2">
          <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{postInfo.title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{postInfo.description}</p>
          <>
            {isCurrUserPost && (
              <div className="flex space-x-4">
                {/* onClick={editPost} (in the edit line)*/} 
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenModalsecond(true)}>edit</button> 
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={deletePost}>delete</button>
              </div>
            )}
          </>
          <>
            {!isCurrUserPost && (
              <div>
                <div className="flex space-x-4 pb-2">
                  <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenModal(true)} >{postComments?.length} comments</button>
                </div>
                <div className="flex">
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-1 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Add comment" onChange={handleChange} value={inputText} required/>
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
      <EditPost _id= {postInfo._id} title = {postInfo.title} description = {postInfo.description} creatingUser = {postInfo.creatingUser} track={postInfo.track}/>
      </Modal>
    </>
      <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="p-1 ml-3">Post's comments</Modal.Header>
        <Modal.Body>
          {/* <div>
            {data?.data?.comments[0]?.description}
          </div> */}
<>
        {postComments?.map((currPostComment:CommentProps) => (
<div>
          <div className="space-x-4 flex items-center">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {currPostComment?.creatingUser?.name}:
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {currPostComment?.description}
            </p>
          </div>
          </div>
        ))}
        </>
        </Modal.Body>
      </Modal>
    </>  
    </div>
  );
}

export default Post;
