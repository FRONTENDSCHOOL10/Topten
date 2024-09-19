import pb from './pocketbase';

export default async function updateUserData(collectionName, id, data) {
  const record = await pb.collection(collectionName).update(id, data);
  return record;
}
