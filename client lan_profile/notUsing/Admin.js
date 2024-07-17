import Link from 'react-router-dom'
import Users from './Users'

const Admin = () => {
  return (
    <section>
      <h1>Admin</h1>
      <br/>
      <p>You have an admin role</p>
      <div className='flexGrow'>
        <Link to='/'>Home</Link>

      </div>
    </section>

  );
};

export default Admin
