import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import CostumeCardManager from '@/components/CostumeCardManager/CostumeCardManager';
import pb from '@/api/pocketbase';

function 예시Page(props) {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);

  // sessionStorage에서 pb_auth 정보를 가져옴
  // 안쓰긴하는데 혹시 모르니까! 커스텀해서 쓰심 됩니다 필요하면
  useEffect(() => {
    const pbAuth = sessionStorage.getItem('pb_auth');
    if (pbAuth) {
      try {
        const parsedUser = JSON.parse(pbAuth);
        // console.log('parsedUser:', parsedUser);

        // user 객체
        setUser({
          id: parsedUser.token.id,
          email: parsedUser.token.email,
          nickname: parsedUser.token.userNickName,
          photo: parsedUser.token.userPhoto,
          // 필요에 따라 추가 정보도 설정
        });
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    }
  }, []);

  // CostumeCard 리스트 만들기
  useEffect(() => {
    const fetchCC = async () => {
      try {
        // const record = await pb.collection('lookBook').~~~~
        // record2라는 카드정보들이 여럿 저장되어있는 객체가 뜨겠죠?
        // 그럼 걔네를 setCostumeCards(record); 해서 빈 배열에 카드 객체들 넣으셔야함
        //그리고 배열이 새로고침하면 날아갈수도 있으니까 세션이나 로컬스토리지에 저장하는 코드
        // 작성해주시면 됩니다.
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    };

    fetchCC();
  }, []);

  // 전달에 필요한 요소 :
  //  viewType : "리스트" 혹은 "앨범"
  //  costumeCards : 카드의 정보를 담은 배열
  //  costumeCards 예시 -> 카드배열 : [{"collectionId":"cfwfpoo8z5svoms","collectionName":"costumeCard","costumeBrand":"폴로","costumeImage":"pexels_frendsmans_1926769_deFTIQKSJG.jpg","costumeLink":{"무신사":"https://www.musinsa.com/products/4268814"},"costumeSeason":["여름"],"costumeTemperature":["5°~8°"],"costumeTitle":"향수","created":"2024-09-10 00:24:48.715Z","id":"nnc25yevw4600cq","isRainsnow":false,"lowerCategory":"반바지","updated":"2024-09-10 00:24:48.715Z","upperCategory":"하의"},{"collectionId":"cfwfpoo8z5svoms","collectionName":"costumeCard","costumeBrand":"폴로","costumeImage":"profile_4_desktop_wPdVZeGqXg.jpg","costumeLink":{"무신사":"https://www.musinsa.com/products/4268814"},"costumeSeason":["여름"],"costumeTemperature":["5°~8°"],"costumeTitle":"폴로 하의 예시","created":"2024-09-08 15:10:40.756Z","id":"wymzn0k6ay9zx3u","isRainsnow":false,"lowerCategory":"반바지","updated":"2024-09-08 15:10:40.756Z","upperCategory":"하의"},{"collectionId":"cfwfpoo8z5svoms","collectionName":"costumeCard","costumeBrand":"아식스","costumeImage":"profile_3_desktop_FLLurxe23y.png","costumeLink":{"무신사":"https://www.musinsa.com/products/4268814"},"costumeSeason":["여름"],"costumeTemperature":["5°~8°"],"costumeTitle":"아식스 하의 예시","created":"2024-09-08 15:09:18.133Z","id":"d6b3w2v5zl8mner","isRainsnow":false,"lowerCategory":"바지","updated":"2024-09-08 15:10:57.646Z","upperCategory":"하의"},{"collectionId":"cfwfpoo8z5svoms","collectionName":"costumeCard","costumeBrand":"아디다스","costumeImage":"profile_1_desktop_LSNGdCkG5k.png","costumeLink":{"무신사":"https://www.musinsa.com/products/4268814"},"costumeSeason":["여름"],"costumeTemperature":["5°~8°"],"costumeTitle":"아디다스 상의 예시","created":"2024-09-08 15:07:44.902Z","id":"yp3x1gu86nq6ob5","isRainsnow":false,"lowerCategory":"긴팔","updated":"2024-09-08 15:11:02.807Z","upperCategory":"상의"},{"collectionId":"cfwfpoo8z5svoms","collectionName":"costumeCard","costumeBrand":"나이키","costumeImage":"profile_2_desktop_oI6yfZNZAq.png","costumeLink":{"무신사":"https://www.musinsa.com/products/4268814"},"costumeSeason":["봄","여름"],"costumeTemperature":["5°~8°"],"costumeTitle":"나이키 상의 예시","created":"2024-09-08 15:06:25.944Z","id":"84qsb4i7bqnh701","isRainsnow":false,"lowerCategory":"가디건","updated":"2024-09-08 15:11:10.976Z","upperCategory":"상의"},{"collectionId":"cfwfpoo8z5svoms","collectionName":"costumeCard","costumeBrand":"무신사","costumeImage":"","costumeLink":{"무신사":"https://www.musinsa.com/products/4268814"},"costumeSeason":["봄","여름"],"costumeTemperature":["5°~8°"],"costumeTitle":"키싱 시그널 오버핏 코튼","created":"2024-09-07 14:40:26.086Z","id":"6sh5s0fz48mc2r8","isRainsnow":false,"lowerCategory":"","updated":"2024-09-07 14:40:45.904Z","upperCategory":"상의"},{"collectionId":"cfwfpoo8z5svoms","collectionName":"costumeCard","costumeBrand":"비비앙","costumeImage":"4268814_17217853638099_big_w1Z8X8c72a.jpg","costumeLink":{"무신사":"https://www.musinsa.com/products/4268814"},"costumeSeason":["봄","가을"],"costumeTemperature":["9°~11°"],"costumeTitle":"오드퍼퓸 월넛크릭그린 EDP 50ml","created":"2024-09-02 08:49:21.091Z","id":"hkn8fmqpvlbc5rp","isRainsnow":false,"lowerCategory":"향수","updated":"2024-09-02 08:54:49.860Z","upperCategory":"악세사리"}]

  return (
    <div className={S.wrapComponent}>
      {/* costumeCards를 CostumeCardManager로 전달 */}
      <CostumeCardManager viewType="리스트" costumeCards={카드배열} />
    </div>
  );
}

export default 예시Page;
