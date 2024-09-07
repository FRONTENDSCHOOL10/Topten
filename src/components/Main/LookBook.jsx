import Button from './../Button/Button';
import styles from './LookBook.module.scss';
import pb from './../../api/getPbImageURL';

// const item = {
//   collectionId: "hkn8fmqpvlbc5rp",
//   id: "hkn8fmqpvlbc5rp",
//   photo: "image.jpg",
// };

function LookBook() {
  // const imageUrl = getPbImageURL(item);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Look Book : OOTD</h2>

      <div>
        {/* 착용샷 */}
        {/* <img src={imageUrl} alt="Sample" /> */}
      </div>

      <div>
        <h3>관련 상품</h3>
        {/* <img src={imageUrl} alt="Sample" /> */}
        {/* <img src={imageUrl} alt="Sample" /> */}
      </div>

      <Button
        text="더 많은 룩북 보기"
        backgroundColor="var(--primary-color)"
        borderColor="var(--primary-color)"
        fontWeight={400}
        linkTo="/lookbook"
      />
    </div>
  );
}

export default LookBook;
