import React, { useState } from 'react';
import { Truck, Package } from 'lucide-react';
import { User, Vehicle } from '../types';
import { FindVehiclesSection } from './FindVehiclesSection';
import { FindMaterialsSection } from './FindMaterialsSection';

interface UserDashboardProps {
  user: User;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, onVehicleSelect }) => {
  const [selectedService, setSelectedService] = useState<'vehicles' | 'materials' | null>(null);

  if (selectedService === 'vehicles') {
    return <FindVehiclesSection onBack={() => setSelectedService(null)} />;
  }

  if (selectedService === 'materials') {
    return <FindMaterialsSection onBack={() => setSelectedService(null)} />;
  }

  // Main dashboard view
  return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome, {user.name}!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What would you like to find today? Choose from vehicles or materials to get started.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div
              onClick={() => setSelectedService('vehicles')}
              className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-yellow-200 hover:border-yellow-300"
            >
              <div className="text-center">
                <div className="bg-yellow-400 p-6 rounded-2xl mx-auto mb-6 w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Truck className="text-white w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Vehicles</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Browse and rent heavy vehicles like JCBs, excavators, lorries, and more from verified owners across Sri Lanka.
                </p>
                <div className="bg-white/70 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Available Categories:</div>
                  <div className="flex justify-center space-x-4">
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">🚜 Agricultural</span>
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">🚛 Construction</span>
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">🚰 Water Supply</span>
                  </div>
                </div>
                <div className="text-yellow-600 font-semibold text-lg">Browse Vehicles →</div>
              </div>
            </div>

            <div
              onClick={() => setSelectedService('materials')}
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-blue-200 hover:border-blue-300"
            >
              <div className="text-center">
                <div className="bg-blue-500 p-6 rounded-2xl mx-auto mb-6 w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Package className="text-white w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Materials</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Source quality construction materials like sand, soil, bricks, and gravel from verified suppliers.
                </p>
                <div className="bg-white/70 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Available Materials:</div>
                  <div className="flex justify-center space-x-2 flex-wrap gap-2">
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🏖️ Sand</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🌱 Soil</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🧱 Bricks</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🪨 Gravel</span>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold text-lg">Browse Materials →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};