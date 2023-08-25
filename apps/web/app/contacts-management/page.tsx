'use client';

import { Topbar } from '@test-backend-insignia-nx-nest-next/components';
import styles from './page.module.scss';
import { PagesContactManagement } from '@test-backend-insignia-nx-nest-next/pages-contact-management';

/* eslint-disable-next-line */
export interface ContactsManagementProps {}

export function ContactsManagement(props: ContactsManagementProps) {
  return (
    <div className={styles['container']}>
      <Topbar />

      <PagesContactManagement />
    </div>
  );
}

export default ContactsManagement;
