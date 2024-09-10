import toast from 'react-hot-toast';

export default function loadToast(text, icon) {
  toast(text, {
    icon: icon,
    style: {
      borderRadius: '10px',
      background: '#333',
      marginTop: '70px',
      color: '#fff',
      width: '220px',
      height: '50px',
    },
  });
}
