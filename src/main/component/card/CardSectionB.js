import info from "image/icon/info.png";
import 'main/component/card/CardSectionB.css';
import CreateCard from "main/component/card/CreateCard";

function CardSectionB(props) {
  return (
    <div className="card-sectionB">
      <div className="card-add-B">
        <div className="card-content-B">
          <img src={info} alt="" className="card-info-icon" />
          <div className="card-text">등록된 카드가 없습니다.</div>
        </div>
        <CreateCard/>
      </div>
    </div>
  );
}

export default CardSectionB;
