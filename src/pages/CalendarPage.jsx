import CostumeCard from './../components/CostumeCard/CostumeCard';

function CalendarPage(props) {
  //로컬에 저장한 북마크에서 입력한 데이터를 bookmarkData애 할당
  const bookmarkData = JSON.parse(localStorage.getItem('bookmarkItem'));
  //이거 구조분해 할당해서 사용
  // const { address, skyCondition, comment, rate, saveTime, upperItems, lowerItems } = bookmarkData;

  //밑에 임시로 사용 느낌? 작성할게요
  return (
    <>
      <div>달력</div>
      <h1>임시</h1>
      {bookmarkData && (
        <div>
          <h1>{bookmarkData.address}</h1>
          <p>{bookmarkData.skyCondition}</p>
          <p>{bookmarkData.comment}</p>
          <p>{bookmarkData.saveTime}</p>lowerItems
          {bookmarkData.upperItems.map((card) => (
            <CostumeCard key={card.id} record={card} imageUrl={card.costumeImage} />
          ))}
          {bookmarkData.lowerItems.map((card) => (
            <CostumeCard key={card.id} record={card} imageUrl={card.costumeImage} />
          ))}
        </div>
      )}
    </>
  );
}

export default CalendarPage;
