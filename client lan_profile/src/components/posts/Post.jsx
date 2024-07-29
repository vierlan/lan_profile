import React from 'react';
import PropTypes from 'prop-types';

function Post({ post }) {
  // Ensure post.content is an array
  const contentSections = Array.isArray(post.content) ? post.content : [];
  console.log(contentSections);

  return (
    <div className="blog-content">
      <img src={post.photo_url} alt={post.title} />
      <div >
        <h2>{post.title}</h2>
        {contentSections.map((section, index) => (
          <div className="blog-text" key={index}>
            {section.type === 'subheader' && <h4>{section.content}</h4>}
            {section.type === 'body' && <p>{section.content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
