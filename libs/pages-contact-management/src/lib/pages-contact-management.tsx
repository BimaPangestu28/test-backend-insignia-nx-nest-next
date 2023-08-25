'use client';

import { Table } from '@test-backend-insignia-nx-nest-next/components';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

/* eslint-disable-next-line */
export interface PagesContactManagementProps {}

export function PagesContactManagement(props: PagesContactManagementProps) {
  const fields = [
    {
      label: 'Name',
      field: 'name',
    },
    {
      label: 'E-mail',
      field: 'email',
    },
    {
      label: 'Phone Number',
      field: 'phoneNumber',
    },
    {
      label: 'Address',
      field: 'address',
    },
    {
      label: 'Contact Groups',
      field: 'contactGroups',
      type: 'array',
      key: 'name',
    },
  ];

  const [records, setRecords] = useState([]);
  const [type, setType] = useState('table');
  const [idUserState, setIdUserState] = useState('');
  const [errorsState, setErrorsState] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [contactGroupState, setContactGroupState] = useState([]);

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
      labelText: 'Phonenumber',
      labelFor: 'phoneNumber',
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'text',
      autoComplete: 'phoneNumber',
      isRequired: true,
      placeholder: 'Phonenumber',
    },
    {
      labelText: 'Address',
      labelFor: 'address',
      id: 'address',
      name: 'address',
      type: 'text',
      autoComplete: 'address',
      isRequired: true,
      placeholder: 'Address',
    },
    {
      labelText: 'Contact Groups',
      labelFor: 'contactGroupIds',
      id: 'contactGroupIds',
      name: 'contactGroupIds',
      type: 'multiple-select',
      autoComplete: 'contactGroupIds',
      isRequired: true,
      placeholder: 'Contact Groups',
      options: contactGroupState.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    },
  ];

  const [userState, setUserState] = useState(
    formFields
      .map((field) => ({ [field.id]: '' }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  );

  useEffect(() => {
    fetchContacts();
    fetchContactGroups();
  }, []);

  const fetchContacts = async () => {
    setLoadingState(true);
    const endpoint = 'http://localhost:3000/api/contacts';

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

  const fetchContactGroups = async () => {
    const endpoint = 'http://localhost:3000/api/contact-groups';

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
    });

    const data = await response.json();

    setContactGroupState(data.data);
  };

  const handleChange = (e: any) => {
    if (e.target) setUserState({ ...userState, [e.target.id]: e.target.value });
    if (!e.target) {
      setUserState({ ...userState, ['contactGroupIds']: e });
      console.log(userState);
    }
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
    let endpoint = 'http://localhost:3000/api/contacts';

    if (idUserState) {
      endpoint = `${endpoint}/${idUserState}`;
    }

    const response = await fetch(endpoint, {
      method: idUserState ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
      body: JSON.stringify({
        ...userState,
        contactGroupIds: userState.contactGroupIds.map(
          (contactGroup) => contactGroup.value
        ),
      }),
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
      fetchContacts();
    }
  };

  const handleEdit = async (record) => {
    setType('form');
    setIdUserState(record.id);
    setUserState({
      name: record.name,
      email: record.email,
      phoneNumber: record.phoneNumber,
      address: record.address,
      contactGroupIds: record.contactGroups.map((contactGroup) => ({
        value: contactGroup.id,
        label: contactGroup.name,
      })),
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      const endpoint = `http://localhost:3000/api/contacts/${id}`;

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
        fetchContacts();
      }
    }
  };

  return (
    <div className="p-4">
      <Table
        title={'List Contacts'}
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

export default PagesContactManagement;
