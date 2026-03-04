'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { User, CreditCard, FileText, ShoppingBag, Settings, Upload, Camera, Shield, Bell } from 'lucide-react'
import Link from 'next/link'

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  profileImage?: string
  createdAt: string
}

function AccountPageContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabParam || 'profile')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('lux_user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        const updatedUser = { ...userData, profileImage: base64String }
        localStorage.setItem('lux_user', JSON.stringify(updatedUser))
        setUserData(updatedUser as UserData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    const updatedUser = { ...userData, ...formData }
    localStorage.setItem('lux_user', JSON.stringify(updatedUser))
    setUserData(updatedUser as UserData)
    setIsEditing(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'portfolio', label: 'Portfolio', icon: ShoppingBag },
    { id: 'orders', label: 'Order History', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-primary-dark">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-white/60 mt-2">Manage your account, portfolio, and preferences</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-xl">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-zinc-800 text-success border border-zinc-700'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white/5 border border-white/10 rounded-lg backdrop-blur-xl">
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                  
                  {/* Profile Image */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-white/80 mb-4">Profile Picture</label>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        {userData?.profileImage ? (
                          <img
                            src={userData.profileImage}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
                            <User size={40} className="text-success" />
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 w-8 h-8 bg-success rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all">
                          <Camera size={16} className="text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {userData?.firstName} {userData?.lastName}
                        </h3>
                        <p className="text-sm text-white/60">{userData?.email}</p>
                        <p className="text-xs text-success mt-1">Demo Account</p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zinc-500 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zinc-500 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zinc-500 disabled:opacity-50"
                      />
                      <p className="text-xs text-white/50 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-zinc-500 disabled:opacity-50"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSaveProfile}
                            className="px-6 py-2 bg-cta text-cta-text rounded-lg hover:bg-white transition-all"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-2 bg-cta text-cta-text rounded-lg hover:bg-white transition-all"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Account Created */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-sm text-white/60">
                      Account created: {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Portfolio</h2>
                  <PortfolioView />
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                  <OrderHistoryView />
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Billing & Payments</h2>
                  <BillingView />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                  <SettingsView />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

function PortfolioView() {
  const [portfolio, setPortfolio] = useState<any>(null)

  useEffect(() => {
    const storedPortfolio = localStorage.getItem('lux_portfolio')
    if (storedPortfolio) {
      setPortfolio(JSON.parse(storedPortfolio))
    } else {
      // Initialize demo portfolio
      const initialPortfolio = {
        cash: 100000,
        holdings: []
      }
      localStorage.setItem('lux_portfolio', JSON.stringify(initialPortfolio))
      setPortfolio(initialPortfolio)
    }
  }, [])

  const totalValue = portfolio ? 
    portfolio.cash + portfolio.holdings.reduce((sum: number, h: any) => sum + (h.quantity * h.currentPrice), 0) 
    : 0

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <p className="text-sm text-white/60 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <p className="text-sm text-white/60 mb-1">Cash Balance</p>
          <p className="text-2xl font-bold text-white">${portfolio?.cash.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <p className="text-sm text-white/60 mb-1">Holdings Value</p>
          <p className="text-2xl font-bold text-white">
            ${portfolio?.holdings.reduce((sum: number, h: any) => sum + (h.quantity * h.currentPrice), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Holdings Table */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Your Holdings</h3>
        {portfolio?.holdings.length > 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Symbol</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">Avg Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">Current Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">Total Value</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">P/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {portfolio.holdings.map((holding: any, index: number) => {
                  const totalValue = holding.quantity * holding.currentPrice
                  const totalCost = holding.quantity * holding.averagePrice
                  const profitLoss = totalValue - totalCost
                  const profitLossPercent = ((profitLoss / totalCost) * 100).toFixed(2)

                  return (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-sm font-medium text-white">{holding.symbol}</td>
                      <td className="px-4 py-3 text-sm text-white/80 text-right">{holding.quantity}</td>
                      <td className="px-4 py-3 text-sm text-white/80 text-right">${holding.averagePrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-white/80 text-right">${holding.currentPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-white text-right">${totalValue.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${profitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                        {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)} ({profitLossPercent}%)
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
            <ShoppingBag size={48} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/60 mb-4">No holdings yet. Start trading to build your portfolio!</p>
            <Link
              href="/trade"
              className="inline-block px-6 py-2 bg-cta text-cta-text rounded-lg hover:bg-white transition-all"
            >
              Start Trading
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function OrderHistoryView() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem('lux_orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  return (
    <div>
      {orders.length > 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Symbol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase">Type</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase">Total</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white/60 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-sm text-white/80">
                    {new Date(order.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{order.symbol}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.type === 'buy' ? 'bg-zinc-800 text-success' : 'bg-danger/20 text-danger'
                    }`}>
                      {order.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white/80 text-right">{order.quantity}</td>
                  <td className="px-4 py-3 text-sm text-white/80 text-right">${order.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-white text-right">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-zinc-800 text-success">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
          <FileText size={48} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/60 mb-4">No orders yet. Start trading to see your order history!</p>
          <Link
            href="/trade"
            className="inline-block px-6 py-2 bg-cta text-cta-text rounded-lg hover:bg-white transition-all"
          >
            Start Trading
          </Link>
        </div>
      )}
    </div>
  )
}

function BillingView() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-white">Demo Account</p>
            <p className="text-sm text-white/60 mt-1">Free forever - No credit card required</p>
          </div>
          <a
            href="mailto:support@lux.exchange?subject=Upgrade to Real Trading Account"
            className="px-6 py-2 bg-cta text-cta-text rounded-lg hover:bg-white transition-all"
          >
            Upgrade to Real Account
          </a>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">Lux Pro Trader</h4>
            <p className="text-3xl font-bold text-white mb-1">$49<span className="text-sm font-normal text-white/60">/mo</span></p>
            <p className="text-sm text-white/60 mb-4">For individual traders</p>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> Real-time market data
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> Advanced charting
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> 24/7 support
              </li>
            </ul>
            <a
              href="mailto:sales@lux.exchange?subject=Interested in Pro Trader Plan"
              className="block w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-center"
            >
              Contact Sales
            </a>
          </div>

          <div className="bg-white/5 border-2 border-success rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 bg-cta text-cta-text text-xs font-bold rounded-full">POPULAR</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Lux Elite Pro Trader</h4>
            <p className="text-3xl font-bold text-white mb-1">$199<span className="text-sm font-normal text-white/60">/mo</span></p>
            <p className="text-sm text-white/60 mb-4">For professional traders</p>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> Everything in Pro
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> API access
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> Priority execution
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> Dedicated support
              </li>
            </ul>
            <a
              href="mailto:sales@lux.exchange?subject=Interested in Elite Pro Trader Plan"
              className="block w-full px-4 py-2 bg-cta text-cta-text rounded-lg hover:bg-white transition-all text-center"
            >
              Contact Sales
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">Institutional</h4>
            <p className="text-3xl font-bold text-white mb-1">Custom</p>
            <p className="text-sm text-white/60 mb-4">For institutions</p>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> Everything in Elite
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> White-label options
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> Custom integrations
              </li>
              <li className="text-sm text-white/80 flex items-start gap-2">
                <span className="text-success">✓</span> SLA guarantees
              </li>
            </ul>
            <a
              href="mailto:sales@lux.exchange?subject=Interested in Institutional Plan"
              className="block w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-center"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
        <div className="text-center py-8">
          <CreditCard size={48} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/60">No payment method on file</p>
          <p className="text-sm text-white/40 mt-2">Upgrade to a paid plan to add payment details</p>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Invoice History</h3>
        <div className="text-center py-8">
          <FileText size={48} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/60">No invoices yet</p>
          <p className="text-sm text-white/40 mt-2">Your invoices will appear here</p>
        </div>
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield size={20} />
          Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div>
              <p className="text-white font-medium">Change Password</p>
              <p className="text-sm text-white/60">Update your account password</p>
            </div>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-white/60">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell size={20} />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div>
              <p className="text-white font-medium">Trade Confirmations</p>
              <p className="text-sm text-white/60">Get notified when orders are executed</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div>
              <p className="text-white font-medium">Price Alerts</p>
              <p className="text-sm text-white/60">Receive alerts for price movements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">Marketing Emails</p>
              <p className="text-sm text-white/60">Receive updates and promotions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-danger/10 border border-danger/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-danger mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-sm text-white/60">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-primary via-primary to-primary-dark flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <AccountPageContent />
    </Suspense>
  )
}
