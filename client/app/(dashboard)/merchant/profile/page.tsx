'use client'

import { useState } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Upload,
  Check,
  Clock,
  Globe,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react'

const MerchantProfilePage = () => {
  const [formData, setFormData] = useState({
    businessName: 'Marcus & Sons Grocery',
    storeCategory: 'grocery-food',
    businessEmail: 'marcus@marcusandsons.com',
    phoneNumber: '(555) 123-4567',
    businessAddress: '123 Market Street, Brooklyn, NY 11201',
    websiteUrl: 'www.marcusandsons.com',
    instagramHandle: '@marcusandsons',
    facebookHandle: 'Marcus & Sons Grocery',
    twitterHandle: '@marcusandsons',
    storeDescription:
      'Marcus & Sons Grocery is a family-owned business serving the Brooklyn community since 1985. We specialize in fresh produce, organic goods, and culturally diverse products.',
    features: {
      deliveryAvailable: true,
      inStorePickup: true,
      blackOwnedBusiness: true,
      communityPartner: true,
      acceptEBT: false,
      wheelchairAccessible: false,
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: checked },
    }))
  }

  const handleSaveChanges = () => {
    console.log('Saving changes:', formData)
    
  }

  return (
    <div className="space-y-6">
      {/* Store Banner Section */}
      <Card className="relative overflow-hidden bg-gray-900 border-gray-800">
        <div
          className="h-48 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/images/store-banner.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          >
            <Upload className="w-4 h-4 mr-2" />
            Update Store Banner
          </Button>
        </div>

        {/* Profile Section */}
        <CardContent className="relative -mt-12 pb-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Marcus Johnson"
                />
                <AvatarFallback className="text-2xl bg-blue-600 text-white">
                  MJ
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1 pt-8">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-semibold text-white">
                  Marcus & Sons Grocery
                </h1>
                <Check className="w-5 h-5 text-blue-400" />
              </div>
              <Badge
                variant="secondary"
                className="bg-green-600/20 text-green-400 border-green-600/30"
              >
                Verified Business
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="basic-info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900 border-gray-800">
          <TabsTrigger
            value="basic-info"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Basic Info
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="banking"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Banking
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-white">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange('businessName', e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeCategory" className="text-white">
                      Store Category
                    </Label>
                    <Select
                      value={formData.storeCategory}
                      onValueChange={(value) =>
                        handleInputChange('storeCategory', value)
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="grocery-food">
                          Grocery & Food
                        </SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="text-white">
                      Business Email
                    </Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={formData.businessEmail}
                      onChange={(e) =>
                        handleInputChange('businessEmail', e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange('phoneNumber', e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress" className="text-white">
                      Business Address
                    </Label>
                    <Input
                      id="businessAddress"
                      value={formData.businessAddress}
                      onChange={(e) =>
                        handleInputChange('businessAddress', e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Operating Hours
                    </Label>
                    <div className="text-gray-400 text-sm">
                      Mon-Sat: 8:00 AM - 8:00 PM
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="websiteUrl"
                      className="text-white flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Website URL
                    </Label>
                    <Input
                      id="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        handleInputChange('websiteUrl', e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white">Social Media</Label>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        <Input
                          value={formData.instagramHandle}
                          onChange={(e) =>
                            handleInputChange('instagramHandle', e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="@username"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Facebook className="w-4 h-4 text-blue-500" />
                        <Input
                          value={formData.facebookHandle}
                          onChange={(e) =>
                            handleInputChange('facebookHandle', e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Page name"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Twitter className="w-4 h-4 text-blue-400" />
                        <Input
                          value={formData.twitterHandle}
                          onChange={(e) =>
                            handleInputChange('twitterHandle', e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Description */}
              <div className="space-y-2">
                <Label htmlFor="storeDescription" className="text-white">
                  Store Description
                </Label>
                <Textarea
                  id="storeDescription"
                  value={formData.storeDescription}
                  onChange={(e) =>
                    handleInputChange('storeDescription', e.target.value)
                  }
                  className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  placeholder="Describe your business..."
                />
              </div>

              {/* Store Features */}
              <div className="space-y-4">
                <Label className="text-white text-lg">Store Features</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="deliveryAvailable"
                      checked={formData.features.deliveryAvailable}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(
                          'deliveryAvailable',
                          checked as boolean
                        )
                      }
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="deliveryAvailable" className="text-white">
                      Delivery Available
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStorePickup"
                      checked={formData.features.inStorePickup}
                      onCheckedChange={(checked) =>
                        handleFeatureChange('inStorePickup', checked as boolean)
                      }
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="inStorePickup" className="text-white">
                      In-store Pickup
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="blackOwnedBusiness"
                      checked={formData.features.blackOwnedBusiness}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(
                          'blackOwnedBusiness',
                          checked as boolean
                        )
                      }
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="blackOwnedBusiness" className="text-white">
                      Black-owned Business
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="communityPartner"
                      checked={formData.features.communityPartner}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(
                          'communityPartner',
                          checked as boolean
                        )
                      }
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="communityPartner" className="text-white">
                      Community Partner
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptEBT"
                      checked={formData.features.acceptEBT}
                      onCheckedChange={(checked) =>
                        handleFeatureChange('acceptEBT', checked as boolean)
                      }
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="acceptEBT" className="text-white">
                      Accept EBT
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wheelchairAccessible"
                      checked={formData.features.wheelchairAccessible}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(
                          'wheelchairAccessible',
                          checked as boolean
                        )
                      }
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor="wheelchairAccessible"
                      className="text-white"
                    >
                      Wheelchair Accessible
                    </Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-400">
                  Documents section coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-400">Banking section coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-400">Settings section coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MerchantProfilePage
