import React from 'react';
import { Truck, Star, Shield, Clock, Users, ArrowRight, CheckCircle, Wrench, Award } from 'lucide-react';

interface GuestVehiclePageProps {
  onSignUp: () => void;
}

export const GuestVehiclePage: React.FC<GuestVehiclePageProps> = ({ onSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Professional Vehicle Rental
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Rent construction vehicles and heavy machinery from verified owners across Sri Lanka. 
              JCBs, lorries, water bowsers, and specialized equipment with experienced operators.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Fully Insured</h3>
                <p className="text-blue-100 text-sm">All vehicles covered with comprehensive insurance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Expert Operators</h3>
                <p className="text-blue-100 text-sm">Experienced operators included with rentals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-blue-100 text-sm">Round-the-clock maintenance and support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Categories Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Vehicle Categories
            </h2>
            <p className="text-xl text-gray-600">
              Professional construction vehicles for every project need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="JCB Excavator"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🚜 JCB Excavators</h3>
                <p className="text-gray-600 text-sm mb-3">Heavy-duty excavation and loading equipment</p>
                <div className="bg-blue-50 rounded-lg p-2">
                  <div className="text-xs text-gray-600">From</div>
                  <div className="text-sm font-bold text-blue-600">Rs. 32,000/hour</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Transport Lorry"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🚚 Transport Lorries</h3>
                <p className="text-gray-600 text-sm mb-3">Large capacity material transportation</p>
                <div className="bg-green-50 rounded-lg p-2">
                  <div className="text-xs text-gray-600">From</div>
                  <div className="text-sm font-bold text-green-600">Rs. 21,000/hour</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Water Bowser"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🚰 Water Bowsers</h3>
                <p className="text-gray-600 text-sm mb-3">Site water supply and dust control</p>
                <div className="bg-yellow-50 rounded-lg p-2">
                  <div className="text-xs text-gray-600">From</div>
                  <div className="text-sm font-bold text-yellow-600">Rs. 16,000/hour</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Boom Lift"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🏗️ Boom Lifts</h3>
                <p className="text-gray-600 text-sm mb-3">Aerial work platforms for high access</p>
                <div className="bg-purple-50 rounded-lg p-2">
                  <div className="text-xs text-gray-600">From</div>
                  <div className="text-sm font-bold text-purple-600">Rs. 40,000/hour</div>
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
              Why Choose Auto X for Vehicle Rental?
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by construction professionals across Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wrench className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Well Maintained</h3>
              <p className="text-gray-600">Regular maintenance and safety checks ensure optimal performance.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Operators</h3>
              <p className="text-gray-600">Certified operators with years of experience in construction projects.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fully Insured</h3>
              <p className="text-gray-600">Comprehensive insurance coverage for peace of mind during operations.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Rental</h3>
              <p className="text-gray-600">Hourly, daily, or long-term rental options to suit your project needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Vehicle Rental Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple process to get the right vehicle for your project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create Account</h3>
              <p className="text-gray-600">Register and verify your account to access our vehicle owner network.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browse & Contact</h3>
              <p className="text-gray-600">Find the right vehicle and contact owners directly for availability and rates.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book & Use</h3>
              <p className="text-gray-600">Confirm booking with owner and get the vehicle delivered to your site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Rent Professional Vehicles?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join Auto X today and connect with verified vehicle owners across Sri Lanka. 
            Get the right equipment with experienced operators for your construction projects.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={onSignUp}
              className="bg-white text-blue-600 px-12 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center mx-auto"
            >
              <Truck className="mr-3 w-6 h-6" />
              Sign Up to Rent Vehicles
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            <p className="text-blue-100 text-sm">
              Free registration • Instant access • Direct owner contact
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Vehicle Owners</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Uptime Guarantee</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};