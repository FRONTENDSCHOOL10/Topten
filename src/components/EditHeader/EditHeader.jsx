import arrow from '/icon/right.svg';
import S from './EditHeader.module.scss';
import { useNavigate } from 'react-router-dom';
const EditHeader = ({ navText, mainText, description }) => {
  const navigate = useNavigate();
  return (
    <div className={S.editHeader}>
      <div>
        <span className={S.icon} onClick={() => navigate(-1)}>
          <img src={arrow} alt="페이지 이동 화살표" />
        </span>
        <h2 className={S.navText}>{navText ?? ''}</h2>
      </div>
      <h1 className={S.mainText}>{mainText ?? ''}</h1>
      <p className={S.description}>{description}</p>
    </div>
  );
};

export default EditHeader;
