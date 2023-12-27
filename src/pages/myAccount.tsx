import CreateNewPost from "../components/createNewPost";
import ProfileInfo from "../components/profileInfo";

function MyAccount() {

  return (
    <div className="ml-40 mt-40">
      my details, edit details:
      <ProfileInfo/>
      add post button
      <CreateNewPost/>
      my posts:
      for loop with my posts + edit 
  </div>
  );
}

export default MyAccount;
