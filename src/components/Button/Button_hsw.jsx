import { useEffect, useRef, useState } from 'react';
import { string, bool, element, object, number } from 'prop-types';
import { animate } from 'motion'; // motion-one에서 animate 함수 import
import clsx from 'clsx'; // clsx 라이브러리로 className 동적 할당
import S from './Button_hsw.module.scss';
import { useNavigate } from 'react-router-dom/dist';

/**
 * Button_hsw 컴포넌트
 *
 * 이 컴포넌트는 사용자 정의 버튼을 렌더링하며, 텍스트, 색상, 아이콘, 링크 등 다양한 속성을 지원합니다.
 * 애니메이션과 다양한 스타일을 통해 동적인 버튼을 제공하며, react-router-dom을 사용하여 링크 이동도 가능합니다.
 *
 * @param {object} props - 컴포넌트에 전달되는 props 객체
 * @param {string} props.text - 버튼에 표시될 텍스트 (필수)
 * @param {string} [props.color=var(--black)] - 버튼 텍스트의 색상 (선택)
 * @param {string} [props.backgroundColor=var(--white)] - 버튼 배경색 (선택)
 * @param {string} [props.borderColor=var(--black)] - 버튼 테두리 색상 (선택)
 * @param {boolean} [props.active=false] - 버튼이 활성화된 상태인지 여부 (선택)
 * @param {number} [props.fontWeight=400] - 버튼 텍스트의 두께 (선택)
 * @param {JSX.Element|null} [props.icon=null] - 버튼에 표시될 아이콘 컴포넌트 (선택)
 * @param {object} [props.iconAnimation={}] - 아이콘에 적용할 애니메이션 설정 객체 (선택)
 * @param {string} [props.linkTo=''] - 클릭 시 이동할 경로 (선택)
 * @param {object} props.restProps - 나머지 전달받은 props (선택)
 *
 * @returns {JSX.Element} - 렌더링된 버튼 컴포넌트
 */

function Button_hsw({
  text,
  color = `var(--black)`, // 기본 텍스트 색상 설정
  backgroundColor = 'var(--white)', // 기본 배경색 설정
  borderColor = 'var(--black)', // 기본 테두리 색상 설정
  active = false, // 기본 active 상태 false
  fontWeight = 400, // 기본 글씨 두께
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
    if (buttonRef.current && active) {
      animate(
        buttonRef.current,
        {
          backgroundColor: 'var(--primary-color)', // hover 시 배경색 변경
          borderColor: 'var(--primary-color)', // hover 시 테두리 색상 변경
          fontWeight: 700,
        },
        { duration: 0.3 }
      );

      if (iconRef.current) {
        animate(iconRef.current, { rotate: 360 }, { duration: 0.5 }); // 360도 회전
      }
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current && active) {
      animate(
        buttonRef.current,
        {
          backgroundColor, // 기본 배경색으로 복귀
          borderColor, // 기본 테두리 색상으로 복귀
          fontWeight,
        },
        { duration: 0.3 }
      );

      if (iconRef.current) {
        animate(iconRef.current, { rotate: 0 }, { duration: 0.5 }); // 원래 상태로 복귀
      }
    }
  };

  const handleClick = () => {
    if (linkTo !== '') {
      navigate(linkTo);
    }
  };

  return (
    <button
      ref={buttonRef} // 버튼에 ref 추가
      className={clsx(S.button, { [S.active]: active })} // active 클래스 동적 할당
      style={{
        color, // 텍스트 색상
        backgroundColor, // 배경색
        borderColor, // 테두리 색상
        fontWeight, // 텍스트 두께
      }}
      onMouseEnter={handleMouseEnter} // 마우스가 버튼 위에 올라갔을 때
      onMouseLeave={handleMouseLeave} // 마우스가 버튼에서 벗어났을 때
      onClick={handleClick}
      {...props}
    >
      <div className={S.button__Content}>
        {text || ''}
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
Button_hsw.propTypes = {
  text: string.isRequired, // 필수 문자열
  color: string, // 텍스트 색상
  backgroundColor: string, // 배경색
  borderColor: string, // 테두리 색상
  active: bool, // active 여부
  fontWeight: number, // 텍스트 두께
  icon: element, // 아이콘으로 JSX 요소 전달
  iconAnimation: object, // 아이콘에 적용할 애니메이션 설정
  linkTo: string, // 이동해야할 링크
};

export default Button_hsw;
