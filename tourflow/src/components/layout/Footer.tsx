import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaGlobeAmericas, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <FaGlobeAmericas className="text-4xl text-primary-400" />
                  <div className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-30"></div>
                </div>
                <span className="text-3xl font-bold">TourFlow</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaMapMarkerAlt className="text-primary-400" />
                  <span>KN27, Norrsken, Kigali City, Rwanda</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaPhone className="text-primary-400" />
                  <span>+250 788 123 456</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaEnvelope className="text-primary-400" />
                  <span>info@tourflow.com</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-700 hover:bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <FaFacebookF />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <FaInstagram />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <FaYoutube />
                </a>
              </div>
            </div>
            
            {/* Explore */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative pb-2">
                {t('footer.explore')}
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary-400"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/destinations" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.destinations')}
                  </Link>
                </li>
                <li>
                  <Link to="/experiences" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.experiences')}
                  </Link>
                </li>
                <li>
                  <Link to="/travel-guides" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.travelGuides')}
                  </Link>
                </li>
                <li>
                  <Link to="/special-offers" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.specialOffers')}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative pb-2">
                {t('footer.company')}
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary-400"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.aboutUs')}
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.careers')}
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.press')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                    {t('footer.contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
        
          
          {/* Copyright */}
          <div className="border-t border-gray-700 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} TourFlow. {t('footer.allRightsReserved')}
              </p>
           
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default Footer;