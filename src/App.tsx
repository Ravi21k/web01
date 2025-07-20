import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { VehiclesPage } from './components/VehiclesPage';
import { MaterialsPage } from './components/MaterialsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { SignUpPage } from './components/SignUpPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { UserDashboard } from './components/UserDashboard';
import { VehicleDetails } from './components/VehicleDetails';
import { ProfilePage } from './components/ProfilePage';
import { EnhancedPartnerDashboard } from './components/EnhancedPartnerDashboard';
import { VehicleOwnerRegistration } from './components/VehicleOwnerRegistration';
import { MaterialSupplierRegistration } from './components/MaterialSupplierRegistration';
import { ServicesListingPage } from './components/ServicesListingPage';
import { BusinessProfilePage } from './components/BusinessProfilePage';
import { AddServiceModal } from './components/AddServiceModal';
import { FeedbackModal } from './components/FeedbackModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { User, Vehicle, Partner } from './types';
import { vehicles } from './data/services';

type ViewType = 'home' | 'vehicles' | 'materials' | 'about' | 'contact' | 'signup' | 'confirmation' | 'dashboard' | 'vehicle-details' | 'profile' | 'partner-dashboard' | 'services-listing' | 'business-profile';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isVehicleRegistrationOpen, setIsVehicleRegistrationOpen] = useState(false);
  const [isMaterialRegistrationOpen, setIsMaterialRegistrationOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPartner(null);
    setCurrentView('home');
    setIsMenuOpen(false);
  };

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleShowLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleShowSignUp = () => {
    setCurrentView('signup');
  };

  const handleShowVehicleRegistration = () => {
    setIsVehicleRegistrationOpen(true);
  };

  const handleShowMaterialRegistration = () => {
    setIsMaterialRegistrationOpen(true);
  };

  const handleRegistration = (data: any) => {
    setRegistrationData(data);
    setCurrentView('confirmation');
  };

  const handleConfirmationAction = (action: 'home' | 'dashboard') => {
    if (action === 'dashboard') {
      if (registrationData?.role === 'consumer') {
        // Create user from registration data
        const newUser: User = {
          id: Date.now().toString(),
          name: registrationData.name,
          email: registrationData.email,
          phone: registrationData.phone,
          role: registrationData.role,
          isAuthenticated: true
        };
        setUser(newUser);
        setCurrentView('dashboard');
      } else {
        // For business users, go to services listing (dashboard equivalent)
        const newUser: User = {
          id: Date.now().toString(),
          name: registrationData.name,
          email: registrationData.email,
          phone: registrationData.phone,
          role: registrationData.role,
          isAuthenticated: true
        };
        setUser(newUser);
        
        const newPartner: Partner = {
          id: Date.now().toString(),
          type: registrationData.role,
          businessName: registrationData.businessName || registrationData.name,
          ownerName: registrationData.name,
          email: registrationData.email,
          phone: registrationData.phone,
          address: registrationData.address || '',
          district: registrationData.district || '',
          businessLicense: '',
          brNumber: '',
          yearsInBusiness: 0,
          description: registrationData.description || '',
          services: [],
          certifications: [],
          insuranceDetails: {
            provider: '',
            policyNumber: '',
            expiryDate: ''
          },
          documents: {
            businessLicense: null,
            insurance: null,
            brCertificate: null,
            vehiclePhotos: []
          },
          status: 'pending',
          registrationDate: new Date().toISOString(),
          rating: 4.8,
          totalJobs: 0,
          notifications: []
        };
        setPartner(newPartner);
        setCurrentView('services-listing');
      }
    } else if (action === 'profile') {
      // Create user and partner for profile view
      const newUser: User = {
        id: Date.now().toString(),
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        role: registrationData.role,
        isAuthenticated: true
      };
      setUser(newUser);
      
      const newPartner: Partner = {
        id: Date.now().toString(),
        type: registrationData.role,
        businessName: registrationData.businessName || registrationData.name,
        ownerName: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        address: registrationData.address || '',
        district: registrationData.district || '',
        businessLicense: '',
        brNumber: '',
        yearsInBusiness: 0,
        description: registrationData.description || '',
        services: registrationData.materialTypes || [],
        certifications: [],
        insuranceDetails: {
          provider: '',
          policyNumber: '',
          expiryDate: ''
        },
        documents: {
          businessLicense: null,
          insurance: null,
          brCertificate: null,
          vehiclePhotos: []
        },
        status: 'pending',
        registrationDate: new Date().toISOString(),
        rating: 4.8,
        totalJobs: 0,
        notifications: []
      };
      setPartner(newPartner);
      setCurrentView('business-profile');
    } else {
      setCurrentView('home');
    }
    setRegistrationData(null);
  };

  const handleVehicleOwnerRegistration = (data: any) => {
    setRegistrationData(data);
    setIsVehicleRegistrationOpen(false);
    setCurrentView('confirmation');
  };

  const handleMaterialSupplierRegistration = (data: any) => {
    setRegistrationData(data);
    setIsMaterialRegistrationOpen(false);
    setCurrentView('confirmation');
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentView('vehicle-details');
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  const handleUpdatePartnerProfile = (updatedData: Partial<Partner>) => {
    if (partner) {
      setPartner({ ...partner, ...updatedData });
    }
  };

  const handleAddService = (serviceData: any) => {
    console.log('Adding service:', serviceData);
    // Handle adding new service
    setIsAddServiceModalOpen(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'vehicles':
        return <VehiclesPage onSignUp={handleShowSignUp} onVehicleOwnerSignUp={handleShowVehicleRegistration} />;
      case 'materials':
        return <MaterialsPage onSignUp={handleShowSignUp} onMaterialSupplierSignUp={handleShowMaterialRegistration} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'signup':
        return (
          <SignUpPage 
            onRegistration={handleRegistration}
            onVehicleOwnerSignUp={handleShowVehicleRegistration}
            onMaterialSupplierSignUp={handleShowMaterialRegistration}
          />
        );
      case 'confirmation':
        return <ConfirmationPage onAction={handleConfirmationAction} registrationData={registrationData} />;
      case 'dashboard':
        return user ? <UserDashboard user={user} onVehicleSelect={handleVehicleSelect} /> : <HomePage />;
      case 'partner-dashboard':
        return partner ? <EnhancedPartnerDashboard partner={partner} onLogout={handleLogout} /> : <HomePage onLogin={handleShowLogin} onSignUp={handleShowSignUp} />;
      case 'services-listing':
        return <ServicesListingPage onBack={() => setCurrentView('home')} />;
      case 'business-profile':
        return partner ? (
          <BusinessProfilePage 
            partner={partner} 
            onUpdateProfile={handleUpdatePartnerProfile}
            onBack={() => setCurrentView('services-listing')}
            onAddService={() => setIsAddServiceModalOpen(true)}
            onViewFeedback={() => setIsFeedbackModalOpen(true)}
          />
        ) : <HomePage onLogin={handleShowLogin} onSignUp={handleShowSignUp} />;
      case 'vehicle-details':
        return selectedVehicle ? (
          <VehicleDetails 
            vehicle={selectedVehicle} 
            onBack={() => setCurrentView('dashboard')} 
          />
        ) : <HomePage onLogin={handleShowLogin} onSignUp={handleShowSignUp} />;
      case 'profile':
        return user ? (
          <ProfilePage 
            user={user} 
            onUpdateProfile={handleUpdateProfile}
            onBack={() => setCurrentView('dashboard')}
          />
        ) : <HomePage onLogin={handleShowLogin} onSignUp={handleShowSignUp} />;
      default:
        return <HomePage onLogin={handleShowLogin} onSignUp={handleShowSignUp} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Only show header for certain views */}
      {currentView !== 'confirmation' && currentView !== 'business-profile' && (
        <Header
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          currentView={currentView}
          onNavigate={handleNavigation}
          onShowLogin={handleShowLogin}
          onShowSignUp={handleShowSignUp}
        />
      )}

      {renderCurrentView()}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
      
      <VehicleOwnerRegistration
        isOpen={isVehicleRegistrationOpen}
        onClose={() => setIsVehicleRegistrationOpen(false)}
        onSubmit={handleVehicleOwnerRegistration}
      />
      
      <MaterialSupplierRegistration
        isOpen={isMaterialRegistrationOpen}
        onClose={() => setIsMaterialRegistrationOpen(false)}
        onSubmit={handleMaterialSupplierRegistration}
      />
      
      {partner && (
        <>
          <AddServiceModal
            isOpen={isAddServiceModalOpen}
            onClose={() => setIsAddServiceModalOpen(false)}
            partner={partner}
            onSubmit={handleAddService}
          />
          
          <FeedbackModal
            isOpen={isFeedbackModalOpen}
            onClose={() => setIsFeedbackModalOpen(false)}
            partner={partner}
          />
        </>
      )}
      
      {/* Only show footer for certain views */}
      {currentView !== 'confirmation' && currentView !== 'business-profile' && (
        <Footer onNavigate={handleNavigation} />
      )}
    </div>
  );
}

export default App;