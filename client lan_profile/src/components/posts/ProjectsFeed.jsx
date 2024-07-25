import React from 'react'
import ProjectCard from './ProjectCard'
import useMeasure from "react-use-measure";
import { useMotionValue, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

function ProjectsFeed({ images = []}) {

  const FAST_SCROLL =25;
  const SLOW_SCROLL = 75;

  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [scrollSpeed, setScrollSpeed] = useState(FAST_SCROLL);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
  let controls;
  let finalposition = -width / 2 - 15;

  if (mustFinish) {
    controls = animate(xTranslation, [xTranslation.get(), finalposition], {
      ease: "linear",
      duration: scrollSpeed * (1 - xTranslation.get() / finalposition),
      onComplete: () => {
        xTranslation.set(0);
        setMustFinish(false);
        setRerender(!rerender);
      },
    });
  }

  else {
      controls = animate(xTranslation, [0, finalposition], {
      ease: "linear",
      duration: scrollSpeed,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
  });
}
  return controls.stop;

}, [xTranslation, width, scrollSpeed]);

  return (
    <motion.div className="carousel-inner"
      ref={ref}
      style={{x: xTranslation}}
      onHoverStart={() => {
        setMustFinish(true);
        setScrollSpeed(SLOW_SCROLL
        )}}
      onHoverEnd={() => {
        setMustFinish(true);
        setScrollSpeed(FAST_SCROLL

        )}}
      >
      {[...images, ...images].map((image, idx) => {
        return <ProjectCard image={image} key={idx} />
     })}
    </motion.div>
  )
}


export default ProjectsFeed
