import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../../layout/TopBar'
import Footer from '../../layout/Footer'
import { useTheme } from '../../context/ThemeContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Smartphone,
  Apple,
  Download,
  CheckCircle2,
  Clock,
  Github,
  Navigation,
  ExternalLink,
  QrCode,
  TrendingUp,
  MapPin
} from 'lucide-react'

// Import QR codes
import androidQr from "../../assets/qrCode/image.png";
import iosQr from "../../assets/qrCode/image.png";

const DownloadPage = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const [downloading, setDownloading] = useState(false)

  // Actual APK link from Google Drive
  const apkUrl = 'https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl'

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
    setDownloading(true)
    // iOS app is coming soon
    setTimeout(() => {
      setDownloading(false)
      alert('iOS app is coming soon! Stay tuned for updates.')
    }, 1000)
  }

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

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-950" : "bg-white"} overflow-x-hidden font-sans`}>
      <TopBar />

      {/* Hero Section - Modern Gradient */}
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
              Download{' '}
              <span className="bg-gradient-to-r from-grab-green to-grab-dark bg-clip-text text-transparent">
                "SakayNE"
              </span>
            </h1>
            <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
              Experience the future of commuting. Get the app now and transform your daily travel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Download Section with Tabs */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="android" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className={`${isDark ? "bg-gray-800" : "bg-gray-100"} p-1 rounded-xl`}>
                <TabsTrigger
                  value="android"
                  className="data-[state=active]:bg-grab-green data-[state=active]:text-white rounded-lg px-6 py-2.5"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Android
                </TabsTrigger>
                <TabsTrigger
                  value="ios"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-lg px-6 py-2.5"
                >
                  <Apple className="w-4 h-4 mr-2" />
                  iOS
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="android">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <Card className={`border-0 shadow-xl overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"}`}>
                  <div className="grid md:grid-cols-2">
                    {/* Left Side - QR Code with Badge */}
                    <div className={`bg-gradient-to-br ${isDark ? "from-grab-green/10 to-gray-800" : "from-grab-green/5 to-grab-green/10"} p-8 md:p-12`}>
                      <motion.div variants={fadeInLeft} className="text-center space-y-6">
                        <div className="relative inline-block">
                          <div className="absolute -inset-4 bg-grab-green/20 rounded-full blur-xl" />
                          <div className={`relative ${isDark ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl shadow-2xl`}>
                            <img
                              src={androidQr}
                              alt="Android QR Code"
                              className="w-56 h-56 mx-auto"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=224x224&data=https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl'
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <QrCode className="w-5 h-5 text-grab-green" />
                            <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>Scan to Download</span>
                          </div>
                          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>Open camera and scan QR code</p>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-grab-green">45 MB</p>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>File Size</p>
                          </div>
                          <div className={`w-px h-8 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
                          <div className="text-center">
                            <p className="text-2xl font-bold text-grab-green">1.2.1</p>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>Version</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Side - Download Options */}
                    <div className="p-8 md:p-12">
                      <motion.div variants={staggerContainer} className="space-y-8">
                        <div>
                          <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                            Download Android APK
                          </h3>
                          <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            Get the latest version of SakayNE for your Android device
                          </p>
                        </div>

                        <div className="space-y-4">
                          <motion.div variants={scaleIn}>
                            <div className={`group p-5 border-2 ${isDark ? "border-gray-700 hover:bg-grab-green/10" : "border-gray-200 hover:border-grab-green/50 hover:bg-grab-green/5"} rounded-2xl transition-all duration-300`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Download className="w-6 h-6 text-grab-green" />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Direct Download</h4>
                                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Download APK file directly</p>
                                  </div>
                                </div>
                                <Button
                                  onClick={handleAndroidDownload}
                                  disabled={downloading}
                                  size="lg"
                                  className="bg-grab-green hover:bg-grab-green/90 text-white px-6 rounded-xl"
                                >
                                  {downloading ? (
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                      Downloading...
                                    </div>
                                  ) : (
                                    'Download Now'
                                  )}
                                </Button>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div variants={scaleIn}>
                            <div className={`group p-5 border-2 ${isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:border-grab-green hover:bg-grab-green/5"} rounded-2xl transition-all duration-300`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 ${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Github className={`w-6 h-6 ${isDark ? "text-gray-300" : "text-gray-700"}`} />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>GitHub Release</h4>
                                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>View source code and releases</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="lg"
                                  className={`${isDark ? "border-gray-700 hover:bg-grab-green/10 hover:border-grab-green" : "border-gray-200 hover:border-grab-green hover:bg-grab-green/5"} rounded-xl`}
                                  onClick={() => window.open('https://github.com/yourusername/sakay/releases', '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Visit
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <Separator />

                        <div>
                          <h5 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>System Requirements</h5>
                          <ul className="space-y-2">
                            {[
                              'Android 8.0 (Oreo) and above',
                              '100 MB free storage space',
                              'Stable internet connection',
                              'Location services enabled'
                            ].map((req, i) => (
                              <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                <CheckCircle2 className="w-4 h-4 text-grab-green flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          By downloading, you agree to our{' '}
                          <a href="#" className="text-grab-green hover:underline">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-grab-green hover:underline">Privacy Policy</a>
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="ios">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <Card className={`border-0 shadow-xl overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"}`}>
                  <div className="grid md:grid-cols-2">
                    {/* Left Side - QR Code */}
                    <div className={`bg-gradient-to-br ${isDark ? "from-gray-800 to-gray-900" : "from-gray-50 to-gray-100"} p-8 md:p-12`}>
                      <motion.div variants={fadeInLeft} className="text-center space-y-6">
                        <div className="relative inline-block">
                          <div className="absolute -inset-4 bg-black/5 rounded-full blur-xl" />
                          <div className={`relative ${isDark ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl shadow-2xl`}>
                            <img
                              src={iosQr}
                              alt="iOS QR Code"
                              className="w-56 h-56 mx-auto"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=224x224&data=https://example.com/downloads/sakay-ios.ipa'
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <QrCode className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                            <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>Coming Soon</span>
                          </div>
                          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>iOS app is currently in development</p>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                            <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>—</p>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>File Size</p>
                          </div>
                          <div className={`w-px h-8 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
                          <div className="text-center">
                            <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Soon</p>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>Version</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Side - Coming Soon Info */}
                    <div className="p-8 md:p-12">
                      <motion.div variants={staggerContainer} className="space-y-8">
                        <div>
                          <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                            iOS App Coming Soon
                          </h3>
                          <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            We're working hard to bring SakayNE to iOS devices. Stay tuned for updates!
                          </p>
                        </div>

                        <div className="space-y-4">
                          <motion.div variants={scaleIn}>
                            <div className={`group p-5 border-2 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"} opacity-70`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 ${isDark ? "bg-gray-700" : "bg-gray-200"} rounded-xl flex items-center justify-center`}>
                                    <Download className={`w-6 h-6 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Direct Download</h4>
                                    <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Coming soon</p>
                                  </div>
                                </div>
                                <Button
                                  disabled
                                  size="lg"
                                  className={`${isDark ? "bg-gray-600 text-gray-400" : "bg-gray-300 text-gray-500"} cursor-not-allowed px-6 rounded-xl`}
                                >
                                  Coming Soon
                                </Button>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div variants={scaleIn}>
                            <div className={`group p-5 border-2 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"} opacity-70`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 ${isDark ? "bg-gray-700" : "bg-gray-200"} rounded-xl flex items-center justify-center`}>
                                    <Github className={`w-6 h-6 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>GitHub Release</h4>
                                    <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Coming soon</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="lg"
                                  disabled
                                  className={`${isDark ? "border-gray-700 text-gray-500" : "border-gray-200 text-gray-400"} cursor-not-allowed rounded-xl`}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Visit
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <Separator />

                        <div>
                          <h5 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Coming Soon Features</h5>
                          <ul className="space-y-2">
                            {[
                              'iOS 13.0 or later support',
                              'Optimized for iPhone and iPad',
                              'Apple Sign-In integration',
                              'Widget support for quick booking'
                            ].map((req, i) => (
                              <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                <CheckCircle2 className="w-4 h-4 text-grab-green flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-grab-green/10 rounded-xl p-4 text-center">
                          <p className="text-sm text-grab-green font-medium">
                            Be the first to know when iOS is ready!
                          </p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>
                            Follow us on social media for updates
                          </p>
                        </div>

                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} text-center`}>
                          Have questions?{" "}
                          <a href="mailto:support.sakay@gmail.com" className="text-grab-green hover:underline">Contact us</a>
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Grid - UPDATED with new content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Everything you need for a seamless commute
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              SakayNE comes packed with features designed to make your daily travel smooth and hassle-free
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Navigation,
                title: 'Real-time Vehicle Tracking',
                desc: 'Track the exact location of your jeepney and know exactly when it will arrive at your location. No more uncertain waiting times.',
                color: 'text-grab-green'
              },
              {
                icon: Clock,
                title: 'Ride Booking System',
                desc: 'Reserve your seat in advance. Avoid long queues and ensure you have a ride, especially during peak hours.',
                color: 'text-grab-green'
              },
              {
                icon: MapPin,
                title: 'Route Information',
                desc: 'View detailed route maps, designated stops, and estimated travel times before you ride. Plan your trip efficiently.',
                color: 'text-grab-green'
              },
              {
                icon: TrendingUp,
                title: 'Multiple Routes',
                desc: 'Access jeepney routes across Metro Manila and nearby provinces. Know which jeepney to take and where to get off.',
                color: 'text-grab-green'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-grab-green" />
                      </div>
                      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{feature.title}</h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
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
              Ready to transform your commute?
            </h2>
            <p className="text-xl text-white/80">
              Join thousands of commuters who already made the switch to SakayNE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => document.querySelector('[value="android"]')?.click()}
                className={`${isDark ? "bg-gray-200 text-grab-green hover:bg-gray-300" : "bg-white text-grab-green hover:bg-gray-100"} h-14 px-8 rounded-xl text-lg font-bold`}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Download for Android
              </Button>
              <Button
                onClick={() => document.querySelector('[value="ios"]')?.click()}
                className={`${isDark ? "bg-gray-600 text-gray-300" : "bg-gray-300 text-gray-600"} cursor-not-allowed h-14 px-8 rounded-xl text-lg font-bold`}
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

export default DownloadPage
