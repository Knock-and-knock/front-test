import { CommonContext } from 'App3';
import Header from 'header/Header';
import React, { useContext, useEffect, useState } from 'react';
import MyBasicInfo from './component/MyBasicInfo';
import MyExtraInfo from './component/MyExtraInfo';
import "mypage/MyPage.css"
import DisconnectionModal from './component/modal/DisconnectionModal';
import { call } from 'login/service/ApiService';
import { useNavigate } from 'react-router-dom';



function MyPage(props) {

    const{loginUser,setLoginUser} = useContext(CommonContext);
    const loginUserType = localStorage.getItem("loginUser");
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const navi = useNavigate();

    useEffect(() => {
        setLoginUser(loginUserType);
    }, [loginUserType, setLoginUser]);

    useEffect(() => {
        call('/api/v1/users', 'GET', null)
            .then(response => setUserInfo(response))
            .catch(error => {
                console.log("회원 정보 조회 오류", error);
                setError("회원 정보를 불러오는 데 문제가 발생했습니다.");
            });
    }, []);

    const handleLogoutClick = ()=>{
        call('/api/v1/auth/logout',"POST",null)
        .then(()=>{
            navi("/loginid");
            localStorage.removeItem('ACCESS_TOKEN');  
            // localStorage.removeItem('loginUser'); // 생체인증때문에 지웠습니다
        })
        .catch(()=>alert("로그아웃 실패"));
    }

    return (
        <div className='mypage-container'>
            <Header/>
            {error && <p className='error-message'>{error}</p>}
            <p className='mypage-name'>{userInfo.userName}</p>
            <MyBasicInfo userInfo={userInfo}/>
            <MyExtraInfo userInfo={userInfo}/>
            {loginUser==="PROTEGE"&& userInfo.matchNo !== 0?<DisconnectionModal matchNo={userInfo.matchNo}/>:""}
            <div className='mypage-bottom'>
                <p className='logoutBtn' onClick={handleLogoutClick}>로그아웃</p>
                <p className='withdrawalBtn'>회원탈퇴</p>
            </div>
            
        </div>
    );
}

export default MyPage;