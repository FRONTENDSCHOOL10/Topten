import pb from './pocketbase';

export default async function updateUserData(collectionName, id, data) {
  if (collectionName !== 'bookmarkItem') {
    const token = localStorage.getItem('pb_auth').token;
    sessionStorage.setItem('pb_auth', JSON.stringify({ record: data, token: token }));
    localStorage.setItem('pb_auth', JSON.stringify({ record: data, token: token }));
  }

  const record = await pb.collection(collectionName).update(id, data);
  return record;
}
