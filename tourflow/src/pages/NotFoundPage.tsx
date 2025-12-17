import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t('notFound.title')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('notFound.message')}
        </p>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            <FaHome className="mr-2" />
            {t('notFound.goHome')}
          </Link>
          <Link 
            to="/destinations" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <FaSearch className="mr-2" />
            {t('notFound.browseDestinations')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;