import pb from './pocketbase';

export async function getData(src, option) {
  return await pb.collection(src).getFullList(option);
}

export async function getUserInfo() {
  pb.autoCancellation(false);
  if (!sessionStorage.getItem('pb_auth')) {
    return { isUser: false };
  }
  const uid = JSON.parse(sessionStorage.getItem('pb_auth')).token.id;
  const data = await pb.collection('users').getOne(uid);
  return { ...data, isUser: true };
}
