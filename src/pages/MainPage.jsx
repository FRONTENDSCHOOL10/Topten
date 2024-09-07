import styles from './../styles/pages/MainPage.module.scss';
import Weather from './../components/Main/Weather';
import Product from './../components/Main/Product';
import LookBook from './../components/Main/LookBook';

function MainPage(props) {
  return (
    <div className={styles.wrapComponent}>
      <Weather />
      <Product />
      <LookBook />
    </div>
  );
}

export default MainPage;
