import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/getData';

export default function useGetUserInfo() {
  const [user, setUser] = useState({});
  console.log('sss');
  useEffect(() => {
    console.log('aaaaaaaaaaaa');
    getUserInfo().then((userInfo) => setUser(userInfo));
  }, []);
  return { user, setUser };
}
