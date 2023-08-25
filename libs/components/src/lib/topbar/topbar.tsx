'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

/* eslint-disable-next-line */
export interface TopbarProps {}

export function Topbar(props: TopbarProps) {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<string>('');
  const [user, setUser] = useState<any>({});

  const pathname = usePathname();

  useEffect(() => {
    setActiveMenu(pathname.split('/')[1]);

    getProfile();
  }, []);

  const handleSetActiveMenu = (menuName: string) => {
    setActiveMenu(menuName);
  };

  const handleLogout = () => {
    Cookies.remove('auth-key');

    router.push('/login');
  };

  const getProfile = async () => {
    const enpoint = 'http://localhost:3000/api/authentications/me';

    const response = await fetch(enpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
    });

    const data = await response.json();

    setUser(data.data);
  };

  return (
    <div className="bg-gray-600 p-4 text-white">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/dashboard" passHref>
              <div
                onClick={() => handleSetActiveMenu('dashboard')}
                className={`cursor-pointer ${
                  activeMenu === 'dashboard'
                    ? 'font-bold underline'
                    : 'text-white hover:underline'
                }`}
              >
                Dashboard
              </div>
            </Link>
            {user.role === 'ADMIN' && (
              <Link href="/users-management" passHref>
                <div
                  onClick={() => handleSetActiveMenu('users-management')}
                  className={`cursor-pointer ${
                    activeMenu === 'users-management'
                      ? 'font-bold underline'
                      : 'text-white hover:underline'
                  }`}
                >
                  Users
                </div>
              </Link>
            )}
            <Link href="/contacts-management" passHref>
              <div
                onClick={() => handleSetActiveMenu('contacts-management')}
                className={`cursor-pointer ${
                  activeMenu === 'contacts-management'
                    ? 'font-bold underline'
                    : 'text-white hover:underline'
                }`}
              >
                Contacts
              </div>
            </Link>
            <Link href="/contact-groups-management" passHref>
              <div
                onClick={() => handleSetActiveMenu('contact-groups-management')}
                className={`cursor-pointer ${
                  activeMenu === 'contact-groups-management'
                    ? 'font-bold underline'
                    : 'text-white hover:underline'
                }`}
              >
                Contact Groups
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <p className="pr-3">Hi, {user.name}!</p>
            <button
              onClick={() => handleLogout()}
              className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-purple-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
