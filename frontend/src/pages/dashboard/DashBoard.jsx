import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner.jsx';
import PageHeader from '../../components/common/PageHeader';
import progressService from '../../services/progressService.js';
import toast from 'react-hot-toast';
import { FileText, BookOpen, BrainCircuit, TrendingUp, Clock } from 'lucide-react';

const DashBoard = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardData();
        console.log("Data__getDashboardData", data);
        setDashboardData(data.data);
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!dashboardData || !dashboardData.overview) {
    return (
      <div className='card p-10 text-center'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4'>
          <TrendingUp className='w-8 h-8 text-slate-400' />
        </div>
        <p className='text-slate-600 text-sm'>No dashboard data available</p>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Documents',
      value: dashboardData.overview.totalDocuments,
      icon: FileText,
      gradient: 'from-blue-400 to-cyan-500',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      label: 'Total Flashcards',
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      gradient: 'from-purple-400 to-pink-500',
      shadowColor: 'shadow-purple-500/25'
    },
    {
      label: 'Total Quizzes',
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      gradient: 'from-brand-400 to-brand-teal',
      shadowColor: 'shadow-brand-500/25'
    }
  ];

  return (
    <div className='reveal'>
      <PageHeader
        title='Dashboard'
        subtitle='Track your learning progress and activity'
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='card card-hover p-6 flex flex-col gap-4'
          >
            <div className='flex items-center justify-between'>
              <span className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
                {stat.label}
              </span>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center justify-center`}>
                <stat.icon className='w-5 h-5 text-white' strokeWidth={2} />
              </div>
            </div>
            <div className='text-3xl font-semibold text-slate-900 tracking-tight'>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className='card p-6 md:p-8'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center'>
            <Clock className='w-5 h-5 text-slate-600' strokeWidth={2} />
          </div>
          <h3 className='text-xl font-medium text-slate-900 tracking-tight'>
            Recent Activity
          </h3>
        </div>

        {dashboardData.recentActivity &&
          (dashboardData.recentActivity.documents.length > 0 ||
            dashboardData.recentActivity.quizzes.length > 0) ? (

          <div className='space-y-3'>
            {[
              ...(dashboardData.recentActivity.documents || []).map(doc => ({
                id: doc._id,
                description: doc.title,
                timestamp: doc.lastAccessed,
                link: `/documents/${doc._id}`,
                type: 'document'
              })),
              ...(dashboardData.recentActivity.quizzes || []).map(quiz => ({
                id: quiz._id,
                description: quiz.title,
                timestamp: quiz.lastAttempted,
                link: `/quizzes/${quiz._id}`,
                type: 'quiz'
              }))
            ]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((activity, index) => (
                <div
                  key={activity.id || index}
                  className='group flex items-center justify-between p-4 rounded-xl border border-slate-200/70 hover:bg-slate-50 hover:border-slate-300/70 transition-all duration-200'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === 'document'
                            ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                            : 'bg-gradient-to-r from-brand-400 to-brand-teal'
                        }`}
                      />
                      <p className='text-sm font-medium text-slate-900 truncate'>
                        {activity.type === 'document' ? 'Accessed Document ' : 'Attempted Quiz '}
                        <span className='text-slate-700'>
                          {activity.description}
                        </span>
                      </p>
                    </div>
                    <p className='text-xs text-slate-500 pl-4'>
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>

                  {activity.link && (
                    <Link
                      to={activity.link}
                      className='btn btn-ghost btn-sm ml-4 text-brand-600 hover:text-brand-700 whitespace-nowrap'
                    >
                      View
                    </Link>
                  )}
                </div>
              ))}
          </div>

        ) : (
          <div className='text-center py-12'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4'>
              <Clock className='w-8 h-8 text-slate-400' />
            </div>
            <p className='text-sm text-slate-600'>No recent activity yet</p>
            <p className='text-xs text-slate-500 mt-1'>
              Start learning to see your progress here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
