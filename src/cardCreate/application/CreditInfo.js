import "cardCreate/application/CardApplication.css";
import Header from "header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardCreate } from "./CardApp";

function CreditInfo(props) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useCardCreate();
  const handlechange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handlePaging = () => {
    navigate("/cardapp/fundsourceinfo");
  };

  //연소득
  const eSelectList = [
    { value: "default", name: "선택" },
    { value: "1000", name: "1천만원 이하" },
    { value: "2000", name: "2천만원 이상 5천만원 미만" },
    { value: "5000", name: "5천만원 이상 8천만원 미만" },
    { value: "8000", name: "8천만원 이상" },
  ];
  //신용점수
  const scoreSelectList = [
    { value: "default", name: "선택" },
    { value: "1", name: "1등급" },
    { value: "2", name: "2등급" },
    { value: "3", name: "3등급" },
    { value: "4", name: "4등급" },
    { value: "5", name: "5등급" },
    { value: "6", name: "6등급" },
    { value: "7", name: "7등급" },
    { value: "8", name: "8등급" },
    { value: "9", name: "9등급" },
  ];
  //결제일
  const paySelectList = [
    { value: "default", name: "선택" },
    { value: "firstday", name: "매달 1일" },
    { value: "middleday", name: "매달 15일" },
    { value: "lastday", name: "매달 말일" },
  ];
  // 빈칸 확인
  useEffect(() => {
    const creditInfo = [
      "cardIssueIncome",
      "cardIssueCredit",
      "cardIssueAmountDate",
    ];
    const isFull = creditInfo.every(
      (field) =>
        userInfo[field] &&
        userInfo[field].trim() !== "" &&
        userInfo[field] !== "default"
    );

    setIsButtonEnabled(isFull);
  }, [userInfo]);

  return (
    <div className="card-app-container">
      <Header />
      <div className="app-title">
        <div className="title-text">
          <span>추가정보를</span>
          <br />
          <span>입력해 주세요</span>
        </div>
        <div className="pageNumber">4/7</div>
      </div>
      <div className="app-input-container">
        <div className="app-input">
          <span>연소득</span>
          <div className="double-input-container">
            <select
              className="fullSelectMenu"
              name="cardIssueIncome"
              onChange={handlechange}
              value={userInfo.cardIssueIncome}
            >
              {eSelectList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="app-input">
          <span>신용점수</span>
          <div className="double-input-container">
            <select
              className="fullSelectMenu"
              name="cardIssueCredit"
              onChange={handlechange}
              value={userInfo.cardIssueCredit}
            >
              {scoreSelectList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="app-input">
          <span>카드 이용대금 결제일</span>
          <div className="double-input-container">
            <select
              className="fullSelectMenu"
              name="cardIssueAmountDate"
              onChange={handlechange}
              value={userInfo.cardIssueAmountDate}
            >
              {paySelectList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button
        className="appBtn"
        onClick={handlePaging}
        disabled={!isButtonEnabled}
        style={{
          backgroundColor: isButtonEnabled ? "#80BAFF" : "rgba(128,186,255,0.5)",
        }}
      >
        다음
      </button>
    </div>
  );
}

export default CreditInfo;
