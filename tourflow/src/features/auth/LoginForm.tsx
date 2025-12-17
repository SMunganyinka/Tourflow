// src/features/auth/LoginForm.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import type { LoginRequest } from '../../types';
import Input from '../../components/ui/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, user } = useAuth(); // Get user from the hook
  const [showPassword, setShowPassword] = useState(false);

  // Get the location they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/destinations';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  // This effect handles the redirect after the user object is updated
  useEffect(() => {
    // Only redirect if the user object exists (login successful and data fetched)
    // and if they are not an admin (who should go to the dashboard)
    if (user && !user.is_admin) {
      toast.success(t('auth.login.success'));
      navigate(from, { replace: true });
    }
  }, [user, navigate, from, t]); // Rerun when the user object changes

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      // The navigation is now handled by the useEffect hook above.
      // We don't need to do anything here on success.
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || t('auth.login.error');
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid gap-10 md:grid-cols-2 items-center">
        {/* Left: Brand / Explanation */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {t('auth.login.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto md:mx-0">
            {t('auth.login.subtitle')}
          </p>
          <p className="text-sm text-gray-700">
            {t('auth.login.subtitle')}{' '}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-500 underline-offset-2 hover:underline"
            >
              {t('auth.login.signUpLink')}
            </Link>
          </p>
        </div>

        {/* Right: Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label={t('auth.login.emailLabel')}
              placeholder={t('auth.login.emailPlaceholder')}
              icon={<FaEnvelope />}
              error={errors.email?.message}
              {...register('email', {
                required: t('auth.login.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('auth.login.emailInvalid'),
                },
              })}
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label={t('auth.login.passwordLabel')}
              placeholder={t('auth.login.passwordPlaceholder')}
              icon={<FaLock />}
              error={errors.password?.message}
              showPasswordToggle={true}
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register('password', {
                required: t('auth.login.passwordRequired'),
                minLength: {
                  value: 8,
                  message: t('auth.login.passwordMinLength'),
                },
              })}
            />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                  {t('auth.login.rememberMe')}
                </label>
              </div>

              <div>
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                {t('auth.login.signIn')}
              </Button>
              
              <div className="text-center">
                <Link
                  to="/admin/login"
                  className="group inline-flex items-center justify-center text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <FaUserShield className="mr-2 h-4 w-4 group-hover:text-primary-600" />
                  {t('auth.login.adminLogin')}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;