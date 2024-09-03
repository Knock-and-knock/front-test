import "cardCreate/application/CardApplication.css";
import Header from "header/Header.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressSearchComponent from "./AddressSearchComponent";
import { useCardCreate } from "./CardApp";

function FamilyAddAddress() {
  const { userInfo, setUserInfo } = useCardCreate();
  const navigate = useNavigate();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handlePaging = () => {
    navigate("/cardapp/fsimplepw");
  };

  // 다음 주소검색 api
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 주소 업데이트 및 userInfo에 저장
    setUserInfo({ ...userInfo, cardIssueFirstAddress: fullAddress /*district*/ });
    setIsPostcodeOpen(false);
  };
  // 빈칸 확인
  useEffect(() => {
    const extraInfo = [
      "cardIssueFirstAddress",
      "cardIssueSecondAddress",
    ];
    const isFull = extraInfo.every(
      (field) =>
        userInfo[field] &&
        userInfo[field].trim() !== ""
    );

    setIsButtonEnabled(isFull);
  }, [userInfo]);

  const handleDetailAddressChange = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, cardIssueSecondAddress: value });
  };

  return (
    <div className="card-app-container">
      <Header />
      <div className="app-title">
        <div className="title-text">
          <span>집주소를</span>
          <br />
          <span>입력해주세요</span>
        </div>
        <div className="pageNumber">3/4</div>
      </div>
      <div className="app-input-container">
        <div className="app-input">
          <input
            placeholder="도로명, 지번, 건물명 검색"
            value={userInfo.cardIssueFirstAddress || ""}
            onClick={() => setIsPostcodeOpen(true)}
            readOnly
          />
        </div>
        <div className="app-input">
          <input
            placeholder="상세주소"
            value={userInfo.cardIssueSecondAddress || ""}
            onChange={handleDetailAddressChange}
          />
        </div>
        <p className="caption-text">해당 주소로 카드가 배송됩니다.</p>
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
      {isPostcodeOpen && (
        <AddressSearchComponent
          onComplete={handleComplete}
          onClose={() => setIsPostcodeOpen(false)}
        />
      )}
    </div>
  );
}

export default FamilyAddAddress;
