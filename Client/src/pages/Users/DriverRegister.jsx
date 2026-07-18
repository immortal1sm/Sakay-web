// Client/src/pages/Users/DriverRegister.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Car, FileText, CheckCircle, ChevronRight, ChevronLeft,
  ArrowLeft, Upload, X, Phone, MapPin, Calendar, Mail, 
  ShieldCheck, Truck, Palette, Hash, AlertCircle, Camera
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../util/axios';
import Swal from 'sweetalert2';
import { useTheme } from '../../context/ThemeContext';

const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Vehicle Info', icon: Car },
  { id: 3, label: 'Documents', icon: FileText },
  { id: 4, label: 'Review', icon: CheckCircle },
];

const vehicleTypes = [
  { value: 'jeepney', label: 'Jeepney' },
  { value: 'tricycle', label: 'Tricycle' },
  { value: 'bus', label: 'Bus' },
  { value: 'taxi', label: 'Taxi' },
  { value: 'uv-express', label: 'UV Express' },
  { value: 'van', label: 'Van' },
  { value: 'private-car', label: 'Private Car' },
  { value: 'motorcycle', label: 'Motorcycle' },
];

const DriverRegister = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    // Step 1 — Personal
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    birthdate: '',
    // Step 2 — Vehicle
    vehicleType: 'jeepney',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    plateNumber: '',
    // Step 3 — Documents
    licenseNumber: '',
    licenseExpiry: '',
    licenseImageUrl: '',
    validIdUrl: '',
    vehiclePhotoUrl: '',
    // Terms
    acceptedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Step validation
  const validateStep1 = () => {
    if (!form.fullName.trim()) return 'Full name is required';
    if (!form.email.trim()) return 'Email is required';
    if (!form.phone.trim()) return 'Phone number is required';
    if (form.phone.replace(/\D/g, '').length < 10) return 'Enter a valid phone number';
    if (!form.address.trim()) return 'Address is required';
    if (!form.birthdate) return 'Birthdate is required';
    return null;
  };

  const validateStep2 = () => {
    if (!form.vehicleMake.trim()) return 'Vehicle make is required';
    if (!form.vehicleModel.trim()) return 'Vehicle model is required';
    if (!form.vehicleYear) return 'Vehicle year is required';
    if (form.vehicleYear < 1990 || form.vehicleYear > 2030) return 'Enter a valid year';
    if (!form.vehicleColor.trim()) return 'Vehicle color is required';
    if (!form.plateNumber.trim()) return 'Plate number is required';
    return null;
  };

  const validateStep3 = () => {
    if (!form.licenseNumber.trim()) return "Driver's license number is required";
    if (!form.licenseExpiry) return 'License expiry date is required';
    if (!form.acceptedTerms) return 'You must accept the terms and conditions';
    return null;
  };

  const handleNext = () => {
    setErrorMsg('');
    let err = null;
    if (step === 1) err = validateStep1();
    else if (step === 2) err = validateStep2();
    else if (step === 3) err = validateStep3();

    if (err) {
      setErrorMsg(err);
      return;
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setErrorMsg('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    setSubmitting(true);
    try {
      await api.post('/drivers/apply', form);
      setSubmitted(true);
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: "We'll review your application and get back to you.",
        confirmButtonColor: '#009639',
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit application. Please try again.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Image upload handler (placeholder — uses URL for now)
  const handleImageUpload = (fieldName) => {
    const url = prompt('Enter image URL for ' + fieldName.replace(/([A-Z])/g, ' $1').toLowerCase());
    if (url) {
      setForm(prev => ({ ...prev, [fieldName]: url }));
    }
  };

  const removeImage = (fieldName) => {
    setForm(prev => ({ ...prev, [fieldName]: '' }));
  };

  // Common input class
  const inputClass = `w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-grab-green ${
    isDark
      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
  }`;

  const labelClass = `block text-sm font-bold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;
  const requiredLabel = <span className="text-red-500 ml-0.5">*</span>;

  if (submitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`max-w-md w-full text-center p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-grab-green/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-grab-green" />
          </div>
          <h1 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Application Submitted! 🎉
          </h1>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you for applying to become a SakayNE driver. Our team will review your application 
            and you'll be notified once it's approved. This usually takes 1-3 business days.
          </p>
          <Link
            to="/"
            className="inline-block bg-grab-green hover:bg-grab-dark text-white font-bold px-8 py-3 rounded-full transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 mb-6 transition-colors ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className={`text-3xl md:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Become a <span className="text-grab-green">SakayNE</span> Driver
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join thousands of drivers earning on their own terms
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step > s.id
                      ? 'bg-grab-green text-white'
                      : step === s.id
                      ? 'bg-grab-green text-white ring-4 ring-grab-green/20'
                      : isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step > s.id ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium mt-2 ${step >= s.id ? 'text-grab-green' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step > s.id ? 'bg-grab-green' : isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
            isDark ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'
          }`}>
            <AlertCircle className={`w-5 h-5 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
            <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>{errorMsg}</p>
          </div>
        )}

        {/* Form Steps */}
        <div className={`rounded-2xl p-6 md:p-8 shadow-xl border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <AnimatePresence mode="wait">
            {/* STEP 1 — Personal Information */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <User className="w-6 h-6 text-grab-green" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Full Name{requiredLabel}</label>
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                      placeholder="Juan Dela Cruz" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email{requiredLabel}</label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="juan@email.com" className={`${inputClass} pl-11`} readOnly={!!user} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number{requiredLabel}</label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="09171234567" className={`${inputClass} pl-11`} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Address{requiredLabel}</label>
                    <div className="relative">
                      <MapPin className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input type="text" name="address" value={form.address} onChange={handleChange}
                        placeholder="123 Rizal St., Barangay San Isidro, Manila" className={`${inputClass} pl-11`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Birthdate{requiredLabel}</label>
                    <div className="relative">
                      <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange}
                        className={`${inputClass} pl-11`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Vehicle Information */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Car className="w-6 h-6 text-grab-green" />
                  Vehicle Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Vehicle Type{requiredLabel}</label>
                    <div className="relative">
                      <Truck className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <select name="vehicleType" value={form.vehicleType} onChange={handleChange}
                        className={`${inputClass} pl-11 appearance-none cursor-pointer`}>
                        {vehicleTypes.map(vt => (
                          <option key={vt.value} value={vt.value}>{vt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Vehicle Make{requiredLabel}</label>
                    <input type="text" name="vehicleMake" value={form.vehicleMake} onChange={handleChange}
                      placeholder="Toyota" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Vehicle Model{requiredLabel}</label>
                    <input type="text" name="vehicleModel" value={form.vehicleModel} onChange={handleChange}
                      placeholder="Hi-Ace" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Vehicle Year{requiredLabel}</label>
                    <input type="number" name="vehicleYear" value={form.vehicleYear} onChange={handleChange}
                      placeholder="2020" min="1990" max="2030" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Vehicle Color{requiredLabel}</label>
                    <div className="relative">
                      <Palette className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input type="text" name="vehicleColor" value={form.vehicleColor} onChange={handleChange}
                        placeholder="White" className={`${inputClass} pl-11`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Plate Number{requiredLabel}</label>
                    <div className="relative">
                      <Hash className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input type="text" name="plateNumber" value={form.plateNumber} onChange={handleChange}
                        placeholder="ABC 1234" className={`${inputClass} pl-11 uppercase`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — License & Documents */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <FileText className="w-6 h-6 text-grab-green" />
                  License & Documents
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Driver's License No.{requiredLabel}</label>
                    <input type="text" name="licenseNumber" value={form.licenseNumber} onChange={handleChange}
                      placeholder="D12-34-567890" className={`${inputClass} uppercase`} />
                  </div>
                  <div>
                    <label className={labelClass}>License Expiry{requiredLabel}</label>
                    <input type="date" name="licenseExpiry" value={form.licenseExpiry} onChange={handleChange}
                      className={inputClass} />
                  </div>

                  {/* License Image Upload */}
                  <div>
                    <label className={labelClass}>License Photo</label>
                    {form.licenseImageUrl ? (
                      <div className={`relative rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <img src={form.licenseImageUrl} alt="License" className="w-full h-32 object-cover" />
                        <button onClick={() => removeImage('licenseImageUrl')}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleImageUpload('licenseImageUrl')}
                        className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                          isDark ? 'border-gray-600 text-gray-400 hover:border-grab-green' : 'border-gray-300 text-gray-500 hover:border-grab-green'
                        }`}>
                        <Camera className="w-6 h-6" />
                        <span className="text-sm font-medium">Upload Photo</span>
                      </button>
                    )}
                  </div>

                  {/* Valid ID Upload */}
                  <div>
                    <label className={labelClass}>Valid ID (Back-to-Back)</label>
                    {form.validIdUrl ? (
                      <div className={`relative rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <img src={form.validIdUrl} alt="Valid ID" className="w-full h-32 object-cover" />
                        <button onClick={() => removeImage('validIdUrl')}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleImageUpload('validIdUrl')}
                        className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                          isDark ? 'border-gray-600 text-gray-400 hover:border-grab-green' : 'border-gray-300 text-gray-500 hover:border-grab-green'
                        }`}>
                        <Upload className="w-6 h-6" />
                        <span className="text-sm font-medium">Upload Photo</span>
                      </button>
                    )}
                  </div>

                  {/* Vehicle Photo */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>Vehicle Photo</label>
                    {form.vehiclePhotoUrl ? (
                      <div className={`relative rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <img src={form.vehiclePhotoUrl} alt="Vehicle" className="w-full h-40 object-cover" />
                        <button onClick={() => removeImage('vehiclePhotoUrl')}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleImageUpload('vehiclePhotoUrl')}
                        className={`w-full h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                          isDark ? 'border-gray-600 text-gray-400 hover:border-grab-green' : 'border-gray-300 text-gray-500 hover:border-grab-green'
                        }`}>
                        <Camera className="w-6 h-6" />
                        <span className="text-sm font-medium">Upload Photo</span>
                      </button>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="md:col-span-2">
                    <label className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}>
                      <input type="checkbox" name="acceptedTerms" checked={form.acceptedTerms} onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded accent-grab-green" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        I confirm that all information provided is accurate and complete. I agree to the 
                        <span className="text-grab-green font-medium"> Terms of Service</span> and 
                        <span className="text-grab-green font-medium"> Driver Agreement</span>. I understand that 
                        any false information may result in rejection or termination of my application.
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Review & Submit */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <ShieldCheck className="w-6 h-6 text-grab-green" />
                  Review Your Application
                </h2>
                <p className={`mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Please review all the information below before submitting. You can go back to edit any section.
                </p>

                {/* Personal Info Summary */}
                <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <h3 className="font-bold text-sm text-grab-green mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" /> Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <ReviewField label="Full Name" value={form.fullName} isDark={isDark} />
                    <ReviewField label="Email" value={form.email} isDark={isDark} />
                    <ReviewField label="Phone" value={form.phone} isDark={isDark} />
                    <ReviewField label="Birthdate" value={form.birthdate} isDark={isDark} />
                    <ReviewField label="Address" value={form.address} isDark={isDark} className="md:col-span-2" />
                  </div>
                </div>

                {/* Vehicle Info Summary */}
                <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <h3 className="font-bold text-sm text-grab-green mb-3 flex items-center gap-2">
                    <Car className="w-4 h-4" /> Vehicle Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <ReviewField label="Type" value={vehicleTypes.find(vt => vt.value === form.vehicleType)?.label || form.vehicleType} isDark={isDark} />
                    <ReviewField label="Make" value={form.vehicleMake} isDark={isDark} />
                    <ReviewField label="Model" value={form.vehicleModel} isDark={isDark} />
                    <ReviewField label="Year" value={form.vehicleYear} isDark={isDark} />
                    <ReviewField label="Color" value={form.vehicleColor} isDark={isDark} />
                    <ReviewField label="Plate No." value={form.plateNumber} isDark={isDark} />
                  </div>
                </div>

                {/* Documents Summary */}
                <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <h3 className="font-bold text-sm text-grab-green mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Documents
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <ReviewField label="License No." value={form.licenseNumber} isDark={isDark} />
                    <ReviewField label="License Expiry" value={form.licenseExpiry} isDark={isDark} />
                    <ReviewField label="License Photo" value={form.licenseImageUrl ? '✓ Uploaded' : '✗ Not uploaded'} isDark={isDark} />
                    <ReviewField label="Valid ID" value={form.validIdUrl ? '✓ Uploaded' : '✗ Not uploaded'} isDark={isDark} />
                    <ReviewField label="Vehicle Photo" value={form.vehiclePhotoUrl ? '✓ Uploaded' : '✗ Not uploaded'} isDark={isDark} />
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-grab-green/10 border border-grab-green/20' : 'bg-green-50 border border-green-200'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    By submitting this application, you agree to the terms and conditions of the SakayNE Driver Program.
                    Our team will review your application within 1-3 business days.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200/20">
            {step > 1 ? (
              <button onClick={handlePrev}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                  isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                }`}>
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white bg-grab-green hover:bg-grab-dark transition-all active:scale-95">
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold text-white transition-all active:scale-95 ${
                  submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-grab-green hover:bg-grab-dark'
                }`}>
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Already a driver? */}
        <div className="text-center mt-8">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Already a driver?{' '}
            <Link to="/login" className="text-grab-green font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper component for review fields
const ReviewField = ({ label, value, isDark, className = '' }) => (
  <div className={className}>
    <span className={`block text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{value || '—'}</span>
  </div>
);

export default DriverRegister;
