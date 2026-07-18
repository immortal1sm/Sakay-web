import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../../layout/TopBar'
import Footer from '../../layout/Footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from '../../context/ThemeContext';
import {
  Smartphone,
  Apple,
  Car,
  MapPin,
  Clock,
  ChevronRight,
  Users,
  Navigation,
  Star,
  Award,
  Building2,
  CheckCircle2,
  Megaphone,
  AlertCircle,
  Info,
  Calendar,
  ArrowRight
} from 'lucide-react'
import jeepneyImage from '../../assets/images/image.png'
import api from '../../util/axios'

const Home = () => {
  const { effectiveTheme } = useTheme()
  const isDark = effectiveTheme === 'dark'
  const [downloading, setDownloading] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true)

  // Actual APK link from Google Drive
  const apkUrl = 'https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl'

  // Fetch announcements
  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcements')
      setAnnouncements(response.data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoadingAnnouncements(false)
    }
  }

  const handleAndroidDownload = () => {
    setDownloading(true)
    const link = document.createElement('a')
    link.href = apkUrl
    link.download = 'Jodally-1.2.1.apk'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setDownloading(false), 2000)
  }

  const handleiOSDownload = () => {
    alert('iOS app is coming soon! Stay tuned for updates.')
  }

  // Get priority color and styles
  const getPriorityStyles = (priority) => {
    switch(priority) {
      case 'urgent':
        return {
          bg: isDark ? 'bg-red-950/50' : 'bg-red-50',
          border: 'border-l-4 border-l-red-500',
          badge: isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700',
          icon: <AlertCircle className="w-4 h-4" />,
          gradient: isDark ? 'from-red-950/50 to-red-900/30' : 'from-red-50 to-red-100'
        }
      case 'high':
        return {
          bg: isDark ? 'bg-orange-950/50' : 'bg-orange-50',
          border: 'border-l-4 border-l-orange-500',
          badge: isDark ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700',
          icon: <AlertCircle className="w-4 h-4" />,
          gradient: isDark ? 'from-orange-950/50 to-orange-900/30' : 'from-orange-50 to-orange-100'
        }
      default:
        return {
          bg: isDark ? 'bg-blue-950/50' : 'bg-blue-50',
          border: '',
          badge: isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700',
          icon: <Info className="w-4 h-4" />,
          gradient: isDark ? 'from-blue-950/50 to-blue-900/30' : 'from-blue-50 to-blue-100'
        }
    }
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  // Limit announcements to show only latest 3 on homepage
  const latestAnnouncements = announcements.slice(0, 3)

  return (
    <div className={`min-h-screen overflow-x-hidden font-sans ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
      <TopBar />

      {/* Hero Section */}
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24"
      >

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[120px] rounded-full ${isDark ? 'bg-grab-green/10' : 'bg-grab-green/5'}`} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">

            {/* Left Column */}
            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >

              {/* Main Heading */}
              <h1 className={`font-black leading-[1.1] ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
                  Biyaheng
                </span>
                <span className="block text-grab-green italic text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mt-2">
                  Swabe,
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mt-2">
                  Kahit Saan.
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg sm:text-xl lg:text-2xl max-w-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                A transportation app designed for Filipino commuters. Book jeepneys, track arrivals in real-time, and plan your routes efficiently.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleiOSDownload}
                  className={`h-14 sm:h-16 px-6 sm:px-8 rounded-xl sm:rounded-2xl flex items-center gap-3 w-full sm:w-auto text-base sm:text-lg ${isDark ? 'bg-gray-600 hover:bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                >
                  <Apple className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold leading-none opacity-80">Coming Soon</p>
                    <p className="text-base sm:text-lg font-black leading-tight">iOS</p>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto sm:ml-2 opacity-60" />
                </Button>

                <Button
                  onClick={handleAndroidDownload}
                  disabled={downloading}
                  className="bg-grab-green hover:bg-grab-green/90 text-white h-14 sm:h-16 px-6 sm:px-8 rounded-xl sm:rounded-2xl flex items-center gap-3 w-full sm:w-auto text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-wait"
                >
                  <Smartphone className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold leading-none opacity-80">
                      {downloading ? 'Downloading...' : 'Download for'}
                    </p>
                    <p className="text-base sm:text-lg font-black leading-tight">
                      {downloading ? 'Please wait' : 'Android'}
                    </p>
                  </div>
                  {!downloading && <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto sm:ml-2 opacity-60" />}
                </Button>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={fadeInRight}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center perspective-1200"
            >

              {/* Floating Stats Cards */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -top-5 left-0 hidden sm:block"
                >
                  <Card className={`px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardContent className="p-0 flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-grab-green/10 rounded-xl flex items-center justify-center">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-grab-green" />
                      </div>
                      <div>
                        <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Users</p>
                        <p className={`text-sm sm:text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>50k+</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-20 -right-5 hidden md:block"
                >
                  <Card className={`px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardContent className="p-0 flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Wait Time</p>
                        <p className={`text-sm sm:text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>3-5 mins</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Jeepney Image */}
              <div className="animate-jeepney-arrival relative z-20">
                <div className="absolute inset-0 bg-grab-green/20 blur-3xl rounded-full scale-110" />
                <img
                  src={jeepneyImage}
                  alt="SakayNE Jeepney"
                  className="w-full max-w-[350px] xs:max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] xl:max-w-[600px] drop-shadow-2xl relative z-10"
                />
              </div>
            </motion.div>
          </div>

          {/* ========== ANNOUNCEMENTS SECTION ========== */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-24 lg:mb-32"
          >
            <div className="text-center mb-12">
              <Badge className="bg-grab-green/10 border-grab-green/20 text-grab-green px-4 py-2 rounded-full mb-4">
                <Megaphone className="w-4 h-4 mr-2" />
                LATEST UPDATES
              </Badge>
              <h2 className={`text-3xl sm:text-4xl font-bold max-w-2xl mx-auto ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                Announcements & News
              </h2>
              <p className={`mt-4 max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Stay updated with the latest news, updates, and announcements from SakayNE
              </p>
            </div>

            {loadingAnnouncements ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
              </div>
            ) : announcements.length === 0 ? (
              <Card className={`border-0 shadow-lg ${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-50 to-gray-100'}`}>
                <CardContent className="p-12 text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <Megaphone className={`w-10 h-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No announcements yet.</p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Check back later for updates!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestAnnouncements.map((announcement, index) => {
                  const priorityStyle = getPriorityStyles(announcement.priority)
                  return (
                    <motion.div
                      key={announcement._id}
                      variants={scaleIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-gradient-to-br ${priorityStyle.gradient}`}>
                        <CardContent className="p-0">
                          {/* Priority Ribbon */}
                          {announcement.priority === 'urgent' && (
                            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 text-center">
                              URGENT ANNOUNCEMENT
                            </div>
                          )}
                          
                          <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                              <div className={`p-2 rounded-xl ${priorityStyle.badge}`}>
                                {priorityStyle.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className={`font-bold text-lg line-clamp-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                  {announcement.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Calendar className={`w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {new Date(announcement.createdAt).toLocaleDateString('en-PH', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <p className={`text-sm leading-relaxed line-clamp-3 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {announcement.content}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <Badge className={priorityStyle.badge}>
                                {announcement.priority === 'urgent' ? 'Urgent' : announcement.priority === 'high' ? 'High Priority' : 'Normal'}
                              </Badge>
                              <button className="text-grab-green text-sm font-medium hover:text-grab-dark transition-colors flex items-center gap-1">
                                Read more <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* View All Button */}
            {announcements.length > 3 && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  className={`text-grab-green transition-all duration-300 ${isDark ? 'border-grab-green hover:bg-grab-green hover:text-gray-900' : 'border-grab-green hover:bg-grab-green hover:text-white'}`}
                  onClick={() => window.location.href = '/announcements'}
                >
                  View All Announcements
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32"
          >
            <div className="text-center mb-12">
              <Badge className="bg-grab-green/10 border-grab-green/20 text-grab-green px-4 py-2 rounded-full mb-4">
                <Star className="w-4 h-4 mr-2" />
                HOW IT WORKS
              </Badge>
              <h2 className={`text-3xl sm:text-4xl font-bold max-w-2xl mx-auto ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                Book a jeepney in three simple steps
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  step: '01',
                  title: 'Set your location',
                  desc: 'Enter your pickup point and destination. Choose from available jeepney routes.'
                },
                {
                  step: '02',
                  title: 'Book your seat',
                  desc: 'Select your preferred time and secure your seat in advance.'
                },
                {
                  step: '03',
                  title: 'Track and ride',
                  desc: 'Monitor your jeepney in real-time and get notified when it arrives.'
                }
              ].map((item, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-grab-green/20 mb-4">{item.step}</div>
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{item.title}</h3>
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left - Features List */}
              <div className="space-y-6">
                <div>
                  <Badge className="bg-grab-green/10 border-grab-green/20 text-grab-green px-4 py-2 rounded-full mb-4">
                    <Award className="w-4 h-4 mr-2" />
                    KEY FEATURES
                  </Badge>
                  <h2 className={`text-3xl sm:text-4xl font-bold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    Everything you need for a <span className="text-grab-green">smooth</span> commute
                  </h2>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="space-y-4"
                >
                  {[
                    {
                      icon: Navigation,
                      title: 'Real-time Vehicle Tracking',
                      desc: 'Track the exact location of your jeepney and know exactly when it will arrive.'
                    },
                    {
                      icon: Clock,
                      title: 'Ride Booking System',
                      desc: 'Reserve your seat in advance. Avoid long queues and ensure you have a ride.'
                    },
                    {
                      icon: MapPin,
                      title: 'Route Information',
                      desc: 'View detailed route maps, designated stops, and estimated travel times before you ride.'
                    },
                    {
                      icon: Building2,
                      title: 'Multiple Routes',
                      desc: 'Access jeepney routes across Metro Manila and nearby provinces.'
                    }
                  ].map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <motion.div key={index} variants={fadeInLeft} className="flex gap-4 group">
                        <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-grab-green/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-grab-green" />
                        </div>
                        <div>
                          <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{feature.title}</h4>
                          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Right - App Preview */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-grab-green/10 to-blue-500/10 rounded-3xl blur-3xl" />
                <Card className={`relative p-6 rounded-2xl shadow-2xl border-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardContent className="p-0">
                    <div className="space-y-3">
                      {[
                        { location: 'Central Luzon State University', time: '2 mins', eta: '2:45 PM' },
                        { location: 'SM City Cabanatuan', time: '5 mins', eta: '2:48 PM' },
                        { location: 'Robinsons Malolos', time: '8 mins', eta: '2:51 PM' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-grab-green" />
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.location}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-grab-green">{item.time}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA {item.eta}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                      <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <CheckCircle2 className="w-3 h-3 inline-block text-grab-green mr-1" />
                        Live tracking available. Real-time updates every 5 seconds.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* For Drivers Section */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32"
          >
            <Card className={`border-0 overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <motion.div variants={fadeInLeft}>
                      <Badge className="bg-white/10 border-white/20 text-white px-4 py-2 rounded-full">
                        <Car className="w-4 h-4 mr-2" />
                        FOR DRIVERS
                      </Badge>
                    </motion.div>
                    <motion.h2 variants={fadeInLeft} className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      Join our growing network of jeepney drivers
                    </motion.h2>
                    <motion.p variants={fadeInLeft} className="text-gray-300 leading-relaxed">
                      Partner with SakayNE to reach more passengers, optimize your routes, and reduce idle time.
                    </motion.p>

                    <motion.div
                      variants={staggerContainer}
                      className="grid grid-cols-2 gap-6 pt-4"
                    >
                      {[
                        { value: '2,000+', label: 'Active Drivers' },
                        { value: '30%', label: 'Less Idle Time' },
                        { value: 'Free', label: 'Registration' },
                        { value: '24/7', label: 'Support' }
                      ].map((stat, index) => (
                        <motion.div key={index} variants={scaleIn}>
                          <div className="text-2xl font-bold text-grab-green">{stat.value}</div>
                          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Button className="mt-4 bg-grab-green hover:bg-grab-green/90 text-white h-12 px-6 rounded-xl">
                        How to Apply as Driver?
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={fadeInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-grab-green/10 blur-3xl rounded-full" />
                    <Card className={`relative backdrop-blur-sm border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/5 border-white/10'}`}>
                      <CardContent className="p-6">
                        <h3 className="text-white font-bold mb-4">Driver Requirements</h3>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center gap-2 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Valid driver's license (Professional)
                          </li>
                          <li className="flex items-center gap-2 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            LTFRB franchise / permit
                          </li>
                          <li className="flex items-center gap-2 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Government-issued ID
                          </li>
                          <li className="flex items-center gap-2 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-grab-green" />
                            Smartphone with data plan
                          </li>
                        </ul>

                        <div className="mt-6 pt-4 border-t border-white/10">
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            For inquiries: drivers@sakay.ph | (02) 1234 5679
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-24 sm:mt-28 lg:mt-32 text-center"
          >
            <h2 className={`text-3xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              Ready to try SakayNE?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Download the app and experience a more convenient way to commute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleiOSDownload}
                className={`h-14 px-8 rounded-xl flex items-center gap-3 text-lg ${isDark ? 'bg-gray-600 hover:bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-600 cursor-not-allowed'}`}
              >
                <Apple className="w-6 h-6" />
                <span>Coming Soon</span>
              </Button>
              <Button
                onClick={handleAndroidDownload}
                className="bg-grab-green hover:bg-grab-green/90 text-white h-14 px-8 rounded-xl flex items-center gap-3 text-lg shadow-xl shadow-grab-green/20 hover:shadow-2xl transition-all"
              >
                <Smartphone className="w-6 h-6" />
                <span>Download for Android</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />

      <style>{`
        @keyframes jeepney-arrival {
          0% { transform: translateX(150%) scale(0.7); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-jeepney-arrival { animation: jeepney-arrival 1.5s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .perspective-1200 { perspective: 1200px; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        }
      `}</style>
    </div>
  )
}

export default Home
