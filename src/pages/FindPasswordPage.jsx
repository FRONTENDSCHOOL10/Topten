import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import styles from '@/styles/pages/FindPasswordPage.module.scss';

function FindPasswordPage(props) {
  return (
    <>
      <div>
        <h2>비밀번호 찾기</h2>
        <p>
          비밀번호를 찾고자 하는 <br /> 이름과 이메일을 입력해주세요.
        </p>
      </div>

      <Input text={'이름'} description={'이름을 입력해주세요'} />
      <Input text={'이메일'} description={'이메일을 입력해주세요'} />

      <Button />
    </>
  );
}

export default FindPasswordPage;
