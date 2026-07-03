import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { Mail, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import ThemeToggle from '../../components/common/ThemeToggle';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      login(user, token);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to login, please check your credentials');
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -top-24 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/45 to-violet-200/35 blur-3xl' />
        <div className='absolute inset-0 dot-grid opacity-40' />
      </div>

      <ThemeToggle className='absolute right-5 top-5 z-10' />

      <div className='w-full max-w-md reveal'>
        <div className='card p-10'>
          <div className='mb-9 text-center'>
            <Link to='/' className='mb-5 inline-flex brand-tile h-14 w-14'>
              <GraduationCap className='h-7 w-7' strokeWidth={2.2} />
            </Link>
            <h1 className='text-2xl font-semibold tracking-tight text-slate-900'>Welcome back</h1>
            <p className='mt-2 text-sm text-slate-500'>Sign in to continue studying</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <label className='label'>Email</label>
              <div className='relative'>
                <Mail
                  className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                    focusedField === 'email' ? 'text-brand-500' : 'text-slate-400'
                  }`}
                  strokeWidth={2}
                />
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className='input pl-12'
                  placeholder='you@example.com'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='label'>Password</label>
              <div className='relative'>
                <Lock
                  className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                    focusedField === 'password' ? 'text-brand-500' : 'text-slate-400'
                  }`}
                  strokeWidth={2}
                />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className='input pl-12'
                  placeholder='••••••••'
                  required
                />
              </div>
            </div>

            {error && (
              <div className='rounded-xl border border-red-200 bg-red-50 p-3'>
                <p className='text-center text-xs font-medium text-red-600'>{error}</p>
              </div>
            )}

            <button type='submit' disabled={loading} className='btn btn-primary btn-lg w-full'>
              {loading ? (
                <>
                  <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className='h-4 w-4' strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <div className='mt-8 border-t border-slate-200/70 pt-6'>
            <p className='text-center text-sm text-slate-600'>
              Don't have an account?{' '}
              <Link to='/register' className='font-semibold text-brand-600 hover:text-brand-700'>
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className='mt-6 text-center text-xs text-slate-400'>
          By continuing, you agree to our terms and privacy policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
