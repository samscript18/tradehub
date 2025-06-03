'use client'

import type React from 'react'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Upload,
  ImageIcon,
  ChevronDown,
  DollarSign,
  X,
  Plus,
  Eye,
  Save,
  Send,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { storeCategories } from '@/lib/data'

const AddProductPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    regularPrice: '',
    salePrice: '',
    stockQuantity: '',
    description: '',
    deliveryOptions: {
      localPickup: false,
      standardShipping: false,
      expressDelivery: false,
    },
    deliveryPrices: {
      localPickup: '0.00',
      standardShipping: '5.99',
      expressDelivery: '12.99',
    },
  })

  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleDeliveryOptionChange = (option: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      deliveryOptions: { ...prev.deliveryOptions, [option]: checked },
    }))
  }

  const handleDeliveryPriceChange = (option: string, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, '')
    setFormData((prev) => ({
      ...prev,
      deliveryPrices: { ...prev.deliveryPrices, [option]: sanitizedValue },
    }))
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files).slice(
          0,
          5 - uploadedImages.length
        )
        setUploadedImages((prev) => [...prev, ...files].slice(0, 5))
      }
    },
    [uploadedImages.length]
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(
        0,
        5 - uploadedImages.length
      )
      setUploadedImages((prev) => [...prev, ...files].slice(0, 5))
      e.target.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev]
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleImageSlotClick = (index: number) => {
    if (index >= uploadedImages.length) {
      document.getElementById('file-upload')?.click()
    }
  }

  // Form validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (
      !formData.regularPrice ||
      Number.parseFloat(formData.regularPrice) <= 0
    ) {
      newErrors.regularPrice = 'Valid regular price is required'
    }

    if (
      !formData.stockQuantity ||
      Number.parseInt(formData.stockQuantity) < 0
    ) {
      newErrors.stockQuantity = 'Valid stock quantity is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required'
    }

    if (uploadedImages.length === 0) {
      newErrors.images = 'At least one product image is required'
    }

    // Check if at least one delivery option is selected
    const hasDeliveryOption = Object.values(formData.deliveryOptions).some(
      (option) => option
    )
    if (!hasDeliveryOption) {
      newErrors.deliveryOptions =
        'At least one delivery option must be selected'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Save as Draft function
  const handleSaveAsDraft = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save to localStorage as draft
      const draftData = {
        ...formData,
        images: uploadedImages.map((file) => file.name), // In real app, you'd upload images first
        status: 'draft',
        savedAt: new Date().toISOString(),
      }

      localStorage.setItem('productDraft', JSON.stringify(draftData))

      setSuccessMessage('Product saved as draft successfully!')
      setShowSuccessAlert(true)

      setTimeout(() => {
        setShowSuccessAlert(false)
      }, 3000)
    } catch (error) {
      console.error('Error saving draft:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Preview function
  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true)
    }
  }

  // Publish function
  const handlePublish = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call for publishing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would:
      // 1. Upload images to cloud storage
      // 2. Create product in database
      // 3. Handle any errors

      const productData = {
        ...formData,
        images: uploadedImages.map((file) => file.name),
        status: 'published',
        publishedAt: new Date().toISOString(),
      }

      console.log('Publishing product:', productData)

      setSuccessMessage('Product published successfully!')
      setShowSuccessAlert(true)

      // Redirect to products page after successful publish
      setTimeout(() => {
        router.push('/merchant/products')
      }, 2000)
    } catch (error) {
      console.error('Error publishing product:', error)
      setErrors({ publish: 'Failed to publish product. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const deliveryOptions = [
    { id: 'localPickup', label: 'Local Pickup' },
    { id: 'standardShipping', label: 'Standard Shipping' },
    { id: 'expressDelivery', label: 'Express Delivery' },
  ]

  // Get the selected category details
  const selectedCategory = storeCategories.find(
    (cat) => cat.value === formData.category
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className="bg-green-600/20 border-green-600/30 text-green-400">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        </div>
      )}


      <div className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Error Alert for Images */}
        {errors.images && (
          <Alert className="bg-red-600/20 border-red-600/30 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.images}</AlertDescription>
          </Alert>
        )}

        {/* Image Upload Section */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500'
          } ${errors.images ? 'border-red-500' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-lg text-gray-300 mb-2">
                Drag and drop product images or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Up to 5 images, max 5MB each
              </p>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Choose Files
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Image Preview Grid */}
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`aspect-square bg-[#1a1a1a] border border-gray-700 rounded-lg relative overflow-hidden ${
                index >= uploadedImages.length ? 'cursor-pointer' : ''
              }`}
              onClick={() => handleImageSlotClick(index)}
            >
              {uploadedImages[index] ? (
                <>
                  <img
                    src={
                      URL.createObjectURL(uploadedImages[index]) ||
                      '/placeholder.svg'
                    }
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveImage(index)
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {index === uploadedImages.length ? (
                    <>
                      <Plus className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">Add Image</span>
                    </>
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-600" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Product Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-white text-sm">
                Product Name *
              </Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) =>
                  handleInputChange('productName', e.target.value)
                }
                placeholder="Enter product name"
                className={`bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg ${
                  errors.productName ? 'border-red-500' : ''
                }`}
              />
              {errors.productName && (
                <p className="text-red-400 text-sm">{errors.productName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white text-sm">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger
                  className={`bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg ${
                    errors.category ? 'border-red-500' : ''
                  }`}
                >
                  <SelectValue>
                    {selectedCategory ? (
                      <div className="flex items-center">
                        <span className="mr-2">{selectedCategory.icon}</span>
                        <span>{selectedCategory.label}</span>
                      </div>
                    ) : (
                      'Select category'
                    )}
                  </SelectValue>
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-gray-700 max-h-[300px]">
                  {storeCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.value}
                      className="text-white"
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-400 text-sm">{errors.category}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regularPrice" className="text-white text-sm">
                  Regular Price *
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="regularPrice"
                    value={formData.regularPrice}
                    onChange={(e) =>
                      handleInputChange('regularPrice', e.target.value)
                    }
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    className={`bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg pl-10 ${
                      errors.regularPrice ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.regularPrice && (
                  <p className="text-red-400 text-sm">{errors.regularPrice}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salePrice" className="text-white text-sm">
                  Sale Price
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="salePrice"
                    value={formData.salePrice}
                    onChange={(e) =>
                      handleInputChange('salePrice', e.target.value)
                    }
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    className="bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockQuantity" className="text-white text-sm">
                Stock Quantity *
              </Label>
              <Input
                id="stockQuantity"
                value={formData.stockQuantity}
                onChange={(e) =>
                  handleInputChange('stockQuantity', e.target.value)
                }
                placeholder="Enter quantity"
                type="number"
                className={`bg-[#1a1a1a] border-gray-700 text-white h-12 rounded-lg ${
                  errors.stockQuantity ? 'border-red-500' : ''
                }`}
              />
              {errors.stockQuantity && (
                <p className="text-red-400 text-sm">{errors.stockQuantity}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white text-sm">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                placeholder="Describe your product..."
                className={`bg-[#1a1a1a] border-gray-700 text-white min-h-[200px] rounded-lg resize-none ${
                  errors.description ? 'border-red-500' : ''
                }`}
              />
              {errors.description && (
                <p className="text-red-400 text-sm">{errors.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Delivery Options *</h3>
          {errors.deliveryOptions && (
            <Alert className="bg-red-600/20 border-red-600/30 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.deliveryOptions}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            {deliveryOptions.map((option) => (
              <Card key={option.id} className="bg-[#1a1a1a] border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={option.id}
                        checked={
                          formData.deliveryOptions[
                            option.id as keyof typeof formData.deliveryOptions
                          ]
                        }
                        onCheckedChange={(checked) =>
                          handleDeliveryOptionChange(
                            option.id,
                            checked as boolean
                          )
                        }
                        className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-5 h-5"
                      />
                      <Label
                        htmlFor={option.id}
                        className="text-white text-sm font-medium"
                      >
                        {option.label}
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <div className="relative w-24">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          value={
                            formData.deliveryPrices[
                              option.id as keyof typeof formData.deliveryPrices
                            ]
                          }
                          onChange={(e) =>
                            handleDeliveryPriceChange(option.id, e.target.value)
                          }
                          className="bg-[#1a1a1a] border-gray-700 text-white h-10 rounded-lg pl-10 pr-2"
                          disabled={
                            !formData.deliveryOptions[
                              option.id as keyof typeof formData.deliveryOptions
                            ]
                          }
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8">
          <Button
            variant="outline"
            className="border-gray-600 cursor-pointer text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg"
            onClick={handleSaveAsDraft}
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 cursor-pointer text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg"
            onClick={handlePreview}
            disabled={isLoading}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            onClick={handlePublish}
            disabled={isLoading}
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="bg-[#1a1a1a] border-gray-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Product Preview
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Images */}
            <div className="grid grid-cols-5 gap-4">
              {uploadedImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-[#2a2a2a] rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(image) || '/placeholder.svg'}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {formData.productName}
                  </h3>
                  {selectedCategory && (
                    <Badge className="mt-2 bg-blue-600/20 text-blue-400 border-blue-600/30">
                      <span className="mr-1">{selectedCategory.icon}</span>
                      {selectedCategory.label}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold">
                      ${formData.regularPrice}
                    </span>
                    {formData.salePrice && (
                      <span className="text-lg text-green-400">
                        ${formData.salePrice}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">
                    Stock: {formData.stockQuantity} units
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-300">{formData.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Delivery Options</h4>
                  <div className="space-y-2">
                    {deliveryOptions.map((option) => {
                      const isSelected =
                        formData.deliveryOptions[
                          option.id as keyof typeof formData.deliveryOptions
                        ]
                      const price =
                        formData.deliveryPrices[
                          option.id as keyof typeof formData.deliveryPrices
                        ]

                      return isSelected ? (
                        <div
                          key={option.id}
                          className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded"
                        >
                          <span>{option.label}</span>
                          <span>${price}</span>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close Preview
            </Button>
            <Button onClick={handlePublish} disabled={isLoading}>
              {isLoading ? 'Publishing...' : 'Publish Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddProductPage
