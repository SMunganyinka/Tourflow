import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaGlobeAmericas, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt, 
  FaShieldAlt,
  FaBell
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../features/auth/LanguageContext';
import { UserRole, User } from '../../types/auth'; // Make sure these types exist
import Button from '../common/Button';

// --- Extracted Components for Cleanliness ---

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { changeLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    changeLanguage(lang);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition px-3 py-2 rounded-lg hover:bg-gray-100">
        <span>{i18n.language === 'en' ? 'EN' : 'ES'}</span>
      </button>
      <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <button
          onClick={() => handleLanguageChange('en')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          English
        </button>
        <button
          onClick={() => handleLanguageChange('es')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Español
        </button>
      </div>
    </div>
  );
};

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition px-3 py-2 rounded-lg hover:bg-gray-100">
        <FaUser />
        <span>{user.full_name}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <Link to="/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          {t('header.profile')}
        </Link>
        <Link to="/my-bookings" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          {t('header.myBookings')}
        </Link>
        {user.role === UserRole.ADMIN && (
          <Link to="/admin/dashboard" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {t('header.dashboard')}
          </Link>
        )}
        <hr className="my-1" />
        <button onClick={onLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <FaSignOutAlt className="mr-2" />
          {t('header.logout')}
        </button>
      </div>
    </div>
  );
};

// --- Main Header Component ---

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock notifications - replace with real data from your API
  const [notifications] = useState([
    { id: 1, message: 'Your booking to Bali is confirmed!' },
  ]);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

 

  return (
    <header className="bg-gradient-to-r from-blue-50 to-teal-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FaGlobeAmericas className="text-3xl text-primary-600 transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-2xl font-bold text-gray-800">TourFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/destinations" 
              className={`transition ${
                location.pathname.startsWith('/destinations') 
                  ? 'text-primary-600 font-semibold border-b-2 border-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              {t('header.destinations')}
            </Link>
            <Link 
              to="/experiences" 
              className={`transition ${
                location.pathname.startsWith('/experiences') 
                  ? 'text-primary-600 font-semibold border-b-2 border-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              {t('header.experiences')}
            </Link>
            <Link 
              to="/about" 
              className={`transition ${
                location.pathname === '/about' 
                  ? 'text-primary-600 font-semibold border-b-2 border-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              {t('header.about')}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />

            {/* Smart Admin Link */}
            <Link
              to={isAuthenticated && user?.role === UserRole.ADMIN ? "/admin/dashboard" : "/admin/login"}
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <FaShieldAlt className="text-sm" />
              <span className="text-sm font-medium">Admin</span>
            </Link>

            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-primary-600 transition p-2 rounded-lg hover:bg-gray-100">
                    <FaBell />
                    {notifications.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
                  </button>
                  {/* Notification Dropdown */}
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-800">{t('header.notifications')}</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div key={n.id} className="p-3 hover:bg-gray-50 border-b border-gray-100">
                            <p className="text-sm text-gray-700">{n.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">{t('header.noNotifications')}</div>
                      )}
                    </div>
                  </div>
                </div>
                <UserMenu user={user} onLogout={handleLogout} />
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login"><Button variant="outline" size="sm">{t('header.login')}</Button></Link>
                <Link to="/register"><Button size="sm">{t('header.register')}</Button></Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="flex flex-col px-4 py-2 space-y-1">
              <Link to="/destinations" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>{t('header.destinations')}</Link>
              <Link to="/experiences" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>{t('header.experiences')}</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>{t('header.about')}</Link>
              
              <hr className="my-2" />

              {isAuthenticated && user ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>{t('header.profile')}</Link>
                  <Link to="/my-bookings" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>{t('header.myBookings')}</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600">{t('header.logout')}</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>{t('header.login')}</Link>
                  <Link to="/register" className="block px-3 py-2 text-gray-700 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>{t('header.register')}</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;