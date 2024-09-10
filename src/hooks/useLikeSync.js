import { useCallback } from 'react';
import pb from '@/api/pocketbase';

export const useLikeSync = (userId, likeList) => {
  const syncLikesToServer = useCallback(async () => {
    if (!userId) {
      console.log('�α������� ���� ���·� ���� ����ȭ�� �������� �ʽ��ϴ�.');
      return;
    }

    try {
      const existingLikeList = await pb
        .collection('likeList')
        .getFirstListItem(`owner="${userId}"`);

      if (existingLikeList) {
        await pb.collection('likeList').update(existingLikeList.id, {
          owner: userId,
          costumeCard: likeList,
        });
        console.log('likeList�� ���������� ������Ʈ�Ǿ����ϴ�.');
      } else {
        await pb.collection('likeList').create({
          owner: userId,
          costumeCard: likeList,
        });
        console.log('���ο� likeList�� �����Ǿ����ϴ�.');
      }
    } catch (error) {
      console.error('likeList ����ȭ�� �����߽��ϴ�:', error);
    }
  }, [userId, likeList]);

  return { syncLikesToServer };
};
