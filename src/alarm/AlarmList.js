import "alarm/AlarmList.css";
import Header from 'header/Header';
import AlarmHistory from './component/AlarmHistory';
import AlarmMark from './component/AlarmMark';
import { useEffect, useState } from "react";
import { call } from "login/service/ApiService";

function AlarmList(props) {

    const [alarmList, setAlarmList] = useState([]);
    const [alarmNum, setAlarmNum] = useState(0);

    // 알람 목록 조회
    useEffect(() => {
        getAlarmList();
        fetchAlarmCount();
    }, []);

    const getAlarmList = ()=>{
        call('/api/v1/notification/read', "GET", null)
        .then(response => setAlarmList(response))
        .catch(() => alert("알람 조회 실패"));
    };

     // 알림 수를 가져오는 함수
     const fetchAlarmCount = () => {
        call('/api/v1/notification/read/count', 'GET', null)
            .then(response => setAlarmNum(response))
            .catch(() => alert("알람 건수 조회 실패"));
    };

    return (
        <div className='alarmList-container'>
            <Header/>
            <AlarmMark alarmNum={alarmNum} fetchAlarmCount={fetchAlarmCount} getAlarmList={getAlarmList}/>
            <AlarmHistory fetchAlarmCount={fetchAlarmCount} alarmList={alarmList} getAlarmList={getAlarmList}/>
            
        </div>
    );
}

export default AlarmList;