import pb from './pocketbase';

export async function getData(src, option) {
  return await pb.collection(src).getFullList(option);
}

export async function getUserInfo() {
  pb.autoCancellation(false);
  if (!localStorage.getItem('pb_auth')) {
    return { isUser: false };
  }
  const uid = JSON.parse(localStorage.getItem('pb_auth')).token.id;
  const data = await pb.collection('users').getOne(uid);

  return { ...data, isUser: true };
}

//zustand으로 통일위해 생성
export async function getUserData(uid) {
  pb.autoCancellation(false);

  const data = await pb.collection('users').getOne(uid);

  return data;
}
