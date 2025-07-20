import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    const user: User = {
      id: Date.now().toString(),
      name: formData.name || 'Demo User',
      email: formData.email,
      phone: formData.phone || '123-456-7890',
      isAuthenticated: true
    };
    
    onLogin(user);
    onClose();
    setFormData({ name: '', email: '', phone: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-xl shadow-lg w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
              <span className="text-yellow-500 font-bold text-xl">A</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Join SupplyWorks' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Create your account to access premium construction services' 
              : 'Sign in to continue with your construction projects'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required={isSignUp}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-gray-900 placeholder-gray-500"
            />
          </div>

          {isSignUp && (
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required={isSignUp}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500"
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-gray-900 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-yellow-600 hover:text-yellow-700 ml-2 font-semibold transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {!isSignUp && (
          <div className="text-center mt-4">
            <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium transition-colors">
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};