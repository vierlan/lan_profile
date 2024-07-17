import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/axiosPrivate';
import useRefreshToken from '../Hooks/useRefreshToken';

const Users = () => {
  const [users, setUsers] = useState([])
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal
        });

        if (isMounted) {
          console.log(response.data);
          setUsers(response.data);
        }
      } catch (error) {
        console.error('There was an error fetching users!', error);
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }

  }, []);



  return (
    <article>
      <h2>Users list</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) =>
              <li key={i}>{user?.username}</li>
            )}
          </ul>
        )
        : <p>No users</p>
      }
      <button onClick={() => refresh()}
      >Refresh
      </button>
      <br/>

    </article>
  );
}
;
export default Users
