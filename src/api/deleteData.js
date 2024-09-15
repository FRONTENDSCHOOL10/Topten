import pb from './pocketbase';

export async function deleteData(collectionName, recordId) {
  const result = await pb.collection(collectionName).delete(recordId);
  return result;
}
