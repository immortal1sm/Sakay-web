import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    Smartphone,
    MapPin,
    Calendar,
    Navigation,
    CreditCard,
    UserCheck,
    CheckCircle2,
    Clock,
    Shield,
    Users,
    Car,
    TrendingUp
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from '../context/ThemeContext'

const HowItWorks = ({ isOpen, onClose }) => {
  const { effectiveTheme } = useTheme()
  const isDark = effectiveTheme === 'dark'

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const steps = [
    {
      number: '01',
      title: 'Download the App',
      description: 'Get the SAKAY app from our website. Choose between Android APK or iOS IPA files.',
      icon: Smartphone,
    },
    {
      number: '02',
      title: 'Create Your Account',
      description: 'Sign up using your email. Choose whether you\'re a passenger or a driver.',
      icon: UserCheck,
    },
    {
      number: '03',
      title: 'Set Your Location',
      description: 'Allow location access so the app can find jeepneys near you.',
      icon: MapPin,
    },
    {
      number: '04',
      title: 'Book Your Ride',
      description: 'Choose your preferred jeepney, select your seat, and confirm your booking.',
      icon: Calendar,
    },
    {
      number: '05',
      title: 'Track Your Jeepney',
      description: 'Watch your jeepney\'s real-time location on the map.',
      icon: Navigation,
    },
    {
      number: '06',
      title: 'Ride and Pay',
      description: 'Board your jeepney and pay the driver directly.',
      icon: CreditCard,
    }
  ]

  const benefits = [
    { icon: Clock, title: 'Save Time', desc: 'No more waiting for hours' },
    { icon: Shield, title: 'Safe Rides', desc: 'Verified drivers' },
    { icon: Users, title: 'More Passengers', desc: 'For drivers' },
    { icon: TrendingUp, title: 'Higher Earnings', desc: 'For drivers' }
  ]

  // Actual APK link from Google Drive
  const apkUrl = 'https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl'

  const handleAndroidDownload = () => {
    const link = document.createElement('a')
    link.href = apkUrl
    link.download = 'Jodally-1.2.1.apk'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            {/* Header */}
            <div className={`sticky top-0 px-6 py-4 flex items-center justify-between z-10 ${isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-grab-green" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>How It Works</h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Get started with SAKAY in 6 easy steps</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6 space-y-8">

              {/* Quick Download Button */}
              <div className={`rounded-xl p-4 flex items-center justify-between ${isDark ? 'bg-grab-green/10' : 'bg-grab-green/10'}`}>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Ready to start?</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Download the app now</p>
                </div>
                <Button
                  onClick={handleAndroidDownload}
                  className="bg-grab-green hover:bg-grab-green/90 text-white"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Download APK
                </Button>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>6 Easy Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {steps.map((step, index) => {
                    const IconComponent = step.icon
                    return (
                      <div key={index} className={`flex gap-3 p-3 rounded-xl hover:shadow-md transition-shadow ${isDark ? 'bg-gray-700/60' : 'bg-gray-50'}`}>
                        <div className="w-10 h-10 bg-grab-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-grab-green">{step.number}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-4 h-4 text-grab-green" />
                            <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h4>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Benefits for Passengers & Drivers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* For Passengers */}
                <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-700/60' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-grab-green" />
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>For Passengers</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      Book rides in advance
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      Real-time tracking
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      View vehicle capacity
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      Safe & secure rides
                    </li>
                  </ul>
                </div>

                {/* For Drivers */}
                <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-700/60' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="w-5 h-5 text-grab-green" />
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>For Drivers</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      More passengers
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      Less waiting time
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      Higher daily earnings
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-grab-green" />
                      Smarter route planning
                    </li>
                  </ul>
                </div>
              </div>

              {/* Need Help */}
              <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-grab-green/10' : 'bg-grab-green/5'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Need more help?{' '}
                  <button onClick={() => {
                    onClose()
                    // You can add logic to open Help modal here
                    alert('Please click the Help button on the top bar for more assistance.')
                  }} className="text-grab-green hover:underline font-medium">
                    contact us
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HowItWorks
