'use client'

import { useState } from 'react'
import Button from '@/components/common/button/index'
import BackButton from '@/components/common/button/back-button'
import type { VerificationData } from '@/app/(dashboard)/merchant/verification/page'
import { Checkbox } from '@/components/common/inputs/checkbox'

interface ReviewInformationProps {
  data: VerificationData
  onEdit: (step: number) => void
  onSubmit: () => void
  onPrev: () => void
}

export default function ReviewInformation({
  data,
  onEdit,
  onSubmit,
  onPrev,
}: ReviewInformationProps) {
  const [agreed, setAgreed] = useState(false)

  const getVerificationMethodText = () => {
    if (data.verificationMethod === 'email') {
      return 'Email Verification'
    } else if (data.verificationMethod === 'phone') {
      return 'Phone Verification'
    }
    return 'Not selected'
  }

  const getDocumentTypeText = () => {
    switch (data.documentType) {
      case 'drivers_license':
        return "Driver's License"
      case 'nin':
        return 'NIN'
      case 'international_passport':
        return 'International Passport'
      default:
        return 'Not selected'
    }
  }

  const reviewItems = [
    {
      title: 'Verification Method',
      value: getVerificationMethodText(),
      editStep: 1,
    },
    {
      title: 'ID Document',
      value: getDocumentTypeText(),
      editStep: 2,
    },
    {
      title: 'Photo',
      value: data.profilePhoto ? 'Selfie uploaded' : 'Not uploaded',
      editStep: 3,
    },
    {
      title: 'Bank Details',
      value: data.bankName
        ? `${data.bankName} •••• ${data.accountNumber?.slice(-4)}`
        : 'Not provided',
      editStep: 4,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h2 className="text-2xl font-semibold">Review Your Information</h2>
          <p className="text-gray-400">
            Please review your information before submitting
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviewItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-400 mb-1">{item.title}</p>
              <p className="font-medium">{item.value}</p>
            </div>
            <Button
              variant="outline"
              size="extra-small"
              onClick={() => onEdit(item.editStep)}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-3">
        <Checkbox
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked as boolean)}
        />
        <p className="text-sm text-gray-400">
          I confirm that all the information provided is accurate and I agree to
          the{' '}
          <button className="text-blue-400 hover:underline">
            Terms of Service
          </button>
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" size="medium" onClick={onPrev}>
          Back
        </Button>
        <Button
          variant="filled"
          size="medium"
          disabled={!agreed}
          onClick={onSubmit}
        >
          Submit for Verification
        </Button>
      </div>
    </div>
  )
}
