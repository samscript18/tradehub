'use client'

import { motion } from 'framer-motion'
import { useModal } from '@/lib/contexts/modal-context'

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { hideModal } = useModal()

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={hideModal}
      />

      {/* Modal */}
      <motion.div
        className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {children}
      </motion.div>
    </>
  )
}