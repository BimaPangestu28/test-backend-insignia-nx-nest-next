'use client';

import { Topbar } from '@test-backend-insignia-nx-nest-next/components';
import { PagesContactManagement } from '@test-backend-insignia-nx-nest-next/pages-contact-management';

/* eslint-disable-next-line */
export interface ContactsManagementCreateProps {}

export function ContactsManagementCreate(props: ContactsManagementCreateProps) {
  return (
    <div>
      <Topbar />

      <PagesContactManagement />
    </div>
  );
}

export default ContactsManagementCreate;
