import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../../layout/TopBar'
import Footer from '../../layout/Footer'
import { useTheme } from '../../context/ThemeContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Clock,
  Heart,
  Sparkles,
  Headphones
} from 'lucide-react'

const Contact = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support.sakay@gmail.com',
      action: 'mailto:support@sakay.ph',
      color: 'grab-green'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: 'Monday - Friday: 8:00 AM - 8:00 PM',
      subDetails: 'Saturday: 9:00 AM - 6:00 PM',
      action: null,
      color: 'grab-green'
    }
  ]

  const faqs = [
    {
      question: 'How do I download the SakayNE app?',
      answer: 'You can download SakayNE directly from our website. Click the "Download App" button on the top bar or visit our Download page. Choose between Android APK or iOS IPA files.'
    },
    {
      question: 'Is SakayNE available in my city?',
      answer: 'SakayNE is currently available in 15+ cities across Metro Manila and nearby provinces. We\'re expanding to more areas soon! Check the app for the latest coverage.'
    },
    {
      question: 'How do I become a driver?',
      answer: 'Download the app, select "Driver Registration" during sign-up, and submit the required documents (driver\'s license, OR/CR, franchise). Our team will review and approve your application within 3-5 business days.'
    },
    {
      question: 'What if I encounter a problem with the app?',
      answer: 'Use the in-app report feature or email us at support@sakay.ph. Our support team is available 24/7 to assist you with any issues.'
    },
    {
      question: 'How do I book a ride?',
      answer: 'Simply open the app, enter your pickup and drop-off location, select your preferred time, and confirm your booking. You\'ll receive a confirmation once a driver accepts your request.'
    },
    {
      question: 'Is there a booking fee?',
      answer: 'No, SakayNE does not charge any booking fee. You only pay the standard jeepney fare directly to the driver upon boarding.'
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
              Contact{' '}
              <span className="bg-gradient-to-r from-grab-green to-grab-dark bg-clip-text text-transparent">
                SakayNE
              </span>
            </h1>
            <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
              Have questions, feedback, or want to partner with us? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards - 2 cards only */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200"} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-grab-green" />
                      </div>
                      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{info.title}</h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{info.details}</p>
                      <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"} mt-1`}>{info.subDetails}</p>
                      {info.action && (
                        <Button
                          variant="link"
                          className="mt-3 text-grab-green hover:text-grab-dark p-0 h-auto"
                          onClick={() => window.open(info.action, '_blank')}
                        >
                          Contact Now →
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              <Headphones className="w-4 h-4 mr-2" />
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
              Got questions? We've got answers
            </h2>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              Find quick answers to common questions about SakayNE
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className={`border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200"} hover:shadow-lg transition-all duration-300 h-full`}>
                  <CardContent className="p-6">
                    <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{faq.question}</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-8"
          >
            <p className={isDark ? "text-gray-400" : "text-gray-500"}>
              Still have questions?{" "}
              <a href="mailto:support@sakay.ph" className="text-grab-green hover:underline font-medium">
                Email our support team
              </a>
            </p>
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
            <Heart className="w-12 h-12 mx-auto text-white/80" />
            <h2 className="text-3xl md:text-4xl font-bold">
              We're here to help
            </h2>
            <p className="text-xl text-white/80">
              Whether you're a commuter, driver, or potential partner, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => window.location.href = '/download'}
                className={`${isDark ? "bg-gray-200 text-grab-green hover:bg-gray-300" : "bg-white text-grab-green hover:bg-gray-100"} h-14 px-8 rounded-xl text-lg font-bold`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Download the App
              </Button>
              <Button 
                onClick={() => window.location.href = '/features'}
                className={`${isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-black text-white hover:bg-gray-800"} h-14 px-8 rounded-xl text-lg font-bold`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact
