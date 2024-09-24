export const validateName = (name) => {
  const nameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
  return nameRegex.test(name);
};

export const validateEmail = (email) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=*-]).*$/;
  return passwordRegex.test(password);
};