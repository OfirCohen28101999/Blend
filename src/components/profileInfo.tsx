import { ChangeEvent, useState } from "react";
import { useDeleteUserImageMutation, useUpdateMeMutation } from "../services/api/userApi";
import { getCurrentUserQuery } from "../shared/general";

function ProfileInfo() {

  const [disableEdit, setDisableEdit] = useState(true);
  const currentUser = getCurrentUserQuery();

  const handleToggle = () => {
    setInputBio(currentUser?.bio ? currentUser?.bio : " ");
    setDisableEdit((current) => !current);
  };

  const [inputBio, setInputBio] = useState(currentUser?.bio ? currentUser?.bio : " ");

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBio(e.target.value);
  };

  const [updateUserInfo ] = useUpdateMeMutation();
  const [image, setImage] = useState<File>();

  const updateUser = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if(image){
      formData.append('image', image);
    }
    formData.append('bio', inputBio);
    updateUserInfo(formData);
    handleToggle();
  }
  
  const onInputChange = (e: any) => {
    setImage(e.target.files[0]);
  }

const [deleteImage] = useDeleteUserImageMutation();

function deleteUserImageFunction() {
  deleteImage(currentUser?.image ? currentUser?.image : " ");
  handleToggle();
};

  return (
    <div>
      <>
        {disableEdit && (
          <div className="flex items-center">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleToggle}>Edit profile</button>
            <form className='w-90 flex flex-row px-5 space-x-6'>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input type="email" id="email" className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={currentUser?.email} disabled/>
            </div> 
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" disabled/>
            </div> 
            <div className="mb-6">
                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                <input type="bio" id="bio" className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={currentUser?.bio} disabled/>
            </div> 
            </form>
          </div>
        )}
      </>
      <>
        {!disableEdit && (
          <div className="flex items-center">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleToggle}>Back</button>
            <form onSubmit={updateUser} className='w-90 flex flex-row px-5 space-x-6 items-center'>
              <input type="file" accept="image/" onChange={onInputChange}/>
              <div className="mb-6">
                  <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                  <input type="bio" id="bio" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleBioChange} value={inputBio} required/>
              </div> 
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/7 h-10 sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={deleteUserImageFunction}>delete my profile photo</button>
          </div>
        )}
      </>
    </div>
  );
}

export default ProfileInfo;

