import { motion } from 'framer-motion';

import React from 'react';

const WavingHand = () => {
  return (
    <motion.span
      style={{
        display: 'inline-block',
        fontSize: 'inherit',
        originX: 0.7,
        originY: 0.7,
      }}
      animate={{
        rotate: [0, 20, -10, 20, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      👋🏽
    </motion.span>
  );
};

export default WavingHand;
