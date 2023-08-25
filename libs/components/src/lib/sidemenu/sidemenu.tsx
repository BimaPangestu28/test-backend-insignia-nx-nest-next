import styles from './sidemenu.module.scss';

/* eslint-disable-next-line */
export interface SidemenuProps {}

export function Sidemenu(props: SidemenuProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Sidemenu!</h1>
    </div>
  );
}

export default Sidemenu;
