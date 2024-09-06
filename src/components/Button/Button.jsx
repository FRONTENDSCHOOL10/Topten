import { useEffect, useRef, useState } from 'react';
import { string, bool, element, object, number } from 'prop-types';
import { animate } from 'motion'; // motion-one에서 animate 함수 import
import clsx from 'clsx'; // clsx 라이브러리로 className 동적 할당
import S from './Button.module.scss';
import { useNavigate } from 'react-router-dom/dist';

/**
 * Button 컴포넌트
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

function Button({
  text = '',
  color = `var(--black)`, // 기본 텍스트 색상 설정
  backgroundColor = 'var(--white)', // 기본 배경색 설정
  borderColor = 'var( --gray-custom-300)', // 기본 테두리 색상 설정
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
        { duration: 0.3, easing: 'linear' }
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
        { duration: 0.3, easing: 'linear' }
      ).finished.then(() => {
        // 애니메이션이 끝난 후 인라인 스타일 제거
        buttonRef.current.style.backgroundColor = '';
        buttonRef.current.style.borderColor = '';
        buttonRef.current.style.fontWeight = '';
      });

      if (iconRef.current) {
        animate(iconRef.current, { rotate: 0 }, { duration: 0.5 }); // 아이콘 애니메이션 복귀
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
      // style={{
      //   color, // 텍스트 색상
      //   backgroundColor, // 배경색
      //   borderColor, // 테두리 색상
      //   fontWeight, // 텍스트 두께
      // }}
      className={clsx(S.button, { [S.active]: active })} // active 클래스 동적 할당
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
Button.propTypes = {
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

export default Button;

/*
버튼 컴포넌트에 스타일이 적용되지 않던 문제점에 대해서,
그 이유를 찾았습니다.

props로 전달하려는 색상들(배경, 테두리 색 등)이 inline으로 스타일로 적용되는데,
이게 scss의 스타일보다 우선되어서 focus, hover등이 먹히지 않았음. -> inline으로 스타일 적용하는걸 지우면 가능.

그럼 굳이 색상전달이 필요한가??라는 의문점 -> bool 값 하나를 통해서 키면 노랑 끄면 흰색 되도록 설정?

scss의 hover, focus는 inline만 없으면 정상적으로 작용함! -> scss에서 모든 스타일 미리 선언해서 집어넣는게 나아보이긴 함.
따로 버튼 테두리, 배경, 폰트 등 색상을 굳이 더 변경해야할 게 없다면 그냥 props에서 빼도 되겠다 생각했습니다.
확인해보시고 한번 알려주세요
*/
