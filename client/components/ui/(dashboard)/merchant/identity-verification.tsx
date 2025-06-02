'use client'

import type React from 'react'
import { useState } from 'react'
import Button from '@/components/common/button'
import BackButton from '@/components/common/button/back-button'
import type { VerificationData } from '@/app/(dashboard)/merchant/verification/page'
import {
  CreditCard,
  FileText,
  StampIcon as Passport,
  CloudUpload,
  CheckCircle,
  FileImage,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface IdentityVerificationProps {
  data: VerificationData
  onUpdate: (data: Partial<VerificationData>) => void
  onNext: () => void
  onPrev: () => void
}

const documentTypes = [
  {
    id: 'drivers_license',
    title: "Driver's License",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    id: 'nin',
    title: 'NIN',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 'international_passport',
    title: 'International Passport',
    icon: <Passport className="w-6 h-6" />,
  },
]

export default function IdentityVerification({
  data,
  onUpdate,
  onNext,
  onPrev,
}: IdentityVerificationProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ]

    if (file.size > maxSize) {
      alert('File size must be less than 5MB')
      return false
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, and PDF files are allowed')
      return false
    }

    return true
  }

  const simulateUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setIsUploading(false)
    onUpdate({ documentFile: file })
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        await simulateUpload(file)
      }
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        await simulateUpload(file)
      }
    }
    // Reset input
    e.target.value = ''
  }

  const removeFile = () => {
    onUpdate({ documentFile: null })
    setUploadProgress(0)
  }

  const handleDocumentTypeSelect = (type: VerificationData['documentType']) => {
    onUpdate({ documentType: type })
  }

  const isValid = data.documentType && data.documentFile

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="w-6 h-6 text-blue-500" />
    }
    return <FileText className="w-6 h-6 text-red-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    )
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-white dark:text-white">
            Identity Verification
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Upload a clear photo of your identification document
          </p>
        </div>
      </div>

      {/* File Upload Area */}
      <div className="space-y-6">
        {data.documentFile ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-green-200 dark:border-green-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {getFileIcon(data.documentFile)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-green-700 dark:text-green-400 truncate">
                  {data.documentFile.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatFileSize(data.documentFile.size)}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <button
                  onClick={removeFile}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'border-2 border-dashed rounded-xl p-8 lg:p-12 text-center transition-all duration-200',
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <CloudUpload className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600 dark:text-blue-400" />
              </div>

              {isUploading ? (
                <div className="space-y-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Uploading...
                  </p>
                  <div className="w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {uploadProgress}%
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-lg lg:text-xl font-medium text-gray-900 dark:text-white">
                      Drag and drop your document here
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      or click to browse
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={() =>
                        document.getElementById('document-upload')?.click()
                      }
                      className="min-w-32"
                    >
                      Browse Files
                    </Button>
                  </div>
                  <input
                    id="document-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                  />
                </div>
              )}

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supported formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Document Type Selection */}
      <div>
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Select Document Type
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {documentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() =>
                handleDocumentTypeSelect(
                  type.id as VerificationData['documentType']
                )
              }
              className={cn(
                'p-6 lg:p-8 rounded-xl border-2 transition-all duration-200 text-center',
                data.documentType === type.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                {type.icon}
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {type.title}
              </p>
              {data.documentType === type.id && (
                <CheckCircle className="w-5 h-5 text-blue-500 mx-auto mt-3" />
              )}
            </button>
          ))}
        </div>
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
          onClick={onNext}
          className="sm:min-w-32"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
