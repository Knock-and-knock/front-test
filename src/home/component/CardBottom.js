import React from 'react';
import "home/component/CardBottom.css";
import { useNavigate } from 'react-router-dom';

function CardBottom({ isProtege, cardlist }) {
    const navigate = useNavigate();

    const handleCardListClick = () => {
        navigate('/consumption', { state: { value: cardlist } });
    };

    const handleFamilyCardClick = () => {
        if (!cardlist.cardIsFamily) {
            navigate('/cardapp/fdefaultinfo');
        }
    };

    const handleConsumeReportClick = () => {
        navigate('/consume-report', { state: { value: cardlist } });
    };

    return (
        <div className={`cardBottom-container ${!isProtege ? 'blue-bottom' : ''}`}>
            <p className="cardBottom-Rseparator" onClick={handleCardListClick}>카드내역</p>
            <p 
                className={`${cardlist.cardIsFamily ? "family-card" : ""}`} 
                onClick={handleFamilyCardClick}
            >
                가족카드 발급
            </p>
            <p className="cardBottom-Lseparator" onClick={handleConsumeReportClick}>소비리포트</p>
        </div>
    );
}

export default CardBottom;