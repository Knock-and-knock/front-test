import "cardCreate/application/CardApplication.css";
import Header from "header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardCreate } from "./CardApp";

function ExtraInfo(props) {
  const { userInfo, setUserInfo } = useCardCreate();

  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "cardIssueFirstEname" || name === "cardIssueLastEname") {
      const upperCaseValue = value.toUpperCase();
      const englishOnlyValue = upperCaseValue.replace(/[^A-Z]/g, ""); // 영어만
      setUserInfo({ ...userInfo, [name]: englishOnlyValue });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handlePaging = () => {
    navigate("/cardapp/agreement");
  };

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  //은행 select메뉴
  const selectList = [
    { value: "default", name: "은행명" },
    { value: "shinhan", name: "신한은행" },
    { value: "woori", name: "우리은행" },
  ];
  
  // 빈칸 확인
  useEffect(() => {
    const extraInfo = [
      "cardIssueFirstEname",
      "cardIssueLastEname",
      "cardIssueEmail",
      "cardIssueAccount",
      "cardIssueBank",
    ];
    const isFull = extraInfo.every(
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
        <div className="pageNumber">2/7</div>
      </div>
      <div className="app-input-container">
        <div className="app-input">
          <span>영문명</span>
          <div className="double-input-container">
            <input
              className="firstInput"
              placeholder="영문 성"
              name="cardIssueFirstEname"
              onChange={handlechange}
              value={userInfo.cardIssueFirstEname || ""}
            />
            <input
              className="secInput"
              placeholder="영문 이름"
              name="cardIssueLastEname"
              onChange={handlechange}
              value={userInfo.cardIssueLastEname || ""}
            />
          </div>
          <p className="caption-text">여권과 동일한 영문명을 입력해 주세요</p>
        </div>
        <div className="app-input">
          <span>이메일</span>
          <input
            placeholder="이메일주소"
            name="cardIssueEmail"
            onChange={handlechange}
            value={userInfo.cardIssueEmail || ""}
          />
          <p className="caption-text">
            카드발급 후 신청내용(계약서) 및 상품설명서,
            <br />
            신용카드 설명서, 약관을 이메일로 보내드립니다.
          </p>
        </div>
        <div className="app-input">
          <span>계좌</span>
          <div className="double-input-container">
            <select
              className="bankSelectMenu"
              name="cardIssueBank"
              onChange={handlechange}
              value={userInfo.cardIssueBank || ""}
            >
              {selectList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              className="secInput"
              placeholder="계좌번호"
              name="cardIssueAccount"
              onChange={handlechange}
              value={userInfo.cardIssueAccount || ""}
            />
          </div>
        </div>
      </div>
      <button
        className="appBtn"
        onClick={handlePaging}
        disabled={!isButtonEnabled}
        style={{
          backgroundColor: isButtonEnabled
            ? "#80BAFF"
            : "rgba(128,186,255,0.5)",
        }}
      >
        다음
      </button>
    </div>
  );
}

export default ExtraInfo;
