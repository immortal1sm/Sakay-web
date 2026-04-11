// Client/src/auth/login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CarFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { effectiveTheme } = useTheme();
    const isDark = effectiveTheme === 'dark';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await login(email, password);
            const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/';
            sessionStorage.removeItem('redirectAfterLogin');
            navigate(redirectTo);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 font-sans relative overflow-hidden transition-colors duration-200 ${isDark ? 'bg-gray-950' : 'bg-[#f8f9fa]'}`}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full blur-3xl transition-colors duration-200 ${isDark ? 'bg-green-900/10' : 'bg-green-500/5'}`} />
                <div className={`absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] rounded-full blur-3xl transition-colors duration-200 ${isDark ? 'bg-red-900/10' : 'bg-crimson/5'}`} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className={`border-0 shadow-2xl backdrop-blur-lg rounded-3xl overflow-hidden transition-colors duration-200 ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-100'}`}>
                    <CardHeader className="space-y-2 text-center pt-10 pb-6">
                        <div className="mx-auto w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-200">
                            <CarFront className="text-white w-10 h-10" />
                        </div>
                        <CardTitle className={`text-3xl font-bold tracking-tight transition-colors duration-200 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Welcome Back
                        </CardTitle>
                        <CardDescription className={`text-base transition-colors duration-200 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Enter your credentials to access your SAKAY account
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 pb-10">
                        {error && (
                            <div className={`mb-4 p-3 rounded-xl text-sm transition-colors duration-200 ${isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'}`}>
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-600">
                                        <Mail className={`h-5 w-5 transition-colors duration-200 ${isDark ? 'text-gray-500 group-focus-within:text-green-500' : 'text-gray-400 group-focus-within:text-green-600'}`} />
                                    </div>
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`pl-12 h-14 border rounded-2xl focus-visible:ring-green-500 transition-all duration-200 ${isDark ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50/50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-600">
                                        <Lock className={`h-5 w-5 transition-colors duration-200 ${isDark ? 'text-gray-500 group-focus-within:text-green-500' : 'text-gray-400 group-focus-within:text-green-600'}`} />
                                    </div>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`pl-12 h-14 border rounded-2xl focus-visible:ring-green-500 transition-all duration-200 ${isDark ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50/50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-200 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Logging in...' : 'Sign In'}
                                {!loading && <ArrowRight className="h-5 w-5" />}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className={`transition-colors duration-200 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Don't have an account?{' '}
                                <button 
                                    onClick={() => navigate('/signup')}
                                    className={`font-bold transition-colors cursor-pointer ${isDark ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'}`}
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
