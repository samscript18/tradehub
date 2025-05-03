import React from 'react';
import { motion } from 'framer-motion';

const PaymentLoader = () => {
  return (
    <div className="relative w-52 h-1 bg-gray-300 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-[-6px] w-4 h-4 bg-green-500 rounded-full"
        animate={{ x: ['0%', '100%', '0%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};
export default PaymentLoader;
