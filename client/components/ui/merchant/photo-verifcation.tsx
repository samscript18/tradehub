'use client'

import type React from 'react'
import { useState, useRef } from 'react'
import Button from '@/components/common/button/index'
import BackButton from '@/components/common/button/back-button'
import type { VerificationData } from '@/app/(dashboard)/merchant/verification/page'
import Image from 'next/image'
import { Camera, X, Upload, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhotoVerificationProps {
  data: VerificationData
  onUpdate: (data: Partial<VerificationData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function PhotoVerification({
  data,
  onUpdate,
  onNext,
  onPrev,
}: PhotoVerificationProps) {
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

    if (file.size > maxSize) {
      alert('File size must be less than 5MB')
      return false
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG and PNG files are allowed')
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
    onUpdate({ profilePhoto: file })
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
    e.target.value = ''
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user',
        },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setShowCamera(true)
    } catch (error) {
      alert('Camera access denied or not available')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const file = new File([blob], 'selfie.jpg', {
                type: 'image/jpeg',
              })
              await simulateUpload(file)
              stopCamera()
            }
          },
          'image/jpeg',
          0.8
        )
      }
    }
  }

  const removePhoto = () => {
    onUpdate({ profilePhoto: null })
    setUploadProgress(0)
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
            Profile Photo
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Upload a clear photo of yourself
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        {showCamera ? (
          <div className="space-y-6">
            <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="filled"
                size="medium"
                onClick={capturePhoto}
                className="flex-1"
              >
                Capture Photo
              </Button>
              <Button
                variant="outline"
                size="medium"
                onClick={stopCamera}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : data.profilePhoto ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="w-48 h-48 lg:w-56 lg:h-56 mx-auto rounded-full overflow-hidden border-4 border-green-200 dark:border-green-800 shadow-lg">
                <Image
                  src={
                    URL.createObjectURL(data.profilePhoto) || '/placeholder.svg'
                  }
                  alt="Profile photo"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <button
                onClick={removePhoto}
                className="absolute top-2 right-2 lg:top-4 lg:right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <p className="text-green-700 dark:text-green-400 font-medium">
                Photo uploaded successfully!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
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
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-gray-500 dark:text-gray-400" />
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
                        Upload a clear photo of yourself
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Make sure your face is clearly visible and well-lit
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline"
                        size="medium"
                        onClick={() =>
                          document.getElementById('photo-upload')?.click()
                        }
                        icon={<Upload className="w-4 h-4" />}
                        className="min-w-32"
                      >
                        Upload Photo
                      </Button>
                      <Button
                        variant="outline"
                        size="medium"
                        onClick={startCamera}
                        icon={<Camera className="w-4 h-4" />}
                        className="min-w-32"
                      >
                        Take Photo
                      </Button>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                    />
                  </div>
                )}

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supported formats: JPG, PNG (Max 5MB)
                </p>
              </div>
            </div>
          </div>
        )}
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
          disabled={!data.profilePhoto}
          onClick={onNext}
          className="sm:min-w-32"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
