import pb from './pocketbase';

export async function createUser(userInfo) {
  const { name, email, password, checkPassword, nickName, gender, topSize, bottomSize, colors } =
    userInfo;

  const newUser = {
    email,
    password,
    emailVisibility: true,
    passwordConfirm: checkPassword,
    userID: name,
    userNickName: nickName,
    userGender: gender,
    userSize: [topSize, bottomSize],
    userColor: [colors],
  };

  const record = await pb.collection('users').create(newUser);
  return record;
}
