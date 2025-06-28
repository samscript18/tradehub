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
  Edit3,
  Copy,
  Trash2,
  Package,
  Tag,
  Palette,
  Ruler,
  Settings,
} from 'lucide-react'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { storeCategories } from '@/lib/data'
import { FaNairaSign } from 'react-icons/fa6'
import { useMutation } from '@tanstack/react-query'
import { createProduct } from '@/lib/services/merchant.service'
import type { CreateProductDto } from '@/lib/types/types' 

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

  // Enhanced variant interface
  interface EnhancedProductVariant {
    id: string
    size: string
    color: string
    price: number
    stock: number
  }

  const [variants, setVariants] = useState<EnhancedProductVariant[]>([])
  const [isAddingVariant, setIsAddingVariant] = useState(false)
  const [editingVariant, setEditingVariant] =
    useState<EnhancedProductVariant | null>(null)

  interface VariantGroup {
    type: string
    values: string[]
    icon: React.ReactNode
  }

  const variantGroups: VariantGroup[] = [
    {
      type: 'Size',
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'],
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      type: 'Color',
      values: [
        'Black',
        'White',
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Pink',
        'Purple',
        'Gray',
        'Brown',
      ],
      icon: <Palette className="w-4 h-4" />,
    },
    {
      type: 'Material',
      values: [
        'Cotton',
        'Polyester',
        'Silk',
        'Wool',
        'Linen',
        'Denim',
        'Leather',
      ],
      icon: <Tag className="w-4 h-4" />,
    },
    {
      type: 'Style',
      values: ['Regular', 'Slim', 'Loose', 'Fitted', 'Oversized'],
      icon: <Settings className="w-4 h-4" />,
    },
  ]

  const [newVariant, setNewVariant] = useState<
    Omit<EnhancedProductVariant, 'id'>
  >({
    size: '',
    color: '',
    price: 0,
    stock: 0,
  })

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

    if (uploadedImages.length !== 5) {
      newErrors.images = 'You must upload exactly 5 product images'
    }

    // Check if at least one delivery option is selected
    const hasDeliveryOption = Object.values(formData.deliveryOptions).some(
      (option) => option
    )
    if (!hasDeliveryOption) {
      newErrors.deliveryOptions =
        'At least one delivery option must be selected'
    }

    if (
      !variants.length ||
      variants.filter((v) => v.size && v.color && v.price && v.stock).length ===
        0
    ) {
      newErrors.variants = 'At least one product variant is required'
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

  // Mutation
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      setSuccessMessage('Product published successfully!')
      setShowSuccessAlert(true)
      setTimeout(() => {
        router.push('/merchant/products')
      }, 2000)
    },
    onError: (error) => {
      setErrors({ publish: error.message || 'Failed to publish product.' })
      console.error('Failed to publish:', error)
    },
  })

  // Publish function
  const handlePublish = async () => {
    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      // Convert images to base64
      const imageBase64s = await Promise.all(uploadedImages.map(fileToBase64))

      // Prepare payload
      const payload: CreateProductDto = {
        name: formData.productName,
        description: formData.description,
        images: imageBase64s,
        category: formData.category,
        variants: variants
          .filter((v) => v.size && v.color && v.price && v.stock)
          .map((v) => ({
            size: v.size,
            color: v.color,
            price: typeof v.price === 'string' ? Number(v.price) : v.price,
            stock: typeof v.stock === 'string' ? Number(v.stock) : v.stock,
          })),
      }

      mutation.mutate(payload, {
        onError: () => setIsLoading(false), // <-- Reset loading if API error
        onSuccess: () => setIsLoading(false), // Optional: reset loading on success
      })
    } catch (error) {
      setErrors({ publish: 'Failed to process images.' })
       console.error('Failed to publish:', error)
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

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const handleAddVariant = () => {
    if (newVariant.size && newVariant.color && newVariant.price) {
      const variant: EnhancedProductVariant = {
        ...newVariant,
        id: generateId(),
      }
      setVariants([...variants, variant])
      setNewVariant({ size: '', color: '', price: 0, stock: 0 })
      setIsAddingVariant(false)
    }
  }

  const handleEditVariant = (variant: EnhancedProductVariant) => {
    setEditingVariant(variant)
  }

  const handleUpdateVariant = () => {
    if (editingVariant) {
      setVariants(
        variants.map((v) => (v.id === editingVariant.id ? editingVariant : v))
      )
      setEditingVariant(null)
    }
  }

  const handleDeleteVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const handleDuplicateVariant = (variant: EnhancedProductVariant) => {
    const duplicated: EnhancedProductVariant = {
      ...variant,
      id: generateId(),
    }
    setVariants([...variants, duplicated])
  }



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
                      '/placeholder.svg' ||
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
                  <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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

            {/* Modern Variants Section */}
            <Card className="bg-[#1a1a1a] border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Variants ({variants.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Add Variants */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">
                    Quick Add Variants
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {variantGroups.map((group) => (
                      <div key={group.type} className="space-y-3">
                        <div className="flex items-center gap-2">
                          {group.icon}
                          <h5 className="text-sm font-medium">{group.type}</h5>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.values.slice(0, 4).map((value) => (
                            <Button
                              key={value}
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs border-gray-600 hover:bg-gray-700"
                              onClick={() => {
                                setNewVariant({
                                  size: group.type === 'Size' ? value : '',
                                  color: group.type === 'Color' ? value : '',
                                  price: Number(formData.regularPrice) || 0,
                                  stock: 0,
                                })
                                setIsAddingVariant(true)
                              }}
                            >
                              {value}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variants List */}
                {variants.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      No variants added yet
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">
                      Add variants to offer different options for your product
                    </p>
                    <Button
                      onClick={() => setIsAddingVariant(true)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Variant
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {variant.size && (
                              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 border text-xs">
                                Size: {variant.size}
                              </Badge>
                            )}
                            {variant.color && (
                              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 border text-xs">
                                Color: {variant.color}
                              </Badge>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold">
                              ₦{variant.price}
                            </p>
                            <p className="text-xs text-gray-400">
                              {variant.stock || '0'} in stock
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-bold">
                              ₦{variant.price}
                            </p>
                            <p className="text-xs text-gray-400">
                              {variant.stock || '0'} in stock
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditVariant(variant)}
                              className="h-8 w-8 p-0 border-gray-600 hover:bg-gray-700"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDuplicateVariant(variant)}
                              className="h-8 w-8 p-0 border-gray-600 hover:bg-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteVariant(variant.id)}
                              className="h-8 w-8 p-0 border-red-600 text-red-400 hover:bg-red-600/10"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Custom Variant Button */}
                <div className="flex justify-center pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingVariant(true)}
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Variant
                  </Button>
                </div>
              </CardContent>
            </Card>
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
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>

      {/* Add Variant Dialog */}
      <Dialog open={isAddingVariant} onOpenChange={setIsAddingVariant}>
        <DialogContent className="bg-[#1a1a1a] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New Variant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Size</Label>
                <Input
                  value={newVariant.size}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, size: e.target.value })
                  }
                  placeholder="e.g. M"
                  className="bg-[#2a2a2a] border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <Input
                  value={newVariant.color}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, color: e.target.value })
                  }
                  placeholder="e.g. Blue"
                  className="bg-[#2a2a2a] border-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  value={newVariant.price}
                  onChange={(e) =>
                    setNewVariant({
                      ...newVariant,
                      price: Number(e.target.value),
                    })
                  }
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  className="bg-[#2a2a2a] border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input
                  value={newVariant.stock}
                  onChange={(e) =>
                    setNewVariant({
                      ...newVariant,
                      stock: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                  type="number"
                  className="bg-[#2a2a2a] border-gray-600"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddingVariant(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddVariant}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Variant
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Variant Dialog */}
      <Dialog
        open={!!editingVariant}
        onOpenChange={() => setEditingVariant(null)}
      >
        <DialogContent className="bg-[#1a1a1a] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Variant</DialogTitle>
          </DialogHeader>
          {editingVariant && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Input
                    value={editingVariant.size}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        size: e.target.value,
                      })
                    }
                    placeholder="e.g. M"
                    className="bg-[#2a2a2a] border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    value={editingVariant.color}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        color: e.target.value,
                      })
                    }
                    placeholder="e.g. Blue"
                    className="bg-[#2a2a2a] border-gray-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <div className="relative">
                    <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={editingVariant.price}
                      onChange={(e) =>
                        setEditingVariant({
                          ...editingVariant,
                          price: Number(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      className="bg-[#2a2a2a] border-gray-600 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    value={editingVariant.stock}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        stock: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                    type="number"
                    className="bg-[#2a2a2a] border-gray-600"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setEditingVariant(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateVariant}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Variant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                          <span>₦{price}</span>
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

async function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new Error('Failed to convert file to base64'))
      }
    }
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export default AddProductPage
