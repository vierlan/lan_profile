import React from 'react'
import pic from '../../assets/images/13.jpg'
import PropTypes from 'prop-types'

function Post({posts}) {
  return (
    <>
       {posts.map((post) => (
         <div className="blog-content" key={post.id}>
           <div className='blog-image'>
             <img src={pic} alt={post.title} />
             {post.user && <p>Written by: {post.user.username}</p>}
             <p>written on: {post.created_at} </p>
           </div>
           <div className='blog-text'>
             <h2>{post.title}</h2>
             <h4>{post.content.subheader}</h4>
             <p>{post.content.body}</p> {/* Access the body field */}
           </div>
         </div>
       ))}
    </>
  );

}

Post.propTypes = {
  posts: PropTypes.array.isRequired
}



export default Post
