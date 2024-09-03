import { call } from "login/service/ApiService";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CardCreateContext = createContext();
export const useCardCreate = () => useContext(CardCreateContext);


function CardApp(props) {
  const [userInfo, setUserInfo] = useState({});
  //데이터전송로직
  const handleSendInfo = (e) => {
    call("/api/v1/card", "POST", userInfo)
      .then((response) => {
        console.log(response);
        navigate("/cardapp/familycardyn");
      })
      .catch((error) => {
        navigate("/cardapp/familycardyn");
      });
  };

  const handlefSendInfo = (e) => {
    const updatedUserInfo = {
      ...userInfo,
      cardIssueIsFamily: true,
    };
    setUserInfo(updatedUserInfo); // 상태 업데이트
  
    call("/api/v1/card", "POST", updatedUserInfo)
      .then((response) => {
        console.log(response);
        navigate("/cardapp/cardsuccess");
      })
      .catch((error) => {
        navigate("/cardapp/cardsuccess"); // 임시(나중에 삭제)
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <div>
      <CardCreateContext.Provider
        value={{ userInfo, setUserInfo, handleSendInfo, handlefSendInfo }}
      >
          <Outlet />
      </CardCreateContext.Provider>
    </div>
  );
}

export default CardApp;
