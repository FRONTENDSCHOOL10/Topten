import pb from './pocketbase';

export default async function updateUserData(collectionName, id, data) {
  sessionStorage.setItem('pb_auth', JSON.stringify({ model: 'model', token: data }));
  localStorage.setItem('pb_auth', JSON.stringify({ model: 'model', token: data }));
  const record = await pb.collection(collectionName).update(id, data);
  return record;
}
