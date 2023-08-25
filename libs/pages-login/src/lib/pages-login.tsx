'use client';

import { Button, Input } from '@test-backend-insignia-nx-nest-next/components';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

/* eslint-disable-next-line */
export interface PagesLoginProps {}

export function PagesLogin(props: PagesLoginProps) {
  const router = useRouter();

  const loginFields = [
    {
      labelText: 'Email address',
      labelFor: 'email',
      id: 'email',
      name: 'email',
      type: 'email',
      autoComplete: 'email',
      isRequired: true,
      placeholder: 'Email address',
    },
    {
      labelText: 'Password',
      labelFor: 'password',
      id: 'password',
      name: 'password',
      type: 'password',
      autoComplete: 'current-password',
      isRequired: true,
      placeholder: 'Password',
    },
  ];

  const [loginState, setLoginState] = useState(
    loginFields
      .map((field) => ({ [field.id]: '' }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  );

  const [errorState, setErrorState] = useState('');

  const handleChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    const enpoint = 'http://localhost:3000/api/authentications/login';

    fetch(enpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginState),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.status !== '201') {
          setErrorState(data.message);
          return
        }

        Cookies.set('auth-key', data.data.accessToken);

        router.push('/dashboard');
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            Don't have an account yet?{' '}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Register
            </Link>
          </p>

          {errorState && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {errorState}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              {loginFields.map((field) => (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={loginState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
              ))}
            </div>

            <Button handleSubmit={handleSubmit} text="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PagesLogin;
