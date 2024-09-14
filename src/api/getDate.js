export default function getDate() {
  const date = new Date();
  return date.toLocaleString('ko-kr');
}
