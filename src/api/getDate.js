export default function getDate() {
  const differ = 1000 * 60 * 60 * 9;
  const korea = new Date(new Date().getTime() + differ);

  return korea;
}
