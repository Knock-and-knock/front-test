import card from "image/card.png";
import 'main/component/card/CardSectionB.css';

function IsCardSectionB(props) {
  return (
    <div className="card-sectionB">
      <div className="card-add-B">
        <div className="card-content-B">
          <img src={card} alt="" className="creditCard" />
        </div>
      </div>
    </div>
  );
}

export default IsCardSectionB;
