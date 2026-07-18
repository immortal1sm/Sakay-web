import React from 'react'
import { useTheme } from '../context/ThemeContext'

const termServices = () => {
  const { effectiveTheme } = useTheme()
  const isDark = effectiveTheme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
          Terms of Service
        </h1>
        <div className={`rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 shadow-sm`}>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Last updated: January 1, 2024
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            1. Acceptance of Terms
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            By accessing or using SakayNE's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            2. Description of Service
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            SakayNE provides a transportation information and logistics platform designed to help users navigate public transportation more efficiently. Our services may include route planning, real-time transit information, and related features.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            3. User Accounts
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            To access certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            4. Acceptable Use
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            You agree to use our services only for lawful purposes and in accordance with these terms. You may not use our services to transmit harmful, offensive, or illegal content, or to interfere with the proper working of the service.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            5. Intellectual Property
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            The services and their entire contents, features, and functionality are owned by SakayNE, its licensors, or other providers and are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            6. Limitation of Liability
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            SakayNE shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services. Our total liability shall not exceed the amount you have paid us in the twelve months preceding the claim.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            7. Service Availability
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We strive to provide reliable services but do not guarantee uninterrupted or error-free operation. We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            8. Termination
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We may terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            9. Governing Law
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            These terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            10. Changes to Terms
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            We reserve the right to modify these terms at any time. We will provide notice of material changes by posting the updated terms on our platform. Your continued use after changes constitutes acceptance.
          </p>

          <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-6 mb-3`}>
            11. Contact Us
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            If you have any questions about these Terms of Service, please contact us through our support channels.
          </p>
        </div>
      </div>
    </div>
  )
}

export default termServices
