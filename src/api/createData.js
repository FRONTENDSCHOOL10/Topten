import pb from './pocketbase';

export default async function createData(formData) {
  const newData = {
    weather: formData.weatherText,
    address: formData.address,
    date: formData.date,
    saveTime: formData.saveTime,
    comment: formData.comment,
    upperItems: formData.upperItems.map((item) => item.id),
    lowerItems: formData.lowerItems.map((item) => item.id),
    user: formData.uid,
    rate: 0,
  };

  const record = await pb.collection('bookmarkItem').create(newData);

  return record;
}
