import React, { useState } from 'react';
import { X, User, MapPin, Truck, DollarSign, Camera, CheckCircle, AlertCircle, Eye, EyeOff, Upload } from 'lucide-react';

interface VehicleOwnerRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const VehicleOwnerRegistration: React.FC<VehicleOwnerRegistrationProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    nicNumber: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Location
    district: '',
    cityTown: '',
    address: '',
    
    // Vehicle Info
    vehicleType: '',
    modelBrand: '',
    registrationNumber: '',
    description: '',
    
    // Rental Details
    priceAmount: '',
    priceUnit: 'hour',
    availabilitySchedule: '',
    
    // Media
    vehicleImage: null as File | null,
    nicLicenseImage: null as File | null,
    
    // Confirmation
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const vehicleTypes = [
    'Tipper',
    'Lorries/Trucks',
    'Excavators',
    'JCB',
    'Boom Truck',
    'Crane Truck',
    'Water Bowser',
    'Concrete Mixer',
    'Low-bed Trailers'
  ];

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Info
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.nicNumber.trim()) newErrors.nicNumber = 'NIC number is required';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
        
      case 2: // Location
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.cityTown.trim()) newErrors.cityTown = 'City/Town is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        break;
        
      case 3: // Vehicle Info
        if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
        if (!formData.modelBrand.trim()) newErrors.modelBrand = 'Model/Brand is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
        
      case 4: // Rental Details
        if (!formData.priceAmount.trim()) newErrors.priceAmount = 'Price is required';
        else if (isNaN(Number(formData.priceAmount)) || Number(formData.priceAmount) <= 0) {
          newErrors.priceAmount = 'Please enter a valid price';
        }
        break;
        
      case 5: // Media
        if (!formData.vehicleImage) newErrors.vehicleImage = 'Vehicle image is required';
        if (!formData.nicLicenseImage) newErrors.nicLicenseImage = 'NIC/License image is required';
        break;
        
      case 6: // Confirmation
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(6)) {
      onSubmit({
        ...formData,
        role: 'vehicle_owner',
        type: 'vehicle_owner'
      });
    }
  };

  const stepTitles = [
    'Personal Information',
    'Location Details',
    'Vehicle Information',
    'Rental Details',
    'Upload Media',
    'Confirmation'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Vehicle Owner Registration</h2>
              <p className="text-gray-600 mt-1">Step {currentStep} of 6: {stepTitles[currentStep - 1]}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    step <= currentStep
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NIC Number *
                  </label>
                  <input
                    type="text"
                    name="nicNumber"
                    value={formData.nicNumber}
                    onChange={handleInputChange}
                    placeholder="123456789V or 200012345678"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.nicNumber ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.nicNumber && <p className="text-red-500 text-sm mt-1">{errors.nicNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="+94 76 1098385"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      className={`w-full border-2 rounded-xl px-4 py-3 pr-12 focus:outline-none transition-colors ${
                        errors.password ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`w-full border-2 rounded-xl px-4 py-3 pr-12 focus:outline-none transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Location Details</h3>
                <p className="text-gray-600">Where is your vehicle located?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.district ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  >
                    <option value="">Select District</option>
                    {sriLankanDistricts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City/Town *
                  </label>
                  <input
                    type="text"
                    name="cityTown"
                    value={formData.cityTown}
                    onChange={handleInputChange}
                    placeholder="Enter city or town"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.cityTown ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.cityTown && <p className="text-red-500 text-sm mt-1">{errors.cityTown}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter your complete address including street, area, and postal code"
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Vehicle Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Truck className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Information</h3>
                <p className="text-gray-600">Tell us about your vehicle</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.vehicleType ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Model/Brand Name *
                  </label>
                  <input
                    type="text"
                    name="modelBrand"
                    value={formData.modelBrand}
                    onChange={handleInputChange}
                    placeholder="e.g., TATA 1613, JCB 3CX"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.modelBrand ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.modelBrand && <p className="text-red-500 text-sm mt-1">{errors.modelBrand}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registration Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., WP CAB-1234"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your vehicle, its condition, special features, and any additional services you provide..."
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                  }`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Rental Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rental Details</h3>
                <p className="text-gray-600">Set your pricing and availability</p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Pricing Information</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rental Price *
                    </label>
                    <input
                      type="number"
                      name="priceAmount"
                      value={formData.priceAmount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      min="0"
                      step="100"
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                        errors.priceAmount ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                      }`}
                    />
                    {errors.priceAmount && <p className="text-red-500 text-sm mt-1">{errors.priceAmount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price Unit *
                    </label>
                    <select
                      name="priceUnit"
                      value={formData.priceUnit}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                    >
                      <option value="hour">Per Hour</option>
                      <option value="day">Per Day</option>
                    </select>
                  </div>
                </div>

                {formData.priceAmount && (
                  <div className="mt-4 p-4 bg-white rounded-xl">
                    <p className="text-gray-600">Your rental rate:</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      Rs. {Number(formData.priceAmount).toLocaleString()} per {formData.priceUnit}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability Schedule (Optional)
                </label>
                <textarea
                  name="availabilitySchedule"
                  value={formData.availabilitySchedule}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g., Available Monday to Friday, 8 AM to 6 PM. Advance booking required."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 5: Media Upload */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Camera className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Media</h3>
                <p className="text-gray-600">Add photos to showcase your vehicle</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                  errors.vehicleImage ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-yellow-500'
                }`}>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Vehicle Image *</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload a clear photo of your vehicle</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'vehicleImage')}
                    className="hidden"
                    id="vehicleImage"
                  />
                  <label
                    htmlFor="vehicleImage"
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                  >
                    Choose Image
                  </label>
                  {formData.vehicleImage && (
                    <div className="mt-4">
                      <p className="text-sm text-green-600">✓ {formData.vehicleImage.name}</p>
                      <img
                        src={URL.createObjectURL(formData.vehicleImage)}
                        alt="Vehicle preview"
                        className="w-full h-32 object-cover rounded-lg mt-2"
                      />
                    </div>
                  )}
                  {errors.vehicleImage && <p className="text-red-500 text-sm mt-2">{errors.vehicleImage}</p>}
                </div>

                <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                  errors.nicLicenseImage ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500'
                }`}>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">NIC/License Image *</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload your NIC or driving license</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'nicLicenseImage')}
                    className="hidden"
                    id="nicLicenseImage"
                  />
                  <label
                    htmlFor="nicLicenseImage"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Choose Image
                  </label>
                  {formData.nicLicenseImage && (
                    <div className="mt-4">
                      <p className="text-sm text-green-600">✓ {formData.nicLicenseImage.name}</p>
                      <img
                        src={URL.createObjectURL(formData.nicLicenseImage)}
                        alt="NIC/License preview"
                        className="w-full h-32 object-cover rounded-lg mt-2"
                      />
                    </div>
                  )}
                  {errors.nicLicenseImage && <p className="text-red-500 text-sm mt-2">{errors.nicLicenseImage}</p>}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertCircle className="text-blue-600 w-5 h-5 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Image Guidelines:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Use clear, high-quality images</li>
                      <li>• Vehicle photo should show the entire vehicle</li>
                      <li>• NIC/License should be clearly readable</li>
                      <li>• Accepted formats: JPG, JPEG, PNG</li>
                      <li>• Maximum file size: 5MB per image</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Confirmation */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h3>
                <p className="text-gray-600">Please review your information before submitting</p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Info</h4>
                    <p className="text-sm text-gray-600">Name: {formData.fullName}</p>
                    <p className="text-sm text-gray-600">Mobile: {formData.mobileNumber}</p>
                    <p className="text-sm text-gray-600">Email: {formData.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                    <p className="text-sm text-gray-600">{formData.cityTown}, {formData.district}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vehicle</h4>
                    <p className="text-sm text-gray-600">{formData.vehicleType} - {formData.modelBrand}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                    <p className="text-sm text-gray-600">Rs. {Number(formData.priceAmount).toLocaleString()} per {formData.priceUnit}</p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className={`mr-3 mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 ${
                      errors.agreeToTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">I agree to the Terms and Conditions *</span>
                    <p className="mt-2">
                      By registering, I confirm that all information provided is accurate and I agree to 
                      Auto X's terms of service, privacy policy, and vehicle rental guidelines. I understand 
                      that my registration will be reviewed and approved before I can start listing my vehicle.
                    </p>
                  </div>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition-colors font-semibold"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};