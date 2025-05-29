'use client'

import Button from '@/components/common/button/index'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function VerificationComplete() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center">
      <div className="text-center text-white max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Verification Complete!</h2>
          <p className="text-gray-400 mb-8">
            Your information has been submitted for verification. We'll review
            your details and notify you via email once the process is complete.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Set up your store</h3>
            <p className="text-gray-400">
              Add products and customize your storefront
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Start selling</h3>
            <p className="text-gray-400">
              List your products and start accepting orders
            </p>
          </div>
        </div>

        <Button
          variant="filled"
          size="medium"
          fullWidth
          onClick={() => router.push('/merchant/dashboard')}
        >
          Go to Merchant Dashboard
        </Button>
      </div>
    </div>
  )
}
