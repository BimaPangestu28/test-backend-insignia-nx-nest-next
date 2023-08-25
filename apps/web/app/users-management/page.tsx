import { Topbar } from '@test-backend-insignia-nx-nest-next/components';
import styles from './page.module.scss';
import { PagesUserManagement } from '@test-backend-insignia-nx-nest-next/pages-user-management';

/* eslint-disable-next-line */
export interface UsersManagementProps {}

export function UsersManagement(props: UsersManagementProps) {
  return (
    <div className={styles['container']}>
      <Topbar />

      <PagesUserManagement/>
    </div>
  );
}

export default UsersManagement;
