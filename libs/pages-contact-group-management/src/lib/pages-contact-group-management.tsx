'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Table } from '@test-backend-insignia-nx-nest-next/components';

/* eslint-disable-next-line */
export interface PagesContactGroupManagementProps {}

export function PagesContactGroupManagement(
  props: PagesContactGroupManagementProps
) {
  const fields = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'description',
      label: 'Description',
    },
    {
      label: 'Contact',
      field: 'contactList',
      type: 'array',
      key: 'phoneNumber',
    },
  ];

  const [records, setRecords] = useState([]);
  const [type, setType] = useState('table');
  const [idContactGroupState, setIdContactGroupState] = useState('');
  const [errorsState, setErrorsState] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const [contactState, setContactState] = useState([]);

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
      labelText: 'Description',
      labelFor: 'description',
      id: 'description',
      name: 'description',
      type: 'description',
      autoComplete: 'description',
      isRequired: true,
      placeholder: 'Description',
    },
    {
      labelText: 'Description',
      labelFor: 'description',
      id: 'description',
      name: 'description',
      type: 'description',
      autoComplete: 'description',
      isRequired: true,
      placeholder: 'Description',
    },
    {
      labelText: 'Contacts',
      labelFor: 'contactIds',
      id: 'contactIds',
      name: 'contactIds',
      type: 'multiple-select',
      autoComplete: 'contactIds',
      isRequired: true,
      placeholder: 'Contacts',
      options: contactState.map((item) => ({
        value: item.id,
        label: `${item.name} - ${item.phoneNumber}`,
      })),
    },
  ];

  const [contactGroupState, setContactGroupState] = useState(
    formFields
      .map((field) => ({ [field.id]: '' }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  );

  useEffect(() => {
    fetchContactGroups();
    fetchContacts();
  }, []);

  const fetchContactGroups = async () => {
    setLoadingState(true);
    const endpoint = 'http://localhost:3000/api/contact-groups';

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

  const fetchContacts = async () => {
    const endpoint = 'http://localhost:3000/api/contacts';

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
    });

    const data = await response.json();

    setContactState(data.data);
  };

  const handleChange = (e: any) => {
    if (e.target) setContactGroupState({ ...contactGroupState, [e.target.id]: e.target.value });
    if (!e.target) {
      setContactGroupState({ ...contactGroupState, ['contactIds']: e });
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
    let endpoint = 'http://localhost:3000/api/contact-groups';

    if (idContactGroupState) {
      endpoint = `${endpoint}/${idContactGroupState}`;
    }

    const response = await fetch(endpoint, {
      method: idContactGroupState ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
      body: JSON.stringify({
        ...contactGroupState,
        contactIds: contactGroupState.contactIds.map(
          (contact) => contact.value
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
      setContactGroupState(
        formFields
          .map((field) => ({ [field.id]: '' }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})
      );

      setType('table');
      fetchContactGroups();
    }
  };

  const handleEdit = async (record) => {
    setType('form');
    setIdContactGroupState(record.id);
    setContactGroupState({
      name: record.name,
      description: record.description,
      contactIds: record.contactList.map((contact) => ({
        value: contact.id,
        label: `${contact.name} - ${contact.phoneNumber}`,
      })),
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      const endpoint = `http://localhost:3000/api/contact-groups/${id}`;

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
        fetchContactGroups();
      }
    }
  };

  return (
    <div className="p-4">
      <Table
        title={'List Contact Groups'}
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
        userState={contactGroupState}
        handleChange={handleChange}
        formFields={formFields}
        errorsState={errorsState}
      />
    </div>
  );
}

export default PagesContactGroupManagement;
