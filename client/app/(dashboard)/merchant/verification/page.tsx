'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VerificationMethod from '@/components/ui/merchant/verification-method'
import IdentityVerification from '@/components/ui/merchant/identity-verification'
import PhotoVerification from '@/components/ui/merchant/photo-verifcation'
import BankDetails from '@/components/ui/merchant/bank-details'
import ReviewInformation from '@/components/ui/merchant/review-information'
import VerificationComplete from '@/components/ui/merchant/verification-complete'
import ProgressIndicator from '@/components/ui/merchant/progress-indicator'
import { Shield, HelpCircle, Globe } from 'lucide-react'

export interface VerificationData {
  verificationMethod: 'email' | 'phone' | null
  email?: string
  phone?: string
  documentType: 'drivers_license' | 'nin' | 'international_passport' | null
  documentFile: File | null
  profilePhoto: File | null
  fullName: string
  bankName: string
  accountNumber: string
}

const steps = [
  { id: 1, title: 'Verification Method', key: 'verification' },
  { id: 2, title: 'Identity', key: 'identity' },
  { id: 3, title: 'Photo', key: 'photo' },
  { id: 4, title: 'Bank Details', key: 'bank' },
  { id: 5, title: 'Review', key: 'review' },
]

export default function MerchantVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [verificationData, setVerificationData] = useState<VerificationData>({
    verificationMethod: null,
    documentType: null,
    documentFile: null,
    profilePhoto: null,
    fullName: '',
    bankName: '',
    accountNumber: '',
  })

  const updateVerificationData = (data: Partial<VerificationData>) => {
    setVerificationData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return <VerificationComplete />
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-[#0A0C1B] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="mb-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-2xl font-semibold mb-2">
            Verifying Your Information
          </h2>
          <p className="text-gray-400">
            This process usually takes 1-2 business days. We'll notify you via
            email once complete.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-blue-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Check your email for updates
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0C1B] text-white">
      {/* Progress Indicator */}
      <ProgressIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <VerificationMethod
                data={verificationData}
                onUpdate={updateVerificationData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <IdentityVerification
                data={verificationData}
                onUpdate={updateVerificationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <PhotoVerification
                data={verificationData}
                onUpdate={updateVerificationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <BankDetails
                data={verificationData}
                onUpdate={updateVerificationData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 5 && (
              <ReviewInformation
                data={verificationData}
                onEdit={goToStep}
                onSubmit={handleSubmit}
                onPrev={prevStep}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
