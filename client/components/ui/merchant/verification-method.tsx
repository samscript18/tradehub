'use client'

import { cn } from '@/lib/utils'

import { useState } from 'react'
import Button from '@/components/common/button'
import TextField from '@/components/common/inputs/text-field'
import type { VerificationData } from '@/app/(dashboard)/merchant/verification/page'
import { Mail, Phone, CheckCircle, Clock, Send } from 'lucide-react'

interface VerificationMethodProps {
  data: VerificationData
  onUpdate: (data: Partial<VerificationData>) => void
  onNext: () => void
}

export default function VerificationMethod({
  data,
  onUpdate,
  onNext,
}: VerificationMethodProps) {
  const [email, setEmail] = useState(data.email || '')
  const [phone, setPhone] = useState(data.phone || '')
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleMethodChange = (method: 'email' | 'phone') => {
    onUpdate({ verificationMethod: method })
    setIsCodeSent(false)
    setIsVerified(false)
    setVerificationCode('')
  }

  const sendVerificationCode = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsCodeSent(true)
    setIsLoading(false)
    setCountdown(60)

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    if (data.verificationMethod === 'email') {
      onUpdate({ email })
    } else if (data.verificationMethod === 'phone') {
      onUpdate({ phone })
    }
  }

  const verifyCode = async () => {
    setIsLoading(true)

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (verificationCode === '123456') {
      // Demo code
      setIsVerified(true)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      alert('Invalid code. Use 123456 for demo')
    }
  }

  const handleNext = () => {
    if (isVerified) {
      onNext()
    }
  }

  const currentValue = data.verificationMethod === 'email' ? email : phone
  const isValidInput =
    data.verificationMethod && currentValue && currentValue.length > 0

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl font-semibold text-white dark:text-white mb-3">
          Choose Verification Method
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Select your preferred verification method to continue
        </p>
      </div>

      {/* Method Selection */}
      <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
        {/* Email Verification */}
        <div
          className={cn(
            'p-6 lg:p-8 rounded-xl border-2 cursor-pointer transition-all duration-200',
            data.verificationMethod === 'email'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
          )}
          onClick={() => handleMethodChange('email')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Email Verification
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Receive a verification code via email
              </p>
            </div>
            {data.verificationMethod === 'email' && isVerified && (
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Phone Verification */}
        <div
          className={cn(
            'p-6 lg:p-8 rounded-xl border-2 cursor-pointer transition-all duration-200',
            data.verificationMethod === 'phone'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
          )}
          onClick={() => handleMethodChange('phone')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Phone Verification
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Receive an OTP via SMS
              </p>
            </div>
            {data.verificationMethod === 'phone' && isVerified && (
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            )}
          </div>
        </div>
      </div>

      {/* Verification Process */}
      {data.verificationMethod && (
        <div className="max-w-md mx-auto space-y-6">
          {/* Step 1: Enter Email/Phone */}
          <div
            className={cn(
              'transition-all duration-300',
              isCodeSent && 'opacity-50'
            )}
          >
            {data.verificationMethod === 'email' ? (
              <TextField
                label="Email Address"
                className="w-full"
                InputProps={{
                  type: 'email',
                  placeholder: 'Enter your email address',
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true,
                  disabled: isCodeSent,
                }}
              />
            ) : (
              <TextField
                label="Phone Number"
                className="w-full"
                InputProps={{
                  type: 'tel',
                  placeholder: 'Enter your phone number',
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  required: true,
                  disabled: isCodeSent,
                }}
              />
            )}

            {!isCodeSent && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="medium"
                  fullWidth
                  disabled={!isValidInput || isLoading}
                  loading={isLoading}
                  onClick={sendVerificationCode}
                  icon={<Send className="w-4 h-4" />}
                  iconPosition="left"
                >
                  {isLoading
                    ? 'Sending...'
                    : `Send ${
                        data.verificationMethod === 'email' ? 'Email' : 'SMS'
                      }`}
                </Button>
              </div>
            )}
          </div>

          {/* Step 2: Enter Verification Code */}
          {isCodeSent && !isVerified && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                  Verification Code Sent
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We&apos;ve sent a 6-digit code to{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {currentValue}
                  </span>
                </p>
              </div>

              <TextField
                label="Verification Code"
                className="w-full"
                InputProps={{
                  placeholder: 'Enter 6-digit code',
                  value: verificationCode,
                  onChange: (e) => setVerificationCode(e.target.value),
                  maxLength: 6,
                  className: 'text-center text-lg tracking-widest font-mono',
                }}
              />

              <div className="mt-6 space-y-4">
                <Button
                  variant="filled"
                  size="medium"
                  fullWidth
                  disabled={verificationCode.length !== 6 || isLoading}
                  loading={isLoading}
                  onClick={verifyCode}
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </Button>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Resend code in {countdown}s
                    </p>
                  ) : (
                    <button
                      onClick={sendVerificationCode}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Resend code
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                  💡 Demo: Use code{' '}
                  <span className="font-mono font-bold">123456</span>
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Verification Success */}
          {isVerified && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 lg:p-8 border border-green-200 dark:border-green-800 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-green-700 dark:text-green-400 text-lg mb-2">
                Verification Successful!
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                Your {data.verificationMethod} has been verified successfully
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center text-white lg:justify-end pt-8">
        <Button
          variant="filled"
          size="medium"
          disabled={!isVerified}
          onClick={handleNext}
          className="min-w-[8rem] !text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
