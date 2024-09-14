import pb from './pocketbase';

export default async function createData(formData) {
  const newData = {
    weather: formData.weatherText,
    address: formData.address,
    date: formData.saveTime,
    saveTime: formData.saveTime,
    comment: formData.comment,
    upperItems: formData.upperItems.map((item) => item.id),
    lowerItems: formData.lowerItems.map((item) => item.id),
    item: ['nnc25yevw4600cq', 'yp3x1gu86nq6ob5'],
    user: formData.uid,
    rate: 'test',
  };
  const record = await pb.collection('bookmarkItem').create(newData);
  console.log(newData);
  return record;
}
