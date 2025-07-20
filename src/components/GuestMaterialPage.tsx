import React from 'react';
import { Package, Star, Shield, Clock, Users, ArrowRight, CheckCircle, Truck, Award } from 'lucide-react';

interface GuestMaterialPageProps {
  onSignUp: () => void;
}

export const GuestMaterialPage: React.FC<GuestMaterialPageProps> = ({ onSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-black">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Premium Construction Materials
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Access thousands of verified material suppliers across Sri Lanka. 
              Get quality sand, soil, bricks and more delivered to your construction site.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-black text-sm">Certified materials from trusted suppliers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Truck className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Island-wide Delivery</h3>
                <p className="text-black text-sm">Delivery to all 25 districts in Sri Lanka</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Best Prices</h3>
                <p className="text-black text-sm">Competitive rates with direct supplier contact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material Categories Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Material Categories
            </h2>
            <p className="text-xl text-gray-600">
              Browse our extensive range of construction materials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="River Sand"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🏖️ Premium Sand</h3>
                <p className="text-gray-600 mb-4">High-quality river sand, sea sand, and construction sand from verified suppliers.</p>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-xl font-bold text-yellow-600">Rs. 6,500 per cubic meter</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Garden Soil"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🌱 Quality Soil</h3>
                <p className="text-gray-600 mb-4">Garden soil, topsoil, and fill dirt for all your landscaping needs.</p>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-xl font-bold text-green-600">Rs. 7,500 per cubic meter</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Red Clay Bricks"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🧱 Durable Bricks</h3>
                <p className="text-gray-600 mb-4">Clay bricks, concrete blocks, and pavers for strong construction.</p>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-xl font-bold text-red-600">Rs. 32,000 per 1000 pieces</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Auto X for Materials?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied contractors across Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assured</h3>
              <p className="text-gray-600">All materials undergo quality checks and come with supplier certification.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery available in Colombo and next-day for other districts.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Suppliers</h3>
              <p className="text-gray-600">All suppliers are verified with proper licenses and quality standards.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Best Prices</h3>
              <p className="text-gray-600">Direct contact with suppliers means competitive pricing for your projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get materials for your construction project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create Account</h3>
              <p className="text-gray-600">Sign up for free and verify your account to access our supplier network.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browse & Contact</h3>
              <p className="text-gray-600">Browse materials by category and contact suppliers directly for quotes.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Delivered</h3>
              <p className="text-gray-600">Negotiate directly with suppliers and get materials delivered to your site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Access Premium Materials?
          </h2>
          <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
            Join Auto X today and connect with verified material suppliers across Sri Lanka. 
            Get the best prices and quality materials for your construction projects.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={onSignUp}
              className="bg-black text-yellow-400 px-12 py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center mx-auto"
            >
              <Package className="mr-3 w-6 h-6" />
              Sign Up to Access Materials
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            <p className="text-black text-sm">
              Free registration • Instant access • No hidden fees
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-black">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-black">Verified Suppliers</div>
            </div>
            <div className="text-black">
              <div className="text-3xl font-bold mb-2">25</div>
              <div className="text-black">Districts Covered</div>
            </div>
            <div className="text-black">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-black">Successful Projects</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};