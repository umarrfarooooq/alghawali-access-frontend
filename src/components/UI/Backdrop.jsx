import React from 'react';

const Backdrop = ({ showBackdrop, zIndex }) => {
  const backdropStyles = {
    position: 'fixed',
    inset:"0",
    overscrollBehavior: "contain",
    width:"100%",
    height:"100%",
    background: 'rgba(38, 47, 50, 0.50)',
    backdropFilter: 'blur(4px)',
    zIndex: zIndex || 9,
    display: showBackdrop ? 'block' : 'none',
  };

  return <div style={backdropStyles}></div>;
};

export default Backdrop;
