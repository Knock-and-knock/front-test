import "cardCreate/application/CardApplication.css";
import Header from "header/Header";
import { call } from "login/service/ApiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DefaultInfo(props) {
  
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const navigate = useNavigate();

  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length === 11) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (phoneNumber.length === 10) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    return phoneNumber; // 예상하지 못한 포맷이라면 원래 값을 반환
  }

  const handlePaging = () => {
    navigate("/cardapp/extrainfo");
  };
  useEffect(() => {
    call("/api/v1/card/myInfo", "GET")
      .then((response) => {
        setUserName(response.userName);
        setUserPhone(formatPhoneNumber(response.userPhone));
      })
      .catch((error) => {
      });
  });

  return (
    <div className="card-app-container">
      <Header />
      <div className="app-title">
        <div className="title-text">
          <span>기본정보를</span>
          <br />
          <span>확인해 주세요</span>
        </div>
        <div className="pageNumber">1/7</div>
      </div>
      <div className="app-input-container">
        <div className="app-input">
          <span>이름</span>
          <input name="name" value={userName} readOnly />
        </div>
        <div className="app-input">
          <span>연락처</span>
          <input name="phoneNum" value={userPhone} readOnly />
        </div>
      </div>
      <button className="appBtn" onClick={handlePaging}>
        다음
      </button>
    </div>
  );
}

export default DefaultInfo;
