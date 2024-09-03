import "cardCreate/CardCreate.css";
import Header from "header/Header";
import cashback from "image/icon/cashback.png";
import insurance from "image/icon/insurance.png";
import medical from "image/icon/medical.png";
import personalCard from "image/personalCard.png";
import { Outlet, useNavigate } from "react-router-dom";


function CardCreate(props) {
  const navigate=useNavigate();
  const handleApp=()=>{
    navigate("/cardapp/defaultinfo");
  }
  return (
    <div className="card-create-container">
      <Header />
      <div className="cardName">
        <p>국민카드 Life Care</p>
      </div>
      <div className="create-card-image">
        {/* <img src={card} alt="카드이미지" className="cardImage" /> */}
        <img src={personalCard} alt="카드이미지" className="cardImage" />
      </div>
      <div className="boon-group">
        <div className="medical">
          <img src={medical} alt="의료아이콘" />
          <div className="boon-text">
            병원, 약국
            <br />
            <b>5%</b>캐시백
          </div>
        </div>
        <div className="insurance">
          <img src={insurance} alt="보험아이콘" />
          <div className="boon-text">
            보험료
            <br />
            <b>5%</b>캐시백
          </div>
        </div>
        <div className="cashback">
          <img src={cashback} alt="캐시백아이콘" />
          <div className="boon-text">
            월 이용 TOP3
            <br />
            <b>5%</b>캐시백
          </div>
        </div>
      </div>
      <div className="anuualContainer">
        <p className="anuual-title">연회비</p>
        <hr />
        <div className="anuual-text">
          <span>국내전용</span>
          <span>
            <b>2만원</b>
          </span>
        </div>
        <div className="anuual-text">
          <span>VISA</span>
          <span>
            <b>2만3천원</b>
          </span>
        </div>
      </div>
      <button className="cardAppBtn" onClick={handleApp}>신청하기</button>
      <Outlet/>
    </div>
  );
}

export default CardCreate;
