import { call } from 'login/service/ApiService';
import React, { useEffect, useState } from 'react';

function MyMatchingInfo(props) {
    const [matchingInfo, setMatchingInfo] = useState({});
    const [error, setError] = useState(null);
    useEffect(()=>{
        call('/api/v1/match', 'GET', null)
        .then((response)=>setMatchingInfo(response))
        .catch(error => {
            console.log("매칭 정보 조회 오류", error);
            setError("매칭 정보를 불러오는 데 문제가 발생했습니다.");
        });
    },[]);
    return (
        <div>
            <p>matchingInfo</p>
        </div>
    );
}

export default MyMatchingInfo;