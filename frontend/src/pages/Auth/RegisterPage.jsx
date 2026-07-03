import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Mail, Lock, ArrowRight, User, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import ThemeToggle from '../../components/common/ThemeToggle';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await authService.register(username, email, password);
      toast.success('Registered successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
      toast.error(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: 'username', label: 'Username', type: 'text', icon: User, value: username, set: setUsername, placeholder: 'yourusername' },
    { id: 'email', label: 'Email', type: 'email', icon: Mail, value: email, set: setEmail, placeholder: 'you@example.com' },
    { id: 'password', label: 'Password', type: 'password', icon: Lock, value: password, set: setPassword, placeholder: '••••••••' },
  ];

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
            <h1 className='text-2xl font-semibold tracking-tight text-slate-900'>Create your account</h1>
            <p className='mt-2 text-sm text-slate-500'>Start your AI-powered learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {fields.map(({ id, label, type, icon: Icon, value, set, placeholder }) => (
              <div key={id} className='space-y-2'>
                <label className='label'>{label}</label>
                <div className='relative'>
                  <Icon
                    className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                      focusedField === id ? 'text-brand-500' : 'text-slate-400'
                    }`}
                    strokeWidth={2}
                  />
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    onFocus={() => setFocusedField(id)}
                    onBlur={() => setFocusedField(null)}
                    className='input pl-12'
                    placeholder={placeholder}
                    required
                  />
                </div>
              </div>
            ))}

            {error && (
              <div className='rounded-xl border border-red-200 bg-red-50 p-3'>
                <p className='text-center text-xs font-medium text-red-600'>{error}</p>
              </div>
            )}

            <button type='submit' disabled={loading} className='btn btn-primary btn-lg w-full'>
              {loading ? (
                <>
                  <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className='h-4 w-4' strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <div className='mt-8 border-t border-slate-200/70 pt-6'>
            <p className='text-center text-sm text-slate-600'>
              Already have an account?{' '}
              <Link to='/login' className='font-semibold text-brand-600 hover:text-brand-700'>
                Sign in
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

export default RegisterPage;
