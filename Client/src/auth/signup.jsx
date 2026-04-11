import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, CarFront, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import api from '../util/axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        // Check password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        
        setLoading(true);
        
        try {
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...signUpData } = formData;
            await api.post('/auth/sign-up', signUpData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 py-12 font-sans relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] bg-crimson/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden">
                    <CardHeader className="space-y-2 text-center pt-10 pb-6">
                        <div className="mx-auto w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-200">
                            <CarFront className="text-white w-10 h-10" />
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                            Join SAKAY
                        </CardTitle>
                        <CardDescription className="text-gray-500 text-base">
                            Create an account to start your journey
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 pb-10">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-600">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-green-600" />
                                </div>
                                <Input
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="pl-12 h-14 bg-gray-50/50 border-gray-200 rounded-2xl focus-visible:ring-green-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-600">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-600" />
                                </div>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-12 h-14 bg-gray-50/50 border-gray-200 rounded-2xl focus-visible:ring-green-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-600">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-600" />
                                </div>
                                <Input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-12 pr-12 h-14 bg-gray-50/50 border-gray-200 rounded-2xl focus-visible:ring-green-500 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-600">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-600" />
                                </div>
                                <Input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-12 pr-12 h-14 bg-gray-50/50 border-gray-200 rounded-2xl focus-visible:ring-green-500 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-green-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                                {!loading && <ArrowRight className="h-5 w-5" />}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500">
                                Already have an account?{' '}
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="font-bold text-gray-900 hover:text-green-600 transition-colors cursor-pointer"
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default SignUp;