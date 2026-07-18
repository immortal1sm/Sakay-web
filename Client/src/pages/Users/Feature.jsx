import React from 'react'
import { motion } from 'framer-motion'
import TopBar from '../../layout/TopBar'
import Footer from '../../layout/Footer'
import { useTheme } from '../../context/ThemeContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Smartphone,
  Apple,
  Car,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Navigation,
  Award,
  Coins,
  Building2,
  CheckCircle2,
  Ticket,
  Gift,
  Wallet,
  Bell,
  Route,
  Zap,
  Bus
} from 'lucide-react'

const Features = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  // Actual APK link from Google Drive
  const apkUrl = 'https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl'

  const handleAndroidDownload = () => {
    const link = document.createElement('a')
    link.href = apkUrl
    link.download = 'Jodally-1.2.1.apk'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleiOSDownload = () => {
    alert('iOS app is coming soon! Stay tuned for updates.')
  }

  // Core Features - Nationwide
  const coreFeatures = [
    {
      icon: Navigation,
      title: 'Real-time Vehicle Tracking',
      description: 'Track the exact location of your jeepney and know exactly when it will arrive. No more uncertain waiting times.',
      color: 'grab-green'
    },
    {
      icon: Clock,
      title: 'Ride Booking System',
      description: 'Reserve your seat in advance. Avoid long queues and ensure you have a ride, especially during peak hours.',
      color: 'grab-green'
    },
    {
      icon: MapPin,
      title: 'Route Information',
      description: 'View detailed route maps, designated stops, and estimated travel times before you ride. Plan your trip efficiently.',
      color: 'grab-green'
    },
    {
      icon: Building2,
      title: 'Multiple Routes',
      description: 'Access jeepney routes across Metro Manila and nearby provinces. Know which jeepney to take and where to get off.',
      color: 'grab-green'
    }
  ]

  // For Commuters
  const commuterFeatures = [
    {
      icon: Clock,
      title: 'Enhance Time Management',
      description: 'Optimize your schedule and allocate sufficient time for commuting while ensuring timely arrival at your destination.'
    },
    {
      icon: Navigation,
      title: 'Efficient Travel Planning',
      description: 'Book rides, view jeepney locations in real-time, and check capacity to avoid overcrowding.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure Rides',
      description: 'Ride with confidence. All drivers are verified, routes are tracked, and you can share your trip with loved ones.'
    },
    {
      icon: Award,
      title: 'Reliable Service',
      description: 'A dependable transportation solution that adapts to the evolving needs of Filipino commuters.'
    }
  ]

  // For Drivers
  const driverFeatures = [
    {
      icon: Users,
      title: 'Increase Passenger Flow',
      description: 'Connect directly with passengers to ensure a consistent flow of riders throughout the day.'
    },
    {
      icon: Clock,
      title: 'Reduce Waiting Time',
      description: 'Real-time updates help drivers reduce idle time spent waiting for passengers.'
    },
    {
      icon: TrendingUp,
      title: 'Higher Daily Earnings',
      description: 'A steady flow of passengers and more trips can lead to higher income for drivers.'
    },
    {
      icon: Route,
      title: 'Smarter Route Planning',
      description: 'Traffic detection features help drivers take alternative routes to avoid congestion.'
    }
  ]

  // Future Enhancements (from Chapter V)
  const futureFeatures = [
    {
      icon: Ticket,
      title: 'Seat Management with Geolocation',
      description: 'Automatically frees a reserved seat when a passenger has traveled at least 10 meters away from the jeepney when alighting.',
      color: 'purple'
    },
    {
      icon: Gift,
      title: 'Token System',
      description: 'Earn tokens through daily sign-in, referrals, and completing in-app challenges. Convert tokens to rewards.',
      color: 'orange'
    },
    {
      icon: Wallet,
      title: 'Cashless Transaction',
      description: 'Deposit funds in your in-app wallet. Settle fares without physical money. Automated refunds for canceled bookings.',
      color: 'blue'
    },
    {
      icon: Bell,
      title: 'Emergency Notification',
      description: 'Sends SMS notification to registered guardians in case of emergency. Includes jeepney details, driver name, and plate number.',
      color: 'red'
    },
    {
      icon: Coins,
      title: 'Fare Estimation',
      description: 'Get accurate fare estimates before you ride. No more overpricing or surprises.',
      color: 'green'
    },
    {
      icon: Bus,
      title: 'Multi-Transport Expansion',
      description: 'Future expansion to include all types of vehicles across the Philippines.',
      color: 'cyan'
    }
  ]

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-950" : "bg-white"} overflow-x-hidden font-sans`}>
      <TopBar />

      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${isDark ? "from-grab-green/10 via-gray-950 to-blue-900/10" : "from-grab-green/5 via-white to-blue-500/5"}`}>
        <div className={`absolute inset-0 ${isDark ? "bg-grid-white/5" : "bg-grid-gray-100"} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
              Everything you need for a{' '}
              <span className="bg-gradient-to-r from-grab-green to-grab-dark bg-clip-text text-transparent">
                seamless commute
              </span>
            </h1>
            <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
              From real-time tracking to advance booking, SakayNE provides all the tools you need
              for a hassle-free commuting experience across the Philippines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Core Features
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              Essential tools designed to make your daily commute efficient and stress-free
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-grab-green" />
                      </div>
                      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{feature.title}</h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* For Commuters Section */}
      <section className={`py-16 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 mb-4 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 mr-2" />
              FOR EVERY FILIPINO
            </Badge>
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Designed for every commuter
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              SakayNE helps you navigate the daily commute with confidence and convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                {commuterFeatures.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 bg-grab-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-grab-green" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{feature.title}</h3>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-grab-green/10 to-blue-500/10 rounded-3xl blur-3xl" />
              <Card className={`relative ${isDark ? "bg-gray-900" : "bg-white"} p-6 rounded-2xl shadow-2xl border-0`}>
                <CardContent className="p-0">
                  <div className="space-y-3">
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Commuters Benefits</h4>
                    <ul className="space-y-3">
                      {[
                        'Book rides in advance',
                        'View vehicle capacity',
                        'Real-time location tracking',
                        'Plan routes efficiently',
                        'Arrive on time'
                      ].map((benefit, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          <CheckCircle2 className="w-4 h-4 text-grab-green flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Drivers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 mb-4 px-4 py-2 rounded-full">
              <Car className="w-4 h-4 mr-2" />
              FOR DRIVERS
            </Badge>
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Empowering jeepney drivers
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              Modern technology that makes it easier and more convenient for jeepney drivers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {driverFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-grab-green" />
                      </div>
                      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{feature.title}</h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Driver Stats Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-grab-green/5 to-grab-dark/5 border-grab-green/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {[
                    { value: '95%', label: 'Would recommend to other drivers' },
                    { value: '89.7%', label: 'Would continue using the app' },
                    { value: '40%', label: 'Potential increase in earnings' }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold text-grab-green mb-2">{stat.value}</div>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Future Enhancements Section */}
      <section className={`py-16 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="bg-purple-100 text-purple-600 border-purple-200 mb-4 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 mr-2" />
              COMING SOON
            </Badge>
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Future Enhancements
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              Based on research and user feedback, we're developing these exciting features
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {futureFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              const colorClasses = isDark
                ? {
                    purple: 'bg-purple-900/30 text-purple-400',
                    orange: 'bg-orange-900/30 text-orange-400',
                    blue: 'bg-blue-900/30 text-blue-400',
                    red: 'bg-red-900/30 text-red-400',
                    green: 'bg-green-900/30 text-green-400',
                    cyan: 'bg-cyan-900/30 text-cyan-400'
                  }
                : {
                    purple: 'bg-purple-100 text-purple-600',
                    orange: 'bg-orange-100 text-orange-600',
                    blue: 'bg-blue-100 text-blue-600',
                    red: 'bg-red-100 text-red-600',
                    green: 'bg-green-100 text-green-600',
                    cyan: 'bg-cyan-100 text-cyan-600'
                  }
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${colorClasses[feature.color]} rounded-xl flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{feature.title}</h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{feature.description}</p>
                      <Badge variant="outline" className={`mt-4 ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"} border-0`}>
                        In Development
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Traditional vs. SakayNE
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              See how SakayNE transforms the traditional commuting experience
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Card className={`border-0 shadow-xl overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"}`}>
              <div className={`grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                <CardContent className="p-8">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6 text-center`}>Traditional Jeepney</h3>
                  <ul className="space-y-4">
                    {[
                      'Uncertain arrival times',
                      'Long waiting periods',
                      'Overcrowded rides',
                      'No advance booking',
                      'Unpredictable schedules',
                      'No real-time information'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-red-500 text-xs">✕</span>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardContent className={`p-8 ${isDark ? "bg-gradient-to-br from-grab-green/5 to-gray-900" : "bg-gradient-to-br from-grab-green/5 to-white"}`}>
                  <h3 className="text-xl font-bold text-grab-green mb-6 text-center">SakayNE App</h3>
                  <ul className="space-y-4">
                    {[
                      'Real-time tracking',
                      'Reduced waiting time (3-5 mins avg)',
                      'Seat reservation system',
                      'Book in advance',
                      'Scheduled trips',
                      'Live location updates'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        <CheckCircle2 className="w-5 h-5 text-grab-green flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-grab-green to-grab-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to experience the difference?
            </h2>
            <p className="text-xl text-white/80">
              Join thousands of Filipinos who already made the switch to SakayNE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={handleAndroidDownload}
                className={`${isDark ? "bg-gray-200 text-grab-green hover:bg-gray-300" : "bg-white text-grab-green hover:bg-gray-100"} h-14 px-8 rounded-xl text-lg font-bold`}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Download for Android
              </Button>
              <Button
                onClick={handleiOSDownload}
                className={`bg-gray-300 hover:bg-gray-400 text-gray-600 cursor-not-allowed h-14 px-8 rounded-xl text-lg font-bold`}
              >
                <Apple className="w-5 h-5 mr-2" />
                Coming Soon
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Features
