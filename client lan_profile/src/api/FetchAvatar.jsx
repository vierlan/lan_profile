//client lan_profile/src/api/FetchAvatar.jsx
import AuthContext from './AuthProvider';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import Proptypes from 'prop-types';
import lan from '../assets/images/lan.png';

const FetchAvatar = ({avatarUrl, setAvatarUrl = () => {}, auth }) => {

  // Use the image with public ID, 'front_face'.
  const myImage = localStorage.getItem('avatar_url:');
  console.log(myImage)
  setAvatarUrl(myImage);
  console.log(avatarUrl);

  return (<div className="avatar">
    {auth && avatarUrl ? (
        <img src={myImage} alt="avatar" className="avatar" />
      ) : (
        <img src={lan} alt="avatar" className="avatar" />
      )}
    </div>
  )
}

FetchAvatar.propTypes = {
  avatarUrl: Proptypes.string,
  setAvatarUrl: Proptypes.func,
  auth: Proptypes.object
}

export default FetchAvatar
