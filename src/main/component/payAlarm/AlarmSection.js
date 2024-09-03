import alarm from "image/payAlarm.png";
import 'main/component/payAlarm/AlarmSection.css';

function AlarmSection({handlePayAlarmClick}) {
  return (
    <div className="alarm-section" onClick={handlePayAlarmClick}>
      <div className="alarm-button">
        <img src={alarm} alt="이상징후" className="icon" />
        <div className="alarm-main-text">
          <p className="alarm-head-text">홍길동님의 소비이상징후</p>
          <p className="alarm-info-text">읽지 않은 알람:0건</p></div>
      </div>
    </div>
  );
}

export default AlarmSection;
