import React, { useState } from 'react';
import { materialItems, materialCategories, sriLankanDistricts } from '../data/services';
import { MaterialItem } from '../types';
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, User, Award, Filter, Package } from 'lucide-react';

interface MaterialsSectionProps {
  onBack: () => void;
  onRequestService: (item: MaterialItem, quantity: number) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({ onBack, onRequestService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MaterialItem | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessage = (phone: string, supplierName: string, materialName: string) => {
    const message = `Hi ${supplierName}, I'm interested in your ${materialName}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Filter materials by category and district
  const filteredMaterials = materialItems.filter(item => {
    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const districtMatch = selectedDistrict ? item.supplier.district === selectedDistrict : true;
    return categoryMatch && districtMatch;
  });

  // Material detail view
  if (selectedItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedItem(null)}
              className="flex items-center text-black hover:text-gray-700 transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Materials
            </button>
            <h1 className="text-4xl font-bold text-black">{selectedItem.name}</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
                />
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Details</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Price per {selectedItem.unit}</div>
                      <div className="text-2xl font-bold text-yellow-600">Rs. {selectedItem.pricePerUnit.toLocaleString()}</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Availability</div>
                      <div className="text-lg font-semibold text-green-600">
                        {selectedItem.available ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Supplier Information</h2>
                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-semibold text-yellow-700">{selectedItem.supplier.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{selectedItem.supplier.name}</div>
                        <div className="text-sm text-gray-600">Material Supplier</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Location</div>
                        <div className="text-gray-600">{selectedItem.supplier.location}, {selectedItem.supplier.district}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Contact Number</div>
                        <div className="text-gray-600">{selectedItem.supplier.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg mr-4">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Total Orders</div>
                        <div className="text-gray-600">{selectedItem.supplier.totalOrders} completed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Supplier</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCall(selectedItem.supplier.phone)}
                      className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                    <button
                      onClick={() => handleMessage(selectedItem.supplier.phone, selectedItem.supplier.name, selectedItem.name)}
                      className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Message
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Connect directly with the supplier. No payment through platform - negotiate directly.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-black">
                  <h3 className="text-xl font-bold mb-4">Quick Order</h3>
                  <p className="mb-6">Need this material? Contact the supplier directly for immediate assistance.</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleCall(selectedItem.supplier.phone)}
                      className="flex-1 bg-black text-yellow-400 py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                    >
                      Call to Order
                    </button>
                    <button
                      onClick={() => handleMessage(selectedItem.supplier.phone, selectedItem.supplier.name, selectedItem.name)}
                      className="flex-1 bg-white text-black py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                    >
                      Message to Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Category listings view
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center text-black hover:text-gray-700 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Categories
            </button>

            <div className="text-center text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 capitalize">
                {selectedCategory} Suppliers
              </h1>
              <p className="text-xl text-black max-w-3xl mx-auto mb-8">
                Browse {selectedCategory} suppliers across Sri Lanka. Connect directly with verified suppliers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Location Filter */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter by Location
                </h3>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="">All Districts</option>
                  {sriLankanDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredMaterials.length} {selectedCategory} suppliers
                {selectedDistrict && ` in ${selectedDistrict} district`}
              </p>
            </div>

            {/* Materials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMaterials.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{item.supplier.rating}</span>
                      </div>
                    </div>
                    {item.available && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Available
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 text-sm">{item.supplier.name}</span>
                        <span className="text-xs text-gray-500">{item.supplier.totalOrders} orders</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.supplier.location}, {item.supplier.district}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-yellow-600">
                          Rs. {item.pricePerUnit.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">per {item.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMaterials.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No suppliers found</h3>
                <p className="text-gray-600">
                  No {selectedCategory} suppliers found
                  {selectedDistrict && ` in ${selectedDistrict} district`}. 
                  Try selecting a different location.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Categories view
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-black hover:text-gray-700 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Services
          </button>

          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Construction Materials
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto mb-8">
              Choose the type of construction material you need. Browse suppliers across Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Material Categories</h2>
            <p className="text-gray-600 text-lg">Select a category to browse suppliers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materialCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute top-4 left-4 text-4xl">{category.icon}</div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{category.description}</p>
                  
                  <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700">
                    Browse {category.name} Suppliers
                    <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};