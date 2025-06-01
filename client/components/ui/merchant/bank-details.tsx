'use client'

import { useState } from 'react'
import Button from '@/components/common/button';
import BackButton from '@/components/common/button/back-button'
import type { VerificationData } from '@/app/(dashboard)/merchant/verification/page'
import {
  Building2,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface BankDetailsProps {
  data: VerificationData
  onUpdate: (data: Partial<VerificationData>) => void
  onNext: () => void
  onPrev: () => void
}

const banks = [
  { value: 'access_bank', label: 'Access Bank' },
  { value: 'first_bank', label: 'First Bank of Nigeria' },
  { value: 'gtbank', label: 'Guaranty Trust Bank'},
  { value: 'uba', label: 'United Bank for Africa' },
  { value: 'zenith_bank', label: 'Zenith Bank' },
  { value: 'fidelity_bank', label: 'Fidelity Bank' },
  { value: 'union_bank', label: 'Union Bank'},
  { value: 'sterling_bank', label: 'Sterling Bank' },
  { value: 'stanbic_ibtc', label: 'Stanbic IBTC Bank' },
  { value: 'ecobank', label: 'Ecobank Nigeria' },
  { value: 'fcmb', label: 'First City Monument Bank' },
  { value: 'heritage_bank', label: 'Heritage Bank' },
  { value: 'keystone_bank', label: 'Keystone Bank' },
  { value: 'polaris_bank', label: 'Polaris Bank' },
  { value: 'providus_bank', label: 'Providus Bank' },
  { value: 'wema_bank', label: 'Wema Bank' },
]



export default function BankDetails({
  data,
  onUpdate,
  onNext,
  onPrev,
}: BankDetailsProps) {
  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
    bankName: data.bankName || '',
    accountNumber: data.accountNumber || '',
    accountType: '',
    bvn: '',
    sortCode: '',
  })

  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [accountName, setAccountName] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Reset verification when account details change
    if (field === 'accountNumber' || field === 'bankName') {
      setVerificationStatus('idle')
      setAccountName('')
    }
  }

  const verifyAccountDetails = async () => {
    if (!formData.accountNumber || !formData.bankName) return

    setIsVerifying(true)

    // Simulate account verification API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock verification result
    const isValid = formData.accountNumber.length === 10
    if (isValid) {
      setVerificationStatus('success')
      setAccountName(formData.fullName || 'John Doe') // Mock account name
    } else {
      setVerificationStatus('error')
    }

    setIsVerifying(false)
  }

  const handleNext = () => {
    onUpdate({
      fullName: formData.fullName,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
    })
    onNext()
  }

  const isValid =
    formData.fullName &&
    formData.bankName &&
    formData.accountNumber &&
    verificationStatus === 'success'

  // const selectedBank = banks.find((bank) => bank.label === formData.bankName)

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-white dark:text-white">
            Bank Account Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Provide your bank details for secure payment processing
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Security Notice */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Secure & Encrypted
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Your banking information is encrypted and securely stored. We
                  never store your login credentials.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Account Holder Information
            </CardTitle>
            <CardDescription>
              Enter the full name as it appears on your bank account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name as it appears on your account"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Bank Details
            </CardTitle>
            <CardDescription>
              Select your bank and enter your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bank Selection */}
            <div className="space-y-2">
              <Label htmlFor="bank">Bank Name *</Label>
              <Select
                value={formData.bankName}
                onValueChange={(value) => handleInputChange('bankName', value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.value} value={bank.label}>
                      <div className="flex items-center justify-between w-full">
                        <span>{bank.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* {selectedBank} */}
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <div className="relative">
                <Input
                  id="accountNumber"
                  placeholder="Enter your 10-digit account number"
                  value={formData.accountNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                    handleInputChange('accountNumber', value)
                  }}
                  className="h-12 pr-24"
                  maxLength={10}
                />
                {formData.accountNumber.length === 10 && formData.bankName && (
                  <Button
                    variant="outline"
                    size="small"
                    onClick={verifyAccountDetails}
                    loading={isVerifying}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify'}
                  </Button>
                )}
              </div>

              {/* Verification Status */}
              {verificationStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Account Verified
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Account Name: {accountName}
                    </p>
                  </div>
                </div>
              )}

              {verificationStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      Verification Failed
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Please check your account details
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Account Type */}

            <Separator />

            {/* Additional Information */}
            {/* <div className="grid sm:grid-cols-2 gap-6"> */}
            <div className="space-y-2">
              <Label htmlFor="bvn">BVN (Optional)</Label>
              <Input
                id="bvn"
                placeholder="Bank Verification Number"
                value={formData.bvn}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 11)
                  handleInputChange('bvn', value)
                }}
                className="h-12"
                maxLength={11}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                For enhanced security verification
              </p>
            </div>
            {/* </div> */}
          </CardContent>
        </Card>

        {/* Information Notice */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  Important Notice
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Ensure your account details are accurate. Payments will be
                  processed to this account after verification approval.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
        <Button
          variant="outline"
          size="medium"
          onClick={onPrev}
          className="sm:min-w-32"
        >
          Back
        </Button>
        <Button
          variant="filled"
          size="medium"
          disabled={!isValid}
          onClick={handleNext}
          className="sm:min-w-32"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  )
}
