import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'


function ProjectCard({ image }) {
const [showOverlay, setShowOverlay] = useState(false);

  return (

      <motion.div
        className="project-card"
        onHoverStart={() => setShowOverlay(true)}
        onHoverEnd={() => setShowOverlay(false)}
      >
        <AnimatePresence>
          {showOverlay && (
            <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
            <div className="absolute">
              <h2>
                Project:
              </h2 >
            </div>
            </motion.div>
          )}
        </AnimatePresence>
        <img src={image} alt="project" />
      </motion.div>

  )
}

export default ProjectCard
