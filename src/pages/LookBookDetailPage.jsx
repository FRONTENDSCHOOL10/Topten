import { useState, useEffect } from 'react';
import LookBook from './../components/Main/LookBook';
import pb from './../api/pocketbase';

function LookBookDetailPage() {
  // 룩북 페이지에서 클릭된 착용샷
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      // 로컬에 저장되어 있는 클릭된 착용샷 id 가져옴
      const itemId = localStorage.getItem('selectedItemId');

      if (itemId) {
        try {
          // 룩북 레코드에서 클릭된 착용샷 id을 저장
          const item = await pb.collection('lookBook').getOne(itemId);

          setItem(item);
          
        } catch (error) {
          console.error('아이템 상세 데이터를 가져오는 중 에러 발생:', error);
        }
      }
    };

    fetchItemDetails();
  }, []);

  return <div>{item ? <LookBook item={item} /> : <p>선택된 아이템이 없습니다.</p>}</div>;
}

export default LookBookDetailPage;
