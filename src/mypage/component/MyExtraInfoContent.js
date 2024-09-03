import React, { useEffect, useState } from 'react';

function MyExtraInfoContent({userInfo}) {
    const [gender, setGender] = useState('');
    useEffect(()=>{
        if(userInfo.protegeGender===1){
            setGender('남');
        }else if(userInfo.protegeGender===2){
            setGender('여');
        }
    },[userInfo.protegeGender]);   
    return (
        <div>
             <div className='info-content'>
                <p>생년월일</p>
                <p>{userInfo.protegeBirth}</p>
            </div>
            <div className='info-content'>
                <p>성별</p>
                <p>{gender}</p>
            </div>
            <div className='info-content'>
                <p>키</p>
                <p>{userInfo.protegeHeight} cm</p>
            </div>  
            <div className='info-content'>
                <p>몸무게</p>
                <p>{userInfo.protegeWeight} kg</p>
            </div>
            <div className='info-content'>
                <p>질병</p>
                <p>{userInfo.protegeDisease}</p>
            </div>
            <div className='info-content'>
                <p>주소</p>
                <p>{userInfo.protegeAddress} {userInfo.protegeAddressDetail}</p>
            </div>
        </div>

    );
}

export default MyExtraInfoContent;