import React from 'react';
import info from "image/icon/info.png";

function NCardSection(props) {
    return (
        <div className='cardSection-container'> 
    
        <p className='cardSection-title'>카드</p>
        <div className='nCardSection-content'>
            <img src={info} alt="" className="card-info-icon" />
            <p>등록된 카드가 없습니다</p>
        </div>
        
    </div>
    );
}

export default NCardSection;