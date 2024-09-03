import HeaderB from "main/component/header/HeaderB";
import ButtonGroup from "main/component/serviceBtn/ButtonGroup";
import "main/Main.css";
import CardTagB from "./component/card/CardTagB";
import IsCardSectionB from "./component/card/IsCardSectionB";
import AlarmSection from "./component/payAlarm/AlarmSection";
import { useNavigate } from "react-router-dom";

function MainB() {
  //화면전환
  const navigate = useNavigate();
  //소비이상징후화면 전환
  const handlePayAlarmClick=()=>{
    navigate("/alarm");
  }
  return (
    <div className="containerB">
      <HeaderB />
      <AlarmSection handlePayAlarmClick={handlePayAlarmClick}/>
      <ButtonGroup />
      <CardTagB/>
      <IsCardSectionB />
    </div>
  );
}

export default MainB;
