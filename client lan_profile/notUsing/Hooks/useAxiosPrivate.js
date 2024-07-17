import axiosPrivate from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from '../Hooks/useRefreshToken';
import {useAuth} from '../Hooks/useAuth';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();


  useEffect (() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      err => Promise.reject(err)
    );

    const reponseIntercept = axiosPrivate.interceptors.response.use(
      reponse => reponse,
      async (err) => {
        const prevRequest = err.config;
        if (err.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccesstoken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccesstoken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(reponseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    }
  },[auth, refresh])

  return axiosPrivate;
}

export default useAxiosPrivate;
