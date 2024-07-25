import React from 'react'
import ProjectsFeed from './ProjectsFeed'
import a from '../../assets/images/1.jpg'
import b from '../../assets/images/2.jpg'
import c from '../../assets/images/3.jpg'
import d from '../../assets/images/4.jpg'
import e from '../../assets/images/5.jpg'
import '../../assets/stylesheets/projects.scss'

function Projects() {
  const images = [
    a,
    b,
    c,
    d,
    e
  ];

  return (
    <div className="infinity-carousel">
      <ProjectsFeed images={images} />
    </div>
  );
}

export default Projects
