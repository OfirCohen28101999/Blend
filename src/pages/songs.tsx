import { ChangeEvent, useState } from "react";
import { trackApi } from "../services/api/trackApi";
import { PostProps, TrackProps } from "../shared/types";
import { Modal } from 'flowbite-react';
import { useCreatePostMutation, useUpdatePostMutation } from "../services/api/postApi";

export function Songs() {

  const allTracks = trackApi.endpoints.getAllTracks.useQuery(undefined, { 
      skip: false
  }).data?.data?.tracks;

  const [currTrackId, setTrackId] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [createPost] = useCreatePostMutation();

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputDescription(e.target.value);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInputTitle(e.target.value);
  };
    
  const [updatePost] = useUpdatePostMutation();

  const createPostFunction = async (e: any) => {
    e.preventDefault();
    const result = await createPost({title: inputTitle, description: inputDescription, trackId: currTrackId, image:" "});
  
    if ('data' in result) {
      const newPost: PostProps = result.data.data.post;
      const formData = new FormData();
      if(image){
        formData.append('image', image);
      }
      formData.append('title', inputTitle);
      formData.append('description', inputDescription);
      updatePost({postId: newPost._id, form: formData});
      setOpenModal(false);
    } else {
      console.error('Error creating post:', result.error);
    }
  } 

const [image, setImage] = useState<File>();

const onInputChange = (e: any) => {
  setImage(e.target.files[0]);
}

  const handelCloseModal = () => {
    setInputTitle("");
    setInputDescription("");
    setOpenModal(false)
    };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-40 pl-5 pt-16">
      {allTracks?.map((track: TrackProps) => (
        <div className="bg-white border border-gray-200 rounded-lg shadow">
          <iframe src={`https://open.spotify.com/embed/track/${track?.spotifyId}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
          <h5 className="flex justify-center text-1xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer" onClick={() => {setTrackId( track.spotifyId); setOpenModal(true);}}>+</h5>
        </div>
      ))}
      <>
      <Modal show={openModal} onClose={handelCloseModal}>
        <Modal.Header className="p-1 ml-3">Create Post</Modal.Header>
        <form onSubmit={createPostFunction} className='w-90 flex flex-col items-center'>
          <Modal.Body>
            <input type="file" accept="image/" onChange={onInputChange}/>
            <textarea id="title" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your title here..."  onChange={handleChangeTitle} value={inputTitle} required></textarea>
            <textarea id="text" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your text here..."  onChange={handleChangeText} value={inputDescription} required></textarea>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>       
          </Modal.Footer>
        </form>
      </Modal>
      </>
    </div>
  );
}

export default Songs;