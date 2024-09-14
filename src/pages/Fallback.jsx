import { Loader } from '@/components';
import S from '@/styles/pages/Fallback.module.scss';

function Fallback() {
  return (
    <div className="wrapComponent">
      <Loader />
    </div>
  );
}

export default Fallback;
