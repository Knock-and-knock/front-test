import Header from 'header/Header';
import { call } from 'login/service/ApiService';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'welfare/css/WelfarePay.css';
import cardImage from 'image/card2.png';

function WelfarePay(props) {
    const [cardId, setCardId] = useState(null);
    const [cardList, setCardList] = useState([]);
    const [cardNo, setCardNo] = useState('');
    const navi = useNavigate();

    useEffect(() => {
        call('/api/v1/card', "GET", null)
            .then(response => {
                setCardList(response);
            
                if (response.length > 0) {
                    const firstCard = response[0];
                    setCardId(firstCard.cardId);
                    setCardNo(firstCard.cardNo.slice(-4));
                }
            })
            .catch(error => {
                alert("카드 조회에 실패했습니다.");
            });
    }, []);

    const handleGetCardId = (e) => {
        const selectedCardId = e.currentTarget.value;
        setCardId(selectedCardId);

        const selectedCard = cardList.find(card => card.cardId === Number(selectedCardId));
        if (selectedCard) {
            setCardNo(selectedCard.cardNo.slice(-4));
        }
    };

    const handleGoCheckPW = () => {
        if (cardId) {
            navi('/welfare-input/welfare-check-pw', { state: { value: cardId } });
        } else {
            alert("카드를 선택해 주세요.");
        }
    };

    return (
        <div className='welfarePay-container'>
            <Header />
            <div className="information-container-pay">
                <p className="information-pay">결제할 카드를</p>
                <p className="information-pay">선택 해주세요</p>
            </div>
            <select onChange={handleGetCardId} className='welfarePay-select'>
                {cardList.map((card,index) => (
                    <option key={index} value={card.cardId}>
                        {card.cardNo}
                    </option>
                ))}
            </select>
            <div className='pay-card-wrap'>
                <img src={cardImage} alt="카드" className="pay-card" />
            </div>
            <p className='pay-cardNo'>신한 Life Care ({cardNo})</p>
            <div className='goCheckBtn-wrap'>
                <p className='goCheckBtn' onClick={handleGoCheckPW}>다음</p>
            </div>
        </div>
    );
}

export default WelfarePay;