'use client';

import { Button, Input } from '@test-backend-insignia-nx-nest-next/components';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

/* eslint-disable-next-line */
export interface PagesRegisterProps {}

export function PagesRegister(props: PagesRegisterProps) {
  const router = useRouter();

  const registerFields = [
    {
      labelText: 'Name',
      labelFor: 'name',
      id: 'name',
      name: 'name',
      type: 'text',
      autoComplete: 'name',
      isRequired: true,
      placeholder: 'Name',
    },
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
    }
  ];

  const [registerState, setregisterState] = useState(
    registerFields
      .map((field) => ({ [field.id]: '' }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  );

  const handleChange = (e: any) => {
    setregisterState({ ...registerState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle register API Integration here
  const authenticateUser = () => {
    const enpoint = 'http://localhost:3000/api/authentications/register';

    fetch(enpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerState),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push('/login');
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
            Register
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            Already have an account yet?{' '}
            <Link
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Login
            </Link>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {registerFields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={registerState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}

            <Button handleSubmit={handleSubmit} text="Register" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PagesRegister;
