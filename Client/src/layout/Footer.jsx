import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    Mail,
    ChevronRight,
    Smartphone,
    Apple,
    Heart
} from 'lucide-react'
import SafetyTipsModal from '../modals/safetyTips'
import HelpModal from '../modals/help'
import HowItWorksModal from '../modals/HowItWorks'

// Import logo
import logo from '../assets/logo/logo.png'

const Footer = () => {
    const navigate = useNavigate()
    const currentYear = new Date().getFullYear()
    const [isSafetyTipsOpen, setIsSafetyTipsOpen] = useState(false)
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
    const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)

    // Actual APK link from Google Drive (direct payload)
    const apkUrl = 'https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl'

    const handleAndroidDownload = () => {
        const link = document.createElement('a')
        link.href = apkUrl
        link.setAttribute('download', 'Jodally-1.2.1.apk')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleiOSDownload = () => {
        alert('iOS app is coming soon! Stay tuned for updates.')
    }

    // Navigation handlers
    const handleNavigation = (path) => {
        navigate(path)
        window.scrollTo(0, 0)
    }

    return (
        <>
            <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

                        {/* Column 1 - Company Info with Logo Image */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <img 
                                    src={logo} 
                                    alt="SakayNE Logo" 
                                    className="h-12 w-auto object-contain"
                                />
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                The Philippines' first all-in-one transportation app. Making commuting swabe para sa lahat ng Pilipino.
                            </p>
                        </div>

                        {/* Column 2 - Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                {/* About Us - Redirect to About Page */}
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/about')}
                                        className="text-slate-400 hover:text-grab-green flex items-center gap-2 transition-colors group w-full text-left"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <span>About Us</span>
                                    </button>
                                </li>
                                {/* How It Works - Open Modal */}
                                <li>
                                    <button
                                        onClick={() => setIsHowItWorksOpen(true)}
                                        className="text-slate-400 hover:text-grab-green flex items-center gap-2 transition-colors group w-full text-left"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <span>How It Works</span>
                                    </button>
                                </li>
                                {/* For Drivers - Open Help Modal */}
                                <li>
                                    <button
                                        onClick={() => setIsHelpModalOpen(true)}
                                        className="text-slate-400 hover:text-grab-green flex items-center gap-2 transition-colors group w-full text-left"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <span>For Drivers</span>
                                    </button>
                                </li>
                                {/* FAQs - Open Help Modal */}
                                <li>
                                    <button
                                        onClick={() => setIsHelpModalOpen(true)}
                                        className="text-slate-400 hover:text-grab-green flex items-center gap-2 transition-colors group w-full text-left"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <span>FAQs</span>
                                    </button>
                                </li>
                                {/* Safety Tips - Open Safety Modal */}
                                <li>
                                    <button
                                        onClick={() => setIsSafetyTipsOpen(true)}
                                        className="text-slate-400 hover:text-grab-green flex items-center gap-2 transition-colors group w-full text-left"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        <span>Safety Tips</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
                            <ul className="space-y-4">
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/contact')}
                                        className="flex items-center gap-3 hover:text-grab-green transition-colors w-full text-left"
                                    >
                                        <Mail className="w-5 h-5 text-grab-green flex-shrink-0" />
                                        <span className="text-slate-400 text-sm">support.sakay@gmail.com</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4 - Download App */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white mb-4">Download App</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Available on Android. <span className="text-grab-green font-bold">Download now</span> and experience a more convenient way to commute.
                            </p>
                            <div className="space-y-3">
                                <Button
                                    onClick={handleiOSDownload}
                                    variant="outline"
                                    className="w-full bg-slate-800 hover:bg-slate-700 border-slate-700 text-white h-14 justify-start gap-3 hover:scale-105 transition-all"
                                >
                                    <Apple className="w-6 h-6" />
                                    <div className="text-left">
                                        <p className="text-xs text-slate-400">Coming Soon</p>
                                        <p className="text-base font-bold">iOS App</p>
                                    </div>
                                </Button>
                                <Button
                                    onClick={handleAndroidDownload}
                                    variant="outline"
                                    className="w-full bg-slate-800 hover:bg-slate-700 border-slate-700 text-white h-14 justify-start gap-3 hover:scale-105 transition-all"
                                >
                                    <Smartphone className="w-6 h-6" />
                                    <div className="text-left">
                                        <p className="text-xs text-slate-400">Download</p>
                                        <p className="text-base font-bold">Android APK</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-slate-800 pt-8 mt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-400 text-sm text-center md:text-left">
                                © {currentYear} SakayNE. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="text-slate-400 hover:text-grab-green text-sm transition-colors"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>        
                </div>
            </footer>

            {/* How It Works Modal */}
            <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
            
            {/* Help Modal */}
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
            
            {/* Safety Tips Modal */}
            <SafetyTipsModal isOpen={isSafetyTipsOpen} onClose={() => setIsSafetyTipsOpen(false)} />
        </>
    )
}

export default Footer