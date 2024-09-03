import "cardCreate/application/CardApplication.css";
import Header from "header/Header";
import { call } from "login/service/ApiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardCreate } from "./CardApp";

function FamilyDefaultInfo(props) {
  const { userInfo, setUserInfo } = useCardCreate();

  const formatPhoneNumber = (value) => {
    return value
      .replace(/[^0-9]/g, '')  // 숫자만 남기기
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`); // 하이픈 추가
  };

  useEffect(() => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      cardIssueIsFamily: true,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardIssuePhone") {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: formatPhoneNumber(value),
      }));
    } else {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: value,
      }));
    }
  };

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const handlePaging = () => {
    navigate("/cardapp/fextrainfo");
  };

  // 처음 페이지 로딩 시 handleReadInfo 실행
  useEffect(() => {
    handleReadInfo();
  }, []);

  // 입력된 데이터의 유효성 검사
  useEffect(() => {
    const extraInfo = ["cardIssueKname", "cardIssuePhone"];
    const isFull = extraInfo.every(
      (field) =>
        userInfo[field] &&
        userInfo[field].trim() !== ""
    );

    setIsButtonEnabled(isFull);
  }, [userInfo]);

  const handleReadInfo = () => {
    call("/api/v1/card/readInfo", "GET")
      .then((response) => {
        // 불러온 정보를 기존 userInfo에 병합
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          ...response,
          cardIssuePhone: formatPhoneNumber(response.cardIssuePhone || ""),
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="card-app-container">
      <Header />
      <div className="app-title">
        <div className="title-text">
          <span>가족의 기본정보를</span>
          <br />
          <span>입력해 주세요</span>
        </div>
        <div className="pageNumber">1/4</div>
      </div>
      <div className="app-input-container">
        <div className="app-input">
          <span>이름</span>
          <input
            placeholder="이름"
            name="cardIssueKname"
            onChange={handleChange}
            value={userInfo.cardIssueKname || ""}
          />
        </div>
        <div className="app-input">
          <span>연락처</span>
          <input
            type="tel"
            placeholder="전화번호"
            name="cardIssuePhone"
            onChange={handleChange}
            value={userInfo.cardIssuePhone || ""}
            maxLength={13}
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

export default FamilyDefaultInfo;
