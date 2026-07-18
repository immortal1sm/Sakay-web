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
  Users,
  Sparkles,
  Heart,
  Target,
  Eye,
  Lightbulb,
  BookOpen,
  Mail,
  Quote,
  Shield,
} from 'lucide-react'

const About = () => {
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
              About{' '}
              <span className="bg-gradient-to-r from-grab-green to-grab-dark bg-clip-text text-transparent">
                SakayNE
              </span>
            </h1>
            <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
              We're on a mission to transform the way Filipinos commute, making every journey 
              safer, smarter, and more convenient.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <Card className={`border-0 shadow-xl h-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-grab-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-grab-green" />
                  </div>
                  <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Our Mission</h2>
                  <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                    To revolutionize the Philippine transportation system by providing a reliable, 
                    efficient, and user-friendly platform that connects commuters with jeepney drivers, 
                    reducing waiting times and enhancing the overall travel experience for every Filipino.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
            >
              <Card className={`border-0 shadow-xl h-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-grab-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-grab-green" />
                  </div>
                  <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Our Vision</h2>
                  <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                    A Philippines where commuting is seamless, accessible, and stress-free for everyone, 
                    powered by technology that bridges the gap between traditional transportation and 
                    modern convenience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className={`py-16 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20 px-4 py-2 rounded-full">
                <BookOpen className="w-4 h-4 mr-2" />
                OUR JOURNEY
              </Badge>
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                From an idea to a movement
              </h2>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                SakayNE started with a simple observation: every day, thousands of Filipino commuters 
                waste hours waiting for jeepneys, unsure of when they'll arrive or if there's even space.
              </p>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                What began as a student project at Central Luzon State University quickly grew into 
                something bigger. We realized that the challenges faced by students—long waiting times, 
                overcrowding, and unpredictable schedules—were shared by commuters all across the Philippines.
              </p>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                Today, SakayNE is a nationwide initiative dedicated to transforming the commuting experience. 
                We're building a platform that connects commuters with drivers, providing real-time tracking, 
                advance booking, and route information—all designed to make every journey smoother.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-grab-green/10 to-blue-500/10 rounded-3xl blur-3xl" />
              <Card className={`relative ${isDark ? "bg-gray-800" : "bg-white"} p-8 rounded-2xl shadow-2xl border-0`}>
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <Quote className="w-10 h-10 text-grab-green" />
                    <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Why "SakayNE"?</div>
                  </div>
                  <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed mb-6`}>
                    "Sakay" is a Filipino word that means "to ride" or "to board." It's a term every 
                    Filipino commuter knows and uses daily. We chose this name to honor the everyday 
                    journey of millions of Filipinos—a simple word that represents the heart of what we do.
                  </p>
                  <Separator className="my-6" />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-grab-green/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-grab-green" />
                    </div>
                    <div>
                      <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Made with ❤️ for every Filipino</p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>From students to workers, from professionals to everyday commuters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              <Sparkles className="w-4 h-4 mr-2" />
              WHAT WE STAND FOR
            </Badge>
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Our Core Values
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              These principles guide everything we do at SakayNE
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Heart, title: 'Compassion', desc: 'Understanding the daily struggles of commuters and drivers alike' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Using technology to solve real-world transportation challenges' },
              { icon: Users, title: 'Community', desc: 'Building a platform that serves and connects people' },
              { icon: Shield, title: 'Integrity', desc: 'Ensuring safety, security, and transparency in everything we do' }
            ].map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-grab-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-7 h-7 text-grab-green" />
                      </div>
                      <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{value.title}</h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{value.desc}</p>
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
              Want to know more?
            </h2>
            <p className="text-xl text-white/80">
              Have questions or want to collaborate with us? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => window.location.href = '/contact'}
                className={`${isDark ? "bg-gray-200 text-grab-green hover:bg-gray-300" : "bg-white text-grab-green hover:bg-gray-100"} h-14 px-8 rounded-xl text-lg font-bold`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
              <Button 
                onClick={() => window.location.href = '/download'}
                className={`${isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-black text-white hover:bg-gray-800"} h-14 px-8 rounded-xl text-lg font-bold`}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Download the App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
