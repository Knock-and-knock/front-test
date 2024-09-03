import { call } from "login/service/ApiService";
import NextBtn from "matching/button/NextBtn";
import SkipBtn from "matching/button/SkipBtn";
import Header from "matching/header/Header";
import "matching/header/Header.css";
import "matching/Match.css";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "./button/BackBtn";
import SubmitBtn from "./button/SubmitBtn";
import FYIInput from "./notice/FYIInput";
import FYINotice from "./notice/FYINotice";
import TitleInput from "./notice/TitleInput";
import TitleNotice from "./notice/TitleNotice";

// 컨텍스트 생성
const InfoContext = createContext();

function Match(props) {
  const [info, setInfo] = useState(1);
  const [isInfo, setIsInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    protegeName: "",
    protegePhone: "",
    matchProtectorName: "",
    matchProtegeName: "",
  });
  useEffect(()=>{
    console.log(userInfo);
  })

  const navigate = useNavigate();

  const handleNextBtn = () => {
    setInfo(2);
  };

  const handleBackBtn = () => {
    setInfo(1);
  };

  const handleBackPageBtn = () => {
    navigate(-1);
  };

  const handleSubmitBtn = () => {
    call("/api/v1/match","POST",userInfo).then((response)=>{
      navigate("/matching", { state: { matchStatus: response.matchStatus } });
    }
    ).catch((error)=>{
      console.log(error.message)
    });
  };

  const handleIsInfoChange = (isFilled) => {
    setIsInfo(isFilled);
  };

  return (
    <InfoContext.Provider value={{ userInfo, setUserInfo }}>
      <div className="match-container">
        <Header />
        {info === 1 ? <FYINotice /> : <TitleNotice />}
        {info === 1 ? (
          <FYIInput handleIsInfoChange={handleIsInfoChange} />
        ) : (
          <TitleInput handleIsInfoChange={handleIsInfoChange} />
        )}
        <div className="btnContainer">
          {info === 1 ? (
            <SkipBtn handleBackPageBtn={handleBackPageBtn} />
          ) : (
            <BackBtn handleBackBtn={handleBackBtn} />
          )}
          {info === 1 ? (
            <NextBtn handleNextBtn={handleNextBtn} isDisabled={!isInfo} />
          ) : (
            <SubmitBtn handleSubmitBtn={handleSubmitBtn} isDisabled={!isInfo} />
          )}
        </div>
      </div>
    </InfoContext.Provider>
  );
}

export default Match;
export { InfoContext };

