import { bool, func, string } from 'prop-types';
import { Link } from 'react-router-dom';
import S from './CommonModal.module.scss';

/**
 * CommonModal 컴포넌트는 다양한 상황에서 재사용 가능한 모달 컴포넌트입니다.
 * 모달 외부를 클릭했을 때 모달이 닫히는 기능을 포함합니다.
 *
 * @param {boolean} isOpen - 모달이 열렸는지 여부를 제어합니다. true일 경우 모달이 화면에 나타납니다.
 * @param {function} onClose - 모달을 닫는 함수입니다. 모달이 닫힐 때 호출됩니다.
 * @param {string} title - 모달의 제목을 나타냅니다.
 * @param {string} firstActionText - 왼쪽 액션 버튼의 텍스트입니다.
 * @param {string} [firstActionLink] - 왼쪽 액션 버튼이 이동할 경로입니다.
 * @param {string} secondActionText - 오른쪽 액션 버튼의 텍스트입니다.
 * @param {string} [secondActionLink] - 오른쪽 액션 버튼이 이동할 경로입니다.
 * @param {function} [onFirstAction] - 왼쪽 액션 버튼을 클릭했을 때 호출되는 함수입니다.
 * @param {function} [onSecondAction] - 오른쪽 액션 버튼을 클릭했을 때 호출되는 함수입니다.
 * @returns {JSX.Element|null} 모달이 열렸을 때 JSX로 구성된 모달을 렌더링합니다. 열리지 않았을 때는 null을 반환합니다.
 */

const CommonModal = ({
  isOpen,
  onClose,
  title,
  firstActionText,
  firstActionLink,
  secondActionText,
  secondActionLink,
  onFirstAction,
  onSecondAction,
}) => {
  if (!isOpen) return null;

  // 모달 외부를 클릭하면 모달을 닫는 함수
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div className={S.modalOverlay} onClick={handleOverlayClick}>
      {/* 모달 내부를 클릭하면 이벤트 전파를 차단하여 모달이 닫히지 않도록 함 */}
      <div className={S.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className={S.buttonGroup}>
          {firstActionLink ? (
            <Link to={firstActionLink} className={S.firstButton}>
              {firstActionText}
            </Link>
          ) : (
            <button className={S.firstButton} onClick={onFirstAction}>
              {firstActionText}
            </button>
          )}
          <p>|</p>
          {secondActionLink ? (
            <Link to={secondActionLink} className={S.secondButton}>
              {secondActionText}
            </Link>
          ) : (
            <button className={S.secondButton} onClick={onSecondAction}>
              {secondActionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommonModal.propTypes = {
  isOpen: bool.isRequired, // 모달이 열렸는지 여부
  onClose: func.isRequired, // 모달을 닫는 함수
  title: string.isRequired, // 모달 제목
  firstActionText: string.isRequired, // 왼쪽 버튼 텍스트
  firstActionLink: string, // 왼쪽 버튼이 이동할 경로 (선택 사항)
  secondActionText: string.isRequired, // 오른쪽 버튼 텍스트
  secondActionLink: string, // 오른쪽 버튼이 이동할 경로 (선택 사항)
  onFirstAction: func, // 왼쪽 버튼 클릭 시 실행할 함수 (선택 사항)
  onSecondAction: func, // 오른쪽 버튼 클릭 시 실행할 함수 (선택 사항)
};

export default CommonModal;
