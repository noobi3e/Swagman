import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XLg } from 'react-bootstrap-icons'

export const Modal: React.FC<{
  img: string
  alt: string
  hideModal: () => void
}> = ({ img, alt, hideModal }) => {
  return ReactDOM.createPortal(
    <motion.div className='modal'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='backdrop'
        onClick={hideModal}
      />
      <motion.button
        initial={{ scale: 0, rotate: 360 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 360 }}
        onClick={hideModal}>
        <XLg />
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className='content'>
        <img src={img} alt={alt} />
      </motion.div>
    </motion.div>,
    document.getElementById('overlays') as HTMLElement
  )
}
