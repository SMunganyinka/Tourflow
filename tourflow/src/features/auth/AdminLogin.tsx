// src/pages/AdminLoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaUser, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

// Define form data type
interface AdminLoginForm {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginForm>();

// src/pages/AdminLoginPage.tsx
const onSubmit = async (data: AdminLoginForm) => {
  try {
    const response = await login({ ...data, isAdmin: true });
     console.log('Login response:', response); // Add this line
    
    
    // Check if login was successful (token exists)
    if (response && response.access_token) {
      toast.success('Admin login successful');
      navigate('/dashboard', { replace: true });
    } else {
      toast.error('Invalid admin credentials');
      setLoginAttempts(prev => prev + 1);
    }
  } catch (error: any) {
     console.error('Login error:', error); // Add this line
    setLoginAttempts(prev => prev + 1);
    
    if (loginAttempts >= 2) {
      toast.error('Too many failed attempts. Account temporarily locked.');
    } else {
      toast.error('Invalid admin credentials');
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Background Pattern - Lighter for white background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-8">
          {/* Back to User Login */}
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to User Login
          </Link>
          
          <div className="text-center mb-8">
            <FaShieldAlt className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h1>
            <p className="text-sm text-gray-600">
              Authorized administrators only
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="Admin Email"
              placeholder="admin@example.com"
              icon={<FaUser />}
              error={errors.email?.message}
              {...register('email', { 
                required: 'Admin email is required' 
              })}
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Admin Password"
              placeholder="Enter your admin password"
              icon={<FaLock />}
              error={errors.password?.message}
              showPasswordToggle={true}
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register('password', { 
                required: 'Admin password is required' 
              })}
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
            />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-admin"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-admin" className="ml-2 block text-gray-700">
                  Remember me
                </label>
              </div>

              <div>
                <Link
                  to="/admin-forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              isLoading={isLoading}
              disabled={loginAttempts >= 2}
            >
              {loginAttempts >= 2 ? 'Account Locked' : 'Sign In to Admin'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This system is monitored. Unauthorized access attempts will be logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;