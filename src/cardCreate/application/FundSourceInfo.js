import Header from 'header/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardCreate } from './CardApp';

function FundSourceInfo(props) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useCardCreate();
  const handlechange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handlePaging = () => {
    navigate("/cardapp/address");
  };

  //자금원천
  const sourceSelectList = [
    { value: "default", name: "선택" },
    { value: "buisness", name: "사업소득" },
    { value: "earned", name: "근로소득" },
    { value: "interest", name: "이자" },
    { value: "dividend", name: "배당" },
    { value: "other", name: "기타소득" },
    { value: "borrowing", name: "차입금" },
    { value: "rental", name: "임대보증금" },
  ];
  //고위직업군
  const jobSelectList = [
    { value: "default", name: "선택" },
    { value: "noRisk", name: "비위험" },
    { value: "mediumRisk", name: "중위험" },
    { value: "highRisk", name: "고위험" },
  ];
  //거래목적
  const purposeSelectList = [
    { value: "default", name: "선택" },
    { value: "living", name: "생활비목적" },
    { value: "pocket", name: "용돈목적" },
    { value: "invest", name: "투자목적" },
  ];
  // 빈칸 확인
  useEffect(() => {
    const creditInfo = [
      "cardIssueSource",
      "cardIssueIsHighrisk",
      "cardIssuePurpose",
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
          <span>자금세탁 방지를 위한</span>
          <br />
          <span>필수사항을 확인해 주세요</span>
        </div>
        <div className="pageNumber">5/7</div>
      </div>
      <div className="app-input-container">
        <div className="app-input">
          <span>자금의 원천</span>
          <div className="double-input-container">
            <select
              className="fullSelectMenu"
              name="cardIssueSource"
              onChange={handlechange}
              value={userInfo.cardIssueSource}
            >
              {sourceSelectList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="app-input">
          <span>고위험직업 확인</span>
          <div className="double-input-container">
            <select
              className="fullSelectMenu"
              name="cardIssueIsHighrisk"
              onChange={handlechange}
              value={userInfo.cardIssueIsHighrisk}
            >
              {jobSelectList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="app-input">
          <span>거래의 목적</span>
          <div className="double-input-container">
            <select
              className="fullSelectMenu"
              name="cardIssuePurpose"
              onChange={handlechange}
              value={userInfo.cardIssuePurpose}
            >
              {purposeSelectList.map((item) => (
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
export default FundSourceInfo;