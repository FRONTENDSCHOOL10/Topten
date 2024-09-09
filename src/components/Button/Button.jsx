import { useEffect, useRef } from 'react';
import { string, bool, element, object, oneOf } from 'prop-types';
import { animate } from 'motion'; // motion-one에서 animate 함수 import
import clsx from 'clsx'; // clsx 라이브러리로 className 동적 할당
import S from './Button.module.scss';
import { useNavigate } from 'react-router-dom/dist';

/**
 * Button 컴포넌트
 *
 * 이 컴포넌트는 사용자 정의 버튼을 렌더링하며, 텍스트, 아이콘, 링크 등 다양한 속성을 지원합니다.
 * 애니메이션과 다양한 스타일을 통해 동적인 버튼을 제공하며, react-router-dom을 사용하여 링크 이동도 가능합니다.
 *
 * @param {object} props - 컴포넌트에 전달되는 props 객체
 * @param {string} props.text - 버튼에 표시될 텍스트 (필수)
 * @param {string} props.type - 사용할 버튼 타입 (선택)
 * @param {boolean} [props.active=false] - 버튼이 활성화된 상태인지 여부 (선택)
 * @param {JSX.Element|null} [props.icon=null] - 버튼에 표시될 아이콘 컴포넌트 (선택)
 * @param {object} [props.iconAnimation={}] - 아이콘에 적용할 애니메이션 설정 객체 (선택)
 * @param {string} [props.linkTo=''] - 클릭 시 이동할 경로 (선택)
 *
 * @returns {JSX.Element} - 렌더링된 버튼 컴포넌트
 */

function Button({
  text = '',
  type = 'button',
  active = false, // 기본 active 상태 false
  icon = null, // 기본 아이콘은 null, JSX 형태로 전달해야함.
  iconAnimation = {}, // 아이콘 애니메이션 설정
  linkTo = '', //이동할 경로
  ...props
}) {
  const buttonRef = useRef(null); // 버튼을 참조하기 위한 ref
  const iconRef = useRef(null); // 아이콘을 참조하기 위한 ref
  const navigate = useNavigate();

  // 기본 아이콘 애니메이션 적용
  useEffect(() => {
    if (iconRef.current && iconAnimation) {
      animate(iconRef.current, iconAnimation); // 기본 아이콘 애니메이션 적용
    }
  }, [iconAnimation]);

  // Hover 시 버튼과 아이콘에 애니메이션 적용
  const handleMouseEnter = () => {
    if (iconRef.current && active) {
      animate(iconRef.current, { rotate: 360 }, { duration: 0.5 }); // 360도 회전
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current && active) {
      animate(iconRef.current, { rotate: 0 }, { duration: 0.5 }); // 아이콘 애니메이션 복귀
    }
  };

  // 클릭 시 링크 이동
  const handleClick = (event) => {
    // 만약 props로 onClick이 전달되었다면 실행
    if (props.onClick) {
      props.onClick(event);
    }

    // linkTo가 있을 때만 페이지 이동을 처리
    if (linkTo) {
      // 이벤트 전파를 막기 위해 preventDefault 호출
      event.preventDefault();
      navigate(linkTo);
    }
  };

  return (
    <button
      type={type}
      ref={buttonRef}
      className={clsx(S.button, { [S.active]: active })} // active 클래스 동적 할당
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      <div className={S.button__Content}>
        {text}
        {icon && (
          <span ref={iconRef} className={S.icon}>
            {icon}
          </span>
        )}
      </div>
    </button>
  );
}

// propTypes 정의
Button.propTypes = {
  text: string.isRequired, // 필수 문자열
  type: oneOf(['button', 'submit', 'reset']), //사용할 버튼 타입
  active: bool, // active 여부
  icon: element, // 아이콘으로 JSX 요소 전달
  iconAnimation: object, // 아이콘에 적용할 애니메이션 설정
  linkTo: string, // 이동해야할 링크
};

export default Button;
