import "cardCreate/application/CardApplication.css";
import Header from "header/Header";
import no from "image/no.png";
import yes from "image/yes.png";
import { useNavigate } from "react-router-dom";
import { useCardCreate } from "./CardApp";

function FamilyCardYN(props) {
  const { userInfo, setUserInfo } = useCardCreate();
  const navigate = useNavigate();

  const handleChange = () => {
    setUserInfo({
      ...userInfo,
      cardIssueIsFamily: true
    });
    navigate("/cardapp/fdefaultinfo");
  };

  const handleSuccess = () => {
    setUserInfo({
      ...userInfo,
      cardIssueIsFamily: false
    });
    navigate("/cardapp/cardsuccess");
  };

  return (
    <div className="card-app-container">
      <Header />
      <div className="app-title">
        <div className="title-text">
          <span>가족카드를 발급하시나요?</span>
        </div>
      </div>
      <div className="family-app-container">
        <div className="family-app-rolecheck">
          <div className="familyCard">
            <img src={yes} alt="발급버튼" className="icon-yes" onClick={handleChange} />
            <p>발급하고 싶습니다</p>
          </div>
          <div className="familyCard">
            <img src={no} alt="비발급버튼" className="icon-no" onClick={handleSuccess} />
            <p>발급하지 않습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyCardYN;
