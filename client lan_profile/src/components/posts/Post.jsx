import React from 'react';
import PropTypes from 'prop-types';

function Post({ post }) {
  // Ensure post.content is an array
  const contentSections = Array.isArray(post.content) ? post.content : [];

  return (
    <div className="blog-content" key={post.id}>
      {contentSections.map((section, index) => (
        <div key={index}>
          {section.type === 'subheader' && <h4>{section.content}</h4>}
          {section.type === 'body' && <p>{section.content}</p>}
          {section.type === 'image' && <img src={section.content} alt={`Image ${index}`} />}
        </div>
      ))}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
