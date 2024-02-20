import { ChangeEvent, useState } from "react";
import { trackApi } from "../services/api/trackApi";
import { TrackProps } from "../shared/types";
import { Modal } from 'flowbite-react';
import { useCreatePostMutation } from "../services/api/postApi";


export function Songs() {

    const allTracks = trackApi.endpoints.getAllTracks.useQuery(undefined, { 
        skip: false
    }).data?.data?.tracks;

    const [currTrackId, setTrackId] = useState("");
    const [inputTitle, setInputTitle] = useState("");
    const [inputText, setInputText] = useState("");

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    };

    const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputTitle(e.target.value);
    };

    const [openModal, setOpenModal] = useState(false);

    const [createPost] =
    useCreatePostMutation();

    function createPostFunction(): void {
    createPost({title: inputTitle, description: inputText, trackId: currTrackId, image:" "});
    }
      
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-40 pl-5 pt-16">
      {allTracks?.map((track: TrackProps) => (
        <div className="bg-white border border-gray-200 rounded-lg shadow">
 <iframe src={`https://open.spotify.com/embed/track/${track?.spotifyId}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
          <h5 className="flex justify-center text-1xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer" onClick={() => {setTrackId( track.spotifyId); setOpenModal(true);}}>+</h5>
          </div>
    ))}
      <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="p-1 ml-3">Create Post</Modal.Header>
        <Modal.Body>
            <textarea id="title" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your title here..."  onChange={handleChangeTitle} value={inputTitle} required></textarea>
            <textarea id="text" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your text here..."  onChange={handleChangeText} value={inputText} required></textarea>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={() => { createPostFunction(); setOpenModal(false);}} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>       
        </Modal.Footer>
      </Modal>
    </>
    </div>
  );
}

export default Songs;