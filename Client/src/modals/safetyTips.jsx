import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, AlertTriangle, Car, MapPin, Phone, Bell, Users, Eye, Clock, CheckCircle2, HeartHandshake, Smartphone, UserCheck, AlertOctagon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const SafetyTipsModal = ({ isOpen, onClose }) => {
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

  const safetyTips = {
    passengers: [
      {
        icon: MapPin,
        title: 'Share Your Trip',
        description: 'Share your ride details with family or friends. Let them know your route, driver details, and estimated arrival time.'
      },
      {
        icon: UserCheck,
        title: 'Verify Driver Details',
        description: 'Before boarding, check that the driver\'s name and vehicle details match what\'s shown in the app.'
      },
      {
        icon: Clock,
        title: 'Check Seat Capacity',
        description: 'Avoid overcrowded jeepneys. Book in advance to ensure you have a reserved seat.'
      },
      {
        icon: Eye,
        title: 'Stay Alert',
        description: 'Be aware of your surroundings. Keep your belongings secure and avoid using your phone while boarding.'
      },
      {
        icon: Bell,
        title: 'Use Emergency Button',
        description: 'The app has an emergency button that alerts authorities and your emergency contacts.'
      },
      {
        icon: Shield,
        title: 'Rate Your Ride',
        description: 'After each trip, rate your experience. This helps maintain quality and safety standards.'
      }
    ],
    drivers: [
      {
        icon: Car,
        title: 'Regular Vehicle Maintenance',
        description: 'Ensure your jeepney is in good condition. Regular check-ups prevent accidents and breakdowns.'
      },
      {
        icon: Clock,
        title: 'Avoid Fatigue Driving',
        description: 'Take regular breaks. Driving while tired increases the risk of accidents.'
      },
      {
        icon: AlertTriangle,
        title: 'Follow Traffic Rules',
        description: 'Always obey traffic laws. Avoid overspeeding and reckless driving to ensure everyone\'s safety.'
      },
      {
        icon: Users,
        title: 'Don\'t Overload',
        description: 'Respect passenger capacity. Overloading is dangerous and against the law.'
      },
      {
        icon: Phone,
        title: 'No Phone While Driving',
        description: 'Follow the Anti-Distracted Driving Act. Use the app only when safely parked.'
      },
      {
        icon: HeartHandshake,
        title: 'Treat Passengers with Respect',
        description: 'Provide a safe and comfortable ride. Report any issues through the app if needed.'
      }
    ],
    general: [
      {
        icon: Smartphone,
        title: 'Keep Your App Updated',
        description: 'Always use the latest version of SAKAY to access the newest safety features.'
      },
      {
        icon: Shield,
        title: 'Verify Your Account',
        description: 'Complete your profile verification to ensure a safer community for everyone.'
      },
      {
        icon: AlertOctagon,
        title: 'Report Suspicious Activity',
        description: 'Use the in-app report feature to flag any safety concerns or suspicious behavior.'
      },
      {
        icon: HeartHandshake,
        title: 'Emergency Contacts',
        description: 'Save emergency contacts in your profile. They will be notified during emergencies.'
      }
    ]
  }

  const emergencyNumbers = [
    { name: 'National Emergency Hotline', number: '911', color: 'red' },
    { name: 'PNP Hotline', number: '117', color: 'blue' },
    { name: 'MMDA (Metro Manila)', number: '136', color: 'orange' },
    { name: 'Philippine Red Cross', number: '143', color: 'red' }
  ]

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
            className={`relative w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            {/* Header */}
            <div className={`sticky top-0 px-6 py-4 flex items-center justify-between z-10 ${isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-grab-green" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Safety Tips</h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your safety is our priority</p>
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

              {/* Emergency Numbers Banner */}
              <div className={isDark ? 'bg-red-900/30 border border-red-800 rounded-xl p-4' : 'bg-red-50 border border-red-200 rounded-xl p-4'}>
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <h3 className={isDark ? 'font-bold text-red-400' : 'font-bold text-red-700'}>Emergency Numbers</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {emergencyNumbers.map((item, index) => (
                    <div key={index} className="text-center">
                      <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>{item.number}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Passengers */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-grab-green" />
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>For Passengers</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {safetyTips.passengers.map((tip, index) => {
                    const IconComponent = tip.icon
                    return (
                      <div key={index} className={`rounded-xl p-4 hover:shadow-md transition-shadow ${isDark ? 'bg-gray-700/60' : 'bg-gray-50'}`}>
                        <div className="w-10 h-10 bg-grab-green/10 rounded-lg flex items-center justify-center mb-3">
                          <IconComponent className="w-5 h-5 text-grab-green" />
                        </div>
                        <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{tip.title}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tip.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* For Drivers */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Car className="w-5 h-5 text-grab-green" />
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>For Drivers</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {safetyTips.drivers.map((tip, index) => {
                    const IconComponent = tip.icon
                    return (
                      <div key={index} className={`rounded-xl p-4 hover:shadow-md transition-shadow ${isDark ? 'bg-gray-700/60' : 'bg-gray-50'}`}>
                        <div className="w-10 h-10 bg-grab-green/10 rounded-lg flex items-center justify-center mb-3">
                          <IconComponent className="w-5 h-5 text-grab-green" />
                        </div>
                        <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{tip.title}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tip.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* General Tips */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-grab-green" />
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>General Safety Tips</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {safetyTips.general.map((tip, index) => {
                    const IconComponent = tip.icon
                    return (
                      <div key={index} className={`rounded-xl p-4 hover:shadow-md transition-shadow ${isDark ? 'bg-gray-700/60' : 'bg-gray-50'}`}>
                        <div className="w-10 h-10 bg-grab-green/10 rounded-lg flex items-center justify-center mb-3">
                          <IconComponent className="w-5 h-5 text-grab-green" />
                        </div>
                        <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{tip.title}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tip.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Reminder */}
              <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-grab-green/10 border border-grab-green/30' : 'bg-grab-green/5 border border-grab-green/20'}`}>
                <CheckCircle2 className="w-8 h-8 text-grab-green mx-auto mb-2" />
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Remember: Your safety is our priority. If you feel unsafe at any time, use the in-app
                  emergency button or call the emergency hotline immediately.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SafetyTipsModal
