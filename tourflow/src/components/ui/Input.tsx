// src/components/ui/Input.tsx
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    id,
    type,
    label,
    placeholder,
    icon,
    error,
    showPasswordToggle = false,
    onTogglePassword,
    className = '',
    ...rest 
  }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type={type}
            className={`block w-full text-base font-medium ${
              icon ? 'pl-12' : 'pl-4'
            } ${
              showPasswordToggle ? 'pr-12' : 'pr-4'
            } py-2 border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 focus:ring-2 transition-colors duration-200 ${
              error ? 'border-red-300' : 'border-gray-300'
            } ${className}`}
            placeholder={placeholder}
            {...rest}
          />
          {showPasswordToggle && onTogglePassword && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={onTogglePassword}
            >
              {type === 'password' ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;