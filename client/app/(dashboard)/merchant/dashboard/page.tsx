'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Bell,
  DollarSign,
  Package,
  ShoppingCart,
  Calendar,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const MerchantDashboard = () => {

	const router = useRouter()
  const [notifications] = useState([
    {
      id: 1,
      message: 'New order received from John Smith',
      time: '2 hours ago',
      type: 'order',
    },
    {
      id: 2,
      message: 'Product inventory low: Organic Honey',
      time: '3 hours ago',
      type: 'inventory',
    },
    {
      id: 3,
      message: 'Weekly sales report is ready',
      time: '5 hours ago',
      type: 'report',
    },
  ])

  const salesData = [
    { day: 'Mon', sales: 2400 },
    { day: 'Tue', sales: 1200 },
    { day: 'Wed', sales: 3800 },
    { day: 'Thu', sales: 4200 },
    { day: 'Fri', sales: 5000 },
    { day: 'Sat', sales: 3600 },
    { day: 'Sun', sales: 4400 },
  ]

  const recentOrders = [
    {
      id: '#12345',
      customer: 'John Smith',
      amount: '$129.99',
      status: 'Completed',
    },
    {
      id: '#12346',
      customer: 'Sarah Johnson',
      amount: '$79.99',
      status: 'Pending',
    },
    {
      id: '#12347',
      customer: 'Michael Brown',
      amount: '$199.99',
      status: 'Completed',
    },
    {
      id: '#12348',
      customer: 'Emily Davis',
      amount: '$149.99',
      status: 'Pending',
    },
  ]

  const productImages = [
    '/images/add-product.png',
    '/images/add-product.png',
    '/images/add-product.png',
    '/images/add-product.png',
    '/images/add-product.png',
    '/images/add-product.png',
    '/images/add-product.png',
    '/images/add-product.png',
  ]

  const stats = [
    {
      title: "Today's Sales",
      value: '$1,245',
      change: '+12%',
      trend: 'up',
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: 'Weekly Sales',
      value: '$8,760',
      change: '+8%',
      trend: 'up',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: 'Monthly Sales',
      value: '$32,450',
      change: '-3%',
      trend: 'down',
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      title: 'Total Products',
      value: '86',
      change: '+5%',
      trend: 'up',
      icon: <Package className="w-5 h-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-[#1a1a1a] border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="text-gray-400">{stat.icon}</div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Product */}
        <div>
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Add New Product</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 " onClick={() => router.push('/merchant/products')}>
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-700"
                  >
                    <img
                      src={image || '/placeholder.svg'}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Order ID</TableHead>
                    <TableHead className="text-gray-400">Customer</TableHead>
                    <TableHead className="text-gray-400">Amount</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} className="border-gray-800">
                      <TableCell className="text-white font-medium">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.customer}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {order.amount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === 'Completed'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            order.status === 'Completed'
                              ? 'bg-green-600/20 text-green-400 border-green-600/30'
                              : 'bg-amber-600/20 text-amber-400 border-amber-600/30'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Notifications</CardTitle>
              <Bell className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 bg-[#2a2a2a] rounded-lg border border-gray-700"
                >
                  <p className="text-gray-300 text-sm">
                    {notification.message}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {notification.time}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MerchantDashboard
