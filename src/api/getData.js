import pb from './pocketbase';

export async function getData(src, option) {
  return await pb.collection(src).getFullList(option);
}
