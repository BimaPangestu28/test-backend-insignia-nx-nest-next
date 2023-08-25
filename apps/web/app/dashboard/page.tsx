import { Topbar } from '@test-backend-insignia-nx-nest-next/components';
import styles from './page.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return (
    <div className={styles['container']}>
      <Topbar/>

      <div className="p-4">
        <h1>Welcome!</h1>
      </div>
    </div>
  );
}

export default Dashboard;
