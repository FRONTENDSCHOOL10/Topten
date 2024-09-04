import pb from '@/api/pocketbase';

const sendData = async () => {
  const data = {
    username: 'hsw',
    email: 'hsw1568@naver.com',
    emailVisibility: true,
    password: '12345678',
    passwordConfirm: '12345678',
    userID: 'test',
    userNickName: 'testtest',
    userGender: '남자',
    userSize: ['XS'],
    userColor: ['봄웜'],
  };

  try {
    // const record = await pb.collection('users').create(data);
    // console.log(record);
    const req = await pb.collection('users').requestPasswordReset('hsw1568@naver.com');
    console.log(req);
  } catch (error) {
    console.error('Error:', error);
  }
};

sendData();
