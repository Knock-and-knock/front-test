import ChatSection from "main/component/chat/ChatSection";
import HeaderA from "main/component/header/HeaderA";
import ButtonGroup from "main/component/serviceBtn/ButtonGroup";
import "main/Main.css";
import { useNavigate } from "react-router-dom";
import CardSectionA from "./component/card/CardSectionA";
import CardTagA from "./component/card/CardTagA";
import { useEffect, useState } from "react";
import { call } from "login/service/ApiService";
import IsCardSectionA from "./component/card/IsCardSectionA";

function MainA() {
  const [isCard, setIsCard] = useState(true);
  //화면전환
  const navigate = useNavigate();
  //음성채팅화면 전환
  const handleVoiceChatClick=()=>{
    navigate("/voicechat");
  }

  const userNo = localStorage.getItem("userNo");
  useEffect(()=>{
    call(`/api/v1/card/${userNo}`,"GET",null).then((response)=>{
      console.log(response);
      console.log(response[0].length);
      if(response.length === 1 && response[0].cardNo === null){
        setIsCard(false);
      }
    }).catch((error)=>{
      console.log(error);
    });
  });
  return (
    <div className="containerA">
      <HeaderA />
      <ChatSection handleVoiceChatClick={handleVoiceChatClick}/>
      <ButtonGroup />
      <CardTagA/>
      {isCard?<IsCardSectionA/>:<CardSectionA />}
      
    </div>
  );
}

export default MainA;
