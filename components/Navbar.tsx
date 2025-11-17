'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Stethoscope, Users, Activity, Calendar, Settings, CalendarCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import React, { useState } from 'react';

const Navbar = () => {
  const { user, logout, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [doctorName, setDoctorName] = useState<string>('');

  // Fetch doctor name from clinic profile
  React.useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const response = await fetch('/api/clinic-profile');
        if (response.ok) {
          const profile = await response.json();
          // Use doctorName from profile, fallback to user name
          setDoctorName(profile.doctorName || user?.name || 'Doctor');
        }
      } catch (error) {
        // Fallback to user name
        setDoctorName(user?.name || 'Doctor');
      }
    };

    if (isAuthenticated) {
      fetchDoctorName();
    }
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  // Don't show navbar on auth pages
  if (pathname.startsWith('/auth/')) {
    return null;
  }

  // Don't show navbar while loading or if not authenticated
  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white border-b-2 border-brand-teal shadow-sm rounded-b-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-8">
            <Link href="/patients" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="bg-brand-red p-1.5 sm:p-2 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform">
                <Stethoscope className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-brand-teal">
                Faith <span className="text-brand-yellow">Clinic</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/patients" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all font-medium">
                <Users className="h-4 w-4" />
                <span>Patients</span>
              </Link>
              <Link href="/appointments" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all font-medium">
                <CalendarCheck className="h-4 w-4" />
                <span>Appointments</span>
              </Link>
              <Link href="/calendar" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all font-medium">
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </Link>
              <Link href="/analytics" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all font-medium">
                <Activity className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1 sm:space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 bg-white rounded-lg border-2 border-brand-teal hover:bg-brand-teal/5 transition"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                {doctorName?.charAt(0).toUpperCase() || 'D'}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-brand-teal truncate max-w-[150px]">
                {doctorName || 'Doctor'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border-2 border-brand-teal top-full z-50">
                <div className="p-4 border-b-2 border-gray-100">
                  <p className="text-sm font-semibold text-brand-teal">{doctorName || user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/settings/profile"
                    onClick={() => setShowDropdown(false)}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-brand-teal hover:bg-brand-teal/10 transition font-medium text-sm"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </div>
                <div className="border-t-2 border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 transition font-medium text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;