import React from 'react';
import { useTranslation } from 'react-i18next';

const Offline: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('you_are_offline')}</h1>
        <p className="text-gray-600 mb-4">{t('check_internet_connection')}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
        >
          {t('try_again')}
        </button>
      </div>
    </div>
  );
};

export default Offline;