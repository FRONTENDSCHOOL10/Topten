// ****************임시****************//

// import PocketBase from 'pocketbase';

// const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// // create
// export default async function createData(data) {
//   const record = await pb.collection(collectionName).create(data);
//   return record;
// }

// // read
// export async function getData(src, option = false, fullList = false) {
//   if(fullList) return await pb.collection(src).getFullList(option);

//  // getList 사용, filter 사용
//  if (!fullList && option){
//   return pb.collection(src).getList(1, 50, {
//     filter: option,
//   })
//  }

//  // getList 사용, filter 사용X
//  if (!fullList && !option) {
//   return await pb.collection(src).getList(1, 50, {});
// }
// }

// // update
// export default async function updateUserData(collectionName, id, data) {
//   const record = await pb.collection(collectionName).update(id, data);
//   return record;
// }

// // delete
// export async function deleteData(collectionName, recordId) {
//   const result = await pb.collection(collectionName).delete(recordId);
//   return result;
// }

// export default function getPbImageURL(item, fileName = "photo") {
//   return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
// }
