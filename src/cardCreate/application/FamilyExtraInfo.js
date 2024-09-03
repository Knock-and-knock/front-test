import "cardCreate/application/CardApplication.css";
import Header from "header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardCreate } from "./CardApp";

function FamilyExtraInfo(props) {

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
    navigate("/cardapp/faddress");
  };

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 빈칸 확인
  useEffect(() => {
    const extraInfo = [
      "cardIssueFirstEname",
      "cardIssueLastEname",
      "relation",
    ];
    const isFull = extraInfo.every(
      (field) =>
        userInfo[field] &&
      userInfo[field].trim() !== ""
    );

    setIsButtonEnabled(isFull);
  }, [userInfo]);

  return (
    <div className="card-app-container">
      <Header />
      <div className="app-title">
        <div className="title-text">
          <span>가족의 추가 정보를</span>
          <br />
          <span>입력해 주세요</span>
        </div>
        <div className="pageNumber">2/4</div>
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
              value={userInfo.cardIssueFirstEname}
            />
            <input
              className="secInput"
              placeholder="영문 이름"
              name="cardIssueLastEname"
              onChange={handlechange}
              value={userInfo.cardIssueLastEname}
            />
          </div>
          <p className="caption-text">여권과 동일한 영문명을 입력해 주세요</p>
        </div>
        <div className="app-input">
          <span>신청자와의 관계</span>
          <input
            placeholder="관계"
            name="relation"
            onChange={handlechange}
            value={userInfo.relation || ""}
          />
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

export default FamilyExtraInfo;
