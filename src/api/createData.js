import pb from './pocketbase';

export default async function createData(formData) {
  const newData = {
    weather: formData.skyCondition,
    address: formData.address,
    date: formData.date,
    saveTime: formData.saveTime,
    comment: formData.comment,
    upperItems: formData.upperItems,
    lowerItems: formData.lowerItems,
    user: formData.uid,
    rate: formData.rate,
    checkDate: formData.checkDate,
  };

  const record = await pb.collection('bookmarkItem').create(newData);

  return record;
}
