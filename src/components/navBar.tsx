import { useState } from 'react';
import blendIcon from '../assets/blendIcon.svg';
import { useLogoutUserMutation } from '../services/api/authApi';
import { getCurrentUserQuery } from '../shared/general';

function NavBar() {
  const [OpenDropDown, setOpenDropDown] = useState(false);

  const handleToggle = () => {
    setOpenDropDown((current) => !current);
  }
  
  const currentUser = getCurrentUserQuery();
  const imgSrc= currentUser?.image ? `${process.env.REACT_APP_SERVER_ENDPOINT}/static/users/${currentUser?.image}` : blendIcon;

  const [logoutUser] = useLogoutUserMutation();  

  const onLogoutHandler = async () => {
    logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('googleToken');
  };
    
  return (
    <div>
      <nav className="flex items-center justify-between px-3 py-1 lg:px-5 lg:pl-3 fixed top-0 z-50 w-full h-10 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-start rtl:justify-end">
          <div className="flex ms-2 md:me-24">
            <img src={blendIcon} className="h-8 me-3 rounded-full" />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Blend</span>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={handleToggle}>
              <img className="w-8 h-8 rounded-full" src={imgSrc} alt="user photo"/>
            </button>
          </div>
          { OpenDropDown && (
            <div className="z-50 mt-40 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  {currentUser?.name}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  {currentUser?.email}
                </p>
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  My Bio: {currentUser?.bio}
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a href="/sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={onLogoutHandler}>Sign out</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-15 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                  <a href="/my-page" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                  </a>
              </li>
              <li>
                  <a href="/feed" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Feed</span>
                  </a>
              </li>
              <li>
                  <a href="/songs" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Songs</span>
                  </a>
              </li>
            </ul>
        </div>
      </aside>
    </div>
  );
}

export default NavBar;