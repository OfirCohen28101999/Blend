import { ChangeEvent, useState } from 'react';
import { Modal } from 'flowbite-react';
import { PostProps, CommentProps } from '../shared/types';
import { commentApi, useCreateCommentMutation } from '../services/api/commentApi';
import { useDeletePostImageMutation, useDeletePostMutation, useUpdatePostMutation } from '../services/api/postApi';
import blendIcon from '../assets/blendIcon.svg';
import { getCurrentUserQuery } from '../shared/general';

export function Post(postInfo: PostProps) {

  const currentUser = getCurrentUserQuery();
  const isCurrUserPost: boolean = postInfo.creatingUser._id == currentUser?._id;
  const postComments = commentApi.endpoints.getAllCommentsByPostId.useQuery(postInfo._id, {
    skip: false,
  }).data?.data?.comments;
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [inputTitle, setInputTitle] = useState(postInfo.title);
  const [inputDescription, setInputDescription] = useState(postInfo.description);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputComment(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputDescription(e.target.value);
  };
  
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [deletePostImage] = useDeletePostImageMutation();
  const [createComment] = useCreateCommentMutation();
  const [image, setImage] = useState<File>();

  const editPost = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if(image){
      formData.append('image', image);
    }
    formData.append('title', inputTitle);
    formData.append('description', inputDescription);
    updatePost({postId: postInfo._id, form: formData});
    setOpenEditModal(false);
  }

  const onInputChange = (e: any) => {
    setImage(e.target.files[0]);
  }

  function deletePostFunction() {
    deletePost(postInfo._id);
    deletePostImage(postInfo.image ? postInfo.image : " ");
  };

  function commentPost(): void {
    createComment({description: inputComment, postId: postInfo._id, title: " "});
  }

  const imgSrc= postInfo?.image ? `${process.env.REACT_APP_SERVER_ENDPOINT}/static/posts/${postInfo?.image}` : blendIcon;

  return (
  <div className="h-80 w-64">
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <iframe src={`https://open.spotify.com/embed/track/${postInfo?.track?.spotifyId}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>  
      <div className="p-2">
        <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{postInfo.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{postInfo.description}</p>
        <>
          {isCurrUserPost && (
            <div>
              <div className="flex space-x-4 pb-2">
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenCommentsModal(true)} >{postComments?.length} comments</button>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> By: {postInfo.creatingUser.name}</p>
                <img className="w-8 h-8 rounded-full" src={imgSrc} alt="post photo"/>
              </div>
              <div className="flex space-x-4">
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenEditModal(true)}>edit</button> 
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={deletePostFunction}>delete</button>
              </div>
            </div>
          )}
        </>
        <>
          {!isCurrUserPost && (
            <div>
              <div className="flex space-x-4 pb-2">
                <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenCommentsModal(true)} >{postComments?.length} comments</button>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> By: {postInfo.creatingUser.name}</p>
                <img className="w-8 h-8 rounded-full" src={imgSrc} alt="post photo"/>
              </div>
              <div className="flex">
                  <div className="relative w-full">
                    <input type="search" id="search-dropdown" className="block p-1 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Add comment" onChange={handleCommentChange} value={inputComment} required/>
                    <button type="submit" className="absolute top-0 end-0 p-1 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={commentPost}>comment</button>
                  </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>    
    <>
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}> 
        <Modal.Header className="p-1 ml-3">Update Post</Modal.Header>
        <form onSubmit={editPost} className='w-90 flex flex-row px-5 space-x-6 items-center'>
        <Modal.Body>
        <input type="file" accept="image/" onChange={onInputChange}/>
          <textarea id="title" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your title here..."  onChange={handleTitleChange} value={inputTitle}>{postInfo.title}</textarea>
          <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your text here..."  onChange={handleDescriptionChange} value={inputDescription}>{postInfo.description}</textarea>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex space-x-4">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpenEditModal(false)}>Cancle</button>
          </div>
        </Modal.Footer>
        </form>
      </Modal>
    </>
    <>
    <Modal show={openCommentsModal} onClose={() => setOpenCommentsModal(false)}>
      <Modal.Header className="p-1 ml-3">Post's comments</Modal.Header>
      <Modal.Body>
        <>
          {postComments?.map((currPostComment:CommentProps) => (
            <div className="space-x-4 flex items-center">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {currPostComment?.creatingUser?.name}:
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {currPostComment?.description}
              </p>
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
