import card from "image/card.png";
import 'main/component/card/CardSectionA.css';

function IsCardSectionA(props) {
  return (
    <div className="card-sectionA">
      <div className="card-add-A">
        <div className="card-content-A">
          <img src={card} alt="" className="creditCard" />
        </div>
      </div>
    </div>
  );
}

export default IsCardSectionA;
