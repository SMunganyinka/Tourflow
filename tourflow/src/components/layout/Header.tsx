import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobeAmericas, FaBars, FaTimes, FaUser, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../features/auth/LanguageContext';
import { UserRole } from '../../types/auth';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const { changeLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    changeLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaGlobeAmericas className="text-3xl text-primary-600" />
            <span className="text-2xl font-bold text-gray-800">TourFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/destinations" className="text-gray-700 hover:text-primary-600 transition">
              {t('header.destinations')}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
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

            {/* Admin Portal Link - ALWAYS VISIBLE */}
            <Link
              to="/admin/login"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <FaShieldAlt className="text-sm" />
              <span className="text-sm font-medium">Admin</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition px-3 py-2 rounded-lg hover:bg-gray-100">
                  <FaUser />
                  <span>{user.full_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('header.profile')}
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('header.myBookings')}
                  </Link>
                  {user.role === UserRole.ADMIN && (
                    <Link
                      to="/dashboard"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('header.dashboard')}
                    </Link>
                  )}
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" />
                    {t('header.logout')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t('header.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    {t('header.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden overflow-hidden transition-all duration-300">
            <div className="py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/destinations"
                  className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.destinations')}
                </Link>
                <Link
                  to="/experiences"
                  className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.experiences')}
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.about')}
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.contact')}
                </Link>
                
                <Link
                  to="/admin/login"
                  className="flex items-center text-gray-700 hover:text-primary-600 transition px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaShieldAlt className="mr-2 text-sm" />
                  Admin Portal
                </Link>
                
                <hr className="my-2" />
                
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('header.profile')}
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('header.myBookings')}
                    </Link>
                    {user.role === UserRole.ADMIN && (
                      <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t('header.dashboard')}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-gray-700 hover:text-primary-600 transition px-4 py-2"
                    >
                      <FaSignOutAlt className="mr-2" />
                      {t('header.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('header.login')}
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-700 hover:text-primary-600 transition px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('header.register')}
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;