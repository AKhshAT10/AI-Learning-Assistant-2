import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Buttons';
import Spinner from '../../components/common/Spinner';
import authService from '../../services/authService';
import toast from 'react-hot-toast';
import { User, Mail, Lock } from 'lucide-react';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(()=>{
    const fetchProfile = async () => {
      try{
        const {data} = await authService.getProfile();
        setUsername(data.username);
        setEmail(data.email);
      }catch(error){
        toast.error("Failed to fetch profile data");
        console.error(error);
      }finally{
        setLoading(false);
      }
    };
    fetchProfile();
  },[]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if(newPassword !== confirmNewPassword){
      toast.error("new passwords do not match");
      return;
    }
    if(newPassword.length<6){
      toast.error("new password must be atleast 6 characters long");
      return;
    }
    setPasswordLoading(true);
    try{
      await authService.changePassword({currentPassword,newPassword});
      toast.success("password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }catch(error){
      toast.error(error.message || "failed to change password");
    }finally{
      setPasswordLoading(false);
    }
    // implement password change logic
  };

  if(loading){
    return <Spinner/>
  }



  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Manage your account and security"
      />

      <div className='space-y-6'>
        {/* Account Information */}
        <div className='card p-6 md:p-8'>
          <h3 className='text-lg font-semibold tracking-tight text-slate-900 mb-6'>
            Account Information
          </h3>
          <div className='space-y-5'>
            <div>
              <label className='label'>Username</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
                  <User className='h-4 w-4 text-slate-400'/>
                </div>
                <div className='input pl-10 flex items-center bg-slate-50 text-slate-700'>
                  {username}
                </div>
              </div>
            </div>

            <div>
              <label className='label'>Email Address</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
                  <Mail className='h-4 w-4 text-slate-400'/>
                </div>
                <div className='input pl-10 flex items-center bg-slate-50 text-slate-700'>
                  {email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className='card p-6 md:p-8'>
          <h3 className='text-lg font-semibold tracking-tight text-slate-900 mb-6'>
            Change Password
          </h3>
          <form onSubmit={handleChangePassword} className='space-y-5'>
            <div>
              <label className='label'>Current Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
                  <Lock className='h-4 w-4 text-slate-400'/>
                </div>
                <input
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className='input pl-10'
                />
              </div>
            </div>

            <div>
              <label className='label'>New Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
                  <Lock className='h-4 w-4 text-slate-400'/>
                </div>
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className='input pl-10'
                />
              </div>
            </div>

            <div>
              <label className='label'>Confirm New Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
                  <Lock className='h-4 w-4 text-slate-400'/>
                </div>
                <input
                  type='password'
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className='input pl-10'
                />
              </div>
            </div>

            <div className='flex justify-end pt-1'>
              <Button type='submit' disabled={passwordLoading}>
                {passwordLoading ? "Changing..." : "Change password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;