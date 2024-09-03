import "cardCreate/application/CardApplication.css";
import Header from "header/Header";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardCreate } from "./CardApp";

function SimplePW(props) {
  const { userInfo, setUserInfo, handleSendInfo } = useCardCreate();
  const [simplePw, setSimplePw] = useState(["", "", "", ""]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
  //autoFocus
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  // 입력 필드 참조
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // 입력값 변경 처리
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length === 1 && /^\d$/.test(value)) { // 숫자 1자리만 입력 허용
      const newSimplePw = [...simplePw];
      newSimplePw[index] = value;
      setSimplePw(newSimplePw);

      if (index < 3) {
        inputRefs[index + 1].current.focus(); // 다음 input으로 이동
      } else {
        inputRefs[index].current.blur(); // 마지막 input에서 focus 해제
      }

      // 비밀번호를 하나의 문자열로 만들어 userInfo에 저장
      const simplePwString = newSimplePw.join("");
      setUserInfo({ ...userInfo, cardIssuePassword: simplePwString });

      // 모든 필드가 채워지면 버튼 활성화
      if (simplePwString.length === 4) {
        setIsButtonEnabled(true);
      }
    }
  };

  // 모든 입력이 완료된 후 다시 포커스될 때 초기화
  const handleInputFocus = () => {
    if (simplePw.join("").length === 4) {
      setSimplePw(["", "", "", ""]);
      setIsButtonEnabled(false);
      inputRefs[0].current.focus(); // 첫번째 input으로 포커스 이동
    }
  };
  const navigate = useNavigate();
  const handlePaging = () => {
    handleSendInfo();
    navigate("/cardapp/familycardyn");
  };

  return (
    <div className="card-app-container">
      <Header />
      <div className="app-title">
        <div className="title-text">
          <span>카드 비밀번호에 사용할</span>
          <br />
          <span>숫자 4자리를 입력하세요</span>
        </div>
        <div className="pageNumber">7/7</div>
      </div>
      <div className="password-container">
        <div className="pw-input">
          {simplePw.map((value, index) => (
            <input
              key={index}
              className="password"
              type="password"
              maxLength={1}
              value={value}
              ref={inputRefs[index]}
              onChange={(e) => handleChange(e, index)}
              onFocus={handleInputFocus} // 모든 입력 완료 후 다시 포커스될 때 초기화
            />
          ))}
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

export default SimplePW;
