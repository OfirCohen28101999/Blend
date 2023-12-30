import blendIcon from '../blendIcon.svg';

export function Post(postInfo: any) {

  return (
    <div className="h-80 w-64">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg max-h-30" src={blendIcon} alt="" />
        <div className="p-2">
          <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{postInfo.postTitle}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{postInfo.postText}</p>
          <>
            {postInfo.postOwner && (
              <div className="flex space-x-4">
                {/* onClick={openEditPost} (in the edit line)*/} 
                <h5 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">edit</h5>
                <h5 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">delete</h5>
              </div>
            )}
          </>
          <>
            {!postInfo.postOwner && (
              <div className="flex space-x-4">
                <h5 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">comment</h5>
                <h5 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">like</h5>
              </div>
            )}
          </>
        </div>
      </div>      
    </div>
  );
}

export default Post;
