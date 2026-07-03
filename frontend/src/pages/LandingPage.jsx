import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    FileText,
    MessagesSquare,
    Sparkles,
    BookOpen,
    Target,
    ShieldCheck,
    GraduationCap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GraduationCap3D from '../components/landing/GraduationCap3D';
import ThemeToggle from '../components/common/ThemeToggle';

const features = [
    {
        icon: FileText,
        title: 'Upload anything',
        text: 'Drop in a PDF and Preppy reads it end to end, ready to work with your material in seconds.',
    },
    {
        icon: Sparkles,
        title: 'Instant summaries',
        text: 'Turn dense chapters into clear, concise summaries so you grasp the essentials fast.',
    },
    {
        icon: BookOpen,
        title: 'Smart flashcards',
        text: 'Auto-generated cards with spaced review help the important ideas actually stick.',
    },
    {
        icon: Target,
        title: 'Adaptive quizzes',
        text: 'Test yourself with generated quizzes and get detailed, explained results every time.',
    },
    {
        icon: MessagesSquare,
        title: 'Chat with your notes',
        text: 'Ask questions and get grounded answers that cite the parts of your document that matter.',
    },
    {
        icon: ShieldCheck,
        title: 'Yours, privately',
        text: 'Your library stays tied to your account: organised, secure, and always within reach.',
    },
];

const steps = [
    { n: '01', title: 'Add your document', text: 'Upload a PDF of your notes, textbook, or slides.' },
    { n: '02', title: 'Let Preppy study it', text: 'Summaries, flashcards, and quizzes are generated for you.' },
    { n: '03', title: 'Learn and track', text: 'Review, test yourself, and watch your progress grow.' },
];

const LandingPage = () => {
    const { isAuthenticated } = useAuth();

    const primaryCta = isAuthenticated
        ? { to: '/dashboard', label: 'Go to dashboard' }
        : { to: '/register', label: 'Get started free' };

    return (
        <div className='min-h-screen bg-canvas text-slate-900'>
            {/* Nav */}
            <header className='sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl'>
                <nav className='mx-auto flex h-16 max-w-6xl items-center justify-between px-5'>
                    <Link to='/' className='flex items-center gap-2.5'>
                        <span className='brand-tile h-9 w-9'>
                            <GraduationCap className='h-5 w-5' strokeWidth={2.4} />
                        </span>
                        <span className='text-lg font-bold tracking-tight'>Preppy</span>
                    </Link>
                    <div className='flex items-center gap-2'>
                        <ThemeToggle />
                        {isAuthenticated ? (
                            <Link to='/dashboard' className='btn btn-primary btn-sm px-4'>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to='/login' className='btn btn-ghost btn-sm px-4'>
                                    Sign in
                                </Link>
                                <Link to='/register' className='btn btn-primary btn-sm px-4'>
                                    Get started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className='relative overflow-hidden'>
                {/* Ambient brand glow */}
                <div className='pointer-events-none absolute inset-0 -z-10'>
                    <div className='absolute -top-32 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/50 to-violet-200/40 blur-3xl' />
                    <div className='absolute inset-0 dot-grid opacity-40' />
                </div>

                <div className='mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-16 lg:grid-cols-2 lg:pt-24'>
                    <div className='text-center lg:text-left'>
                        <span className='reveal reveal-1 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700'>
                            <Sparkles className='h-3.5 w-3.5' strokeWidth={2.5} />
                            AI-powered learning
                        </span>
                        <h1 className='reveal reveal-2 mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl'>
                            Turn your notes into a{' '}
                            <span className='bg-gradient-to-r from-brand-500 to-brand-teal bg-clip-text text-transparent'>
                                study superpower
                            </span>
                        </h1>
                        <p className='reveal reveal-3 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0'>
                            Preppy reads your documents and builds summaries, flashcards, and
                            quizzes around them, then answers your questions like a tutor who
                            has actually done the reading.
                        </p>
                        <div className='reveal reveal-4 mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start'>
                            <Link to={primaryCta.to} className='btn btn-primary btn-lg w-full sm:w-auto'>
                                {primaryCta.label}
                                <ArrowRight className='h-4 w-4' strokeWidth={2.5} />
                            </Link>
                            {!isAuthenticated && (
                                <Link to='/login' className='btn btn-outline btn-lg w-full sm:w-auto'>
                                    I already have an account
                                </Link>
                            )}
                        </div>
                        <p className='reveal reveal-4 mt-5 text-sm text-slate-400'>
                            Free to start · No credit card required
                        </p>
                    </div>

                    {/* 3D cap */}
                    <div className='flex justify-center lg:justify-end'>
                        <GraduationCap3D />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className='mx-auto max-w-6xl px-5 py-16'>
                <div className='mx-auto max-w-2xl text-center'>
                    <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                        Everything you need to learn faster
                    </h2>
                    <p className='mt-4 text-lg text-slate-600'>
                        One clean workspace that does the busywork, so you can focus on
                        understanding.
                    </p>
                </div>

                <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {features.map(({ icon: Icon, title, text }) => (
                        <div key={title} className='card card-hover p-6'>
                            <span className='brand-tile mb-5 h-11 w-11'>
                                <Icon className='h-5 w-5' strokeWidth={2} />
                            </span>
                            <h3 className='text-lg font-semibold text-slate-900'>{title}</h3>
                            <p className='mt-2 text-sm leading-relaxed text-slate-600'>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className='mx-auto max-w-6xl px-5 py-16'>
                <div className='mx-auto max-w-2xl text-center'>
                    <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                        Up and running in three steps
                    </h2>
                </div>
                <div className='mt-12 grid gap-5 md:grid-cols-3'>
                    {steps.map((s) => (
                        <div key={s.n} className='card p-7'>
                            <span className='text-4xl font-bold text-brand-500/25'>{s.n}</span>
                            <h3 className='mt-3 text-lg font-semibold text-slate-900'>{s.title}</h3>
                            <p className='mt-2 text-sm leading-relaxed text-slate-600'>{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA band */}
            <section className='mx-auto max-w-6xl px-5 pb-20'>
                <div className='relative overflow-hidden rounded-3xl px-8 py-14 text-center text-white'
                     style={{ backgroundImage: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}>
                    <div className='pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl' />
                    <div className='pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-black/10 blur-2xl' />
                    <h2 className='relative text-3xl font-bold tracking-tight sm:text-4xl'>
                        Ready to study smarter?
                    </h2>
                    <p className='relative mx-auto mt-4 max-w-xl text-white/90'>
                        Join Preppy and turn the material you already have into your most
                        effective study tool yet.
                    </p>
                    <Link
                        to={primaryCta.to}
                        className='relative mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-brand-700 shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-95'
                    >
                        {primaryCta.label}
                        <ArrowRight className='h-4 w-4' strokeWidth={2.5} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className='border-t border-slate-200/70'>
                <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row'>
                    <div className='flex items-center gap-2.5'>
                        <span className='brand-tile h-8 w-8'>
                            <GraduationCap className='h-4 w-4' strokeWidth={2.4} />
                        </span>
                        <span className='font-bold tracking-tight'>Preppy</span>
                    </div>
                    <p className='text-sm text-slate-400'>
                        © {new Date().getFullYear()} Preppy. Study smarter with AI.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
