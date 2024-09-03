import React from 'react';
import "home/component/CardBottom.css"
import { useNavigate } from 'react-router-dom';


function NCardBottom({isProtege, isAddition}) {
    const navi = useNavigate();

    return (
        <div className={`cardBottom-container ${!isProtege ? 'blue-bottom' : ''}`}>
            <p onClick={()=>navi('/cardcreate')}>{isAddition?"추가 ":""}카드 발급</p>
        </div>
    );
}

export default NCardBottom;