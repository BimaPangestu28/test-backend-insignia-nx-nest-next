import { Topbar } from '@test-backend-insignia-nx-nest-next/components';
import styles from './page.module.scss';
import { PagesContactGroupManagement } from '@test-backend-insignia-nx-nest-next/pages-contact-group-management';

/* eslint-disable-next-line */
export interface ContactGroupsManagementProps {}

export function ContactGroupsManagement(props: ContactGroupsManagementProps) {
  return (
    <div className={styles['container']}>
      <Topbar />

      <PagesContactGroupManagement/>
    </div>
  );
}

export default ContactGroupsManagement;
