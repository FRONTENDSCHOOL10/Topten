import pb from './pocketbase';

export async function getData(src, option) {
  return await pb.collection(src).getFullList(option);
}

export async function getUserInfo() {
  pb.autoCancellation(false);
  if (!localStorage.getItem('pb_auth')) {
    return { isUser: false };
  }
  const uid = JSON.parse(localStorage.getItem('pb_auth')).record.id;
  const data = await pb.collection('users').getOne(uid);

  return { ...data, isUser: true };
}

//zustand으로 통일위해 생성
export const getUserData = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  try {
    const data = await pb.collection('users').getOne(userId);
    console.log('User Data:', data);
    // 필요한 추가 작업 수행
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
