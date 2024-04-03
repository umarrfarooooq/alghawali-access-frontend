import React from 'react';

const LightBackdrop = ({ showBackdrop, zIndex }) => {
  const backdropStyles = {
    position: 'fixed',
    inset:"0",
    overscrollBehavior: "contain",
    width:"100%",
    height:"100%",
    background: 'rgba(38, 47, 50, 0.01)',
    zIndex: zIndex || 1,
    display: showBackdrop ? 'block' : 'none',
  };

  return <div style={backdropStyles}></div>;
};

export default LightBackdrop;
