'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Table,
} from '@test-backend-insignia-nx-nest-next/components';

/* eslint-disable-next-line */
export interface PagesUserManagementProps {}

export function PagesUserManagement(props: PagesUserManagementProps) {
  const fields = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'email',
      label: 'E-mail',
    },
    {
      field: 'role',
      label: 'Role',
    },
  ];

  const formFields = [
    {
      labelText: 'Name',
      labelFor: 'name',
      id: 'name',
      name: 'name',
      type: 'name',
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
      autoComplete: 'password',
      isRequired: true,
      placeholder: 'Password',
    },
    {
      labelText: 'Role',
      labelFor: 'role',
      id: 'role',
      name: 'role',
      type: 'select',
      autoComplete: 'role',
      isRequired: true,
      placeholder: 'Select Role',
      options: [
        { key: 'ADMIN', label: 'Admin' },
        { key: 'MEMBER', label: 'Member' },
      ],
    },
  ];

  const [records, setRecords] = useState([]);
  const [type, setType] = useState('table');
  const [idUserState, setIdUserState] = useState('');
  const [errorsState, setErrorsState] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [userState, setUserState] = useState(
    formFields
      .map((field) => ({ [field.id]: '' }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingState(true);
    const endpoint = 'http://localhost:3000/api/users';

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
    });

    const data = await response.json();

    setRecords(data.data);
    setLoadingState(false);
  };

  const handleChange = (e: any) => {
    setUserState({ ...userState, [e.target.id]: e.target.value });
  };

  const handleClickAdd = async (data) => {
    setErrorsState([]);
    setType('form');
  };

  const handleClickCancel = async (data) => {
    setErrorsState([]);
    setType('table');
  };

  const handleSubmit = async () => {
    let endpoint = 'http://localhost:3000/api/users';

    if (idUserState) {
      endpoint = `${endpoint}/${idUserState}`;
    }

    const response = await fetch(endpoint, {
      method: idUserState ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
      body: JSON.stringify(userState),
    });

    const data = await response.json();

    if (data.statusCode && data.statusCode !== '201') {
      console.log(data);
      setErrorsState(data.message);
      return;
    } else {
      setErrorsState([]);
      setUserState(
        formFields
          .map((field) => ({ [field.id]: '' }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})
      );

      setType('table');
      fetchUsers();
    }
  };

  const handleEdit = async (record) => {
    setType('form');
    setIdUserState(record.id);
    setUserState({
      name: record.name,
      email: record.email,
      password: '',
      role: record.role,
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      const endpoint = `http://localhost:3000/api/users/${id}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-key')}`,
        },
      });

      const data = await response.json();

      if (data.statusCode && data.statusCode !== '201') {
        console.log(data);
        setErrorsState(data.message);
        return;
      } else {
        setErrorsState([]);
        fetchUsers();
      }
    }
  };

  return (
    <div className="p-4">
      <Table
        title={'List Users'}
        fields={fields}
        records={records}
        handleClickAdd={handleClickAdd}
        handleClickCancel={handleClickCancel}
        handleClickSave={handleSubmit}
        handleClickEdit={handleEdit}
        handleClickDelete={handleDelete}
        typeShow={type}
        loading={loadingState}
        handleSubmit={handleSubmit}
        userState={userState}
        handleChange={handleChange}
        formFields={formFields}
        errorsState={errorsState}
      />


    </div>
  );
}

export default PagesUserManagement;
