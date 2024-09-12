import pb from './pocketbase';

export default async function updateUserData(id, data) {
  const record = await pb.collection('users').update(id, data);
  return record;
}

// const record = await pb.collection('users').update('RECORD_ID', data);
// example update data
// const data = {
//   username: 'test_username_update',
//   emailVisibility: false,
//   password: '87654321',
//   passwordConfirm: '87654321',
//   oldPassword: '12345678',
//   userID: 'test',
//   userNickName: 'test',
//   userGender: '남자',
//   userSize: ['XS'],
//   userColor: ['봄웜'],
// };
