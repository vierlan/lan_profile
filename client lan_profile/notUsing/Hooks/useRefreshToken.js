import axios from '../api/axios'
import TokenValidator from '../components/TokenValidator'

const useRefreshToken = () => {
  const { setAuth } = TokenValidator();

  const refresh = async () => {
    const reponse = await axios.post('/refresh', {
      withCredentials: true
    });
    setAuth(prev => {
      console.log(JSON.stringify(prev));
      console.log(reponse.data.accessToken);
      return {
        ...prev,
        accessToken: reponse.data.accessToken
      }
    });
    return Response.data.accessToken;
  }

  return refresh;
};

export default useRefreshToken;
