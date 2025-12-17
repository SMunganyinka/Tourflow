import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import type { RegisterRequest } from '../../types';
import { UserRole } from '../../types/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, isLoading, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const password = watch('password');

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUser(data);
      toast.success(t('auth.register.success'));
      
      // Smart redirect based on user role
      if (user?.role === UserRole.ADMIN) {
        navigate('/dashboard', { replace: true });
      } else {
        // For regular users, redirect to destinations page
        navigate('/destinations', { replace: true });
      }
    } catch (error) {
      toast.error(t('auth.register.error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            {t('auth.register.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.register.subtitle')}{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              {t('auth.register.signInLink')}
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="full_name"
            type="text"
            label={t('auth.register.nameLabel')}
            placeholder={t('auth.register.namePlaceholder')}
            icon={<FaUser />}
            error={errors.full_name?.message}
            {...register('full_name', {
              required: t('auth.register.nameRequired'),
            })}
          />

          <Input
            id="username"
            type="text"
            label={t('auth.register.usernameLabel')}
            placeholder={t('auth.register.usernamePlaceholder')}
            icon={<FaUser />}
            error={errors.username?.message}
            {...register('username', {
              required: t('auth.register.usernameRequired'),
              minLength: {
                value: 3,
                message: t('auth.register.usernameMinLength'),
              },
            })}
          />

          <Input
            id="email"
            type="email"
            label={t('auth.register.emailLabel')}
            placeholder={t('auth.register.emailPlaceholder')}
            icon={<FaEnvelope />}
            error={errors.email?.message}
            {...register('email', {
              required: t('auth.register.emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('auth.register.emailInvalid'),
              },
            })}
          />

          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label={t('auth.register.passwordLabel')}
            placeholder={t('auth.register.passwordPlaceholder')}
            icon={<FaLock />}
            error={errors.password?.message}
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
            {...register('password', {
              required: t('auth.register.passwordRequired'),
              minLength: {
                value: 8,
                message: t('auth.register.passwordMinLength'),
              },
            })}
          />

          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label={t('auth.register.confirmPasswordLabel')}
            placeholder={t('auth.register.confirmPasswordPlaceholder')}
            icon={<FaLock />}
            error={errors.confirmPassword?.message}
            showPasswordToggle={true}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            {...register('confirmPassword', {
              required: t('auth.register.confirmPasswordRequired'),
              validate: value =>
                value === password || t('auth.register.passwordsDoNotMatch'),
            })}
          />

          <div className="flex items-center">
            <input
              id="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              {...register('agree_terms', {
                required: t('auth.register.agreeToTermsRequired'),
              })}
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              {t('auth.register.agreeToTerms')}{' '}
              <Link
                to="/terms"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {t('auth.register.termsAndConditions')}
              </Link>
            </label>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              {t('auth.register.signUp')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;