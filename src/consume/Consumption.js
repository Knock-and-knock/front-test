import "consume/Consumption.css";
import Header from 'header/Header';
import { call } from "login/service/ApiService";
import { useEffect, useState } from 'react';
import ConsumCard from "./component/ConsumCard";
import ConsumDateModal from './component/ConsumDateModal';
import ConsumDetailModal from './component/ConsumDetailModal';
import ConsumList from './component/ConsumList';
import { useLocation } from "react-router-dom";
import info from "image/icon/info.png";

function Consumption() {
    const location = useLocation();
    const cardList = location.state.value;

    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [consumList, setConsumList] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [cardDetail, setCardDetail] = useState({});
    
    // 한국 시간으로 날짜를 반환하는 함수
    const getKSTDate = (date) => {
        const offset = 9 * 60; // 한국 시간대는 UTC+9
        const utcDate = new Date(date.getTime() + offset * 60 * 1000);
        return utcDate.toISOString().split('T')[0];
    };

    const getStartOfMonth = () => {
        const today = new Date();
        const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return getKSTDate(firstDayOfNextMonth);
    };

    const getEndOfMonth = () => {
        const today = new Date();
        return getKSTDate(today);
    };

    const updateDates = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleOpenDateModal = (cardId) => {
        setSelectedCardId(cardId);
        setIsOpenDate(true);
    };

    const closeDetailModal = () => setIsOpenDetail(false);
    const closeDateModal = () => setIsOpenDate(false);

    useEffect(() => {
        document.body.classList.toggle("unscrollable", isOpenDetail || isOpenDate);
    }, [isOpenDetail, isOpenDate]);

    useEffect(() => {
        const start = getStartOfMonth();
        const end = getEndOfMonth();
        setStartDate(start);
        setEndDate(end);

        call('/api/v1/card-history', "GET", {
            cardId: cardList.cardId, 
            startDate: start, 
            endDate: end
        })
        .then((response) => setConsumList(response))
        .catch(() => alert("내역 조회 실패"));

    }, [cardList.cardId]);

    // 총 이용금액 계산
    const calculateTotalAmount = () => {
        return consumList.reduce((total, item) => total + item.cardHistoryAmount, 0);
    };

    return (
        <div>
            <Header />
            <div className="consumption-container">
                <ConsumCard 
                    cardlist={cardList}
                    handleOpenModal={handleOpenDateModal}
                    startDate={startDate}
                    endDate={endDate}
                    totalAmount={calculateTotalAmount()}
                />
                {consumList.length !== 0?(<ConsumList 
                    setIsOpenDetail={setIsOpenDetail}
                    setCardDetail={setCardDetail}
                    consumList={consumList}
                />):
                (<p className="cardlist-none"><img src={info} alt="카드내역 없음" className="card-info-icon" />해당 기간 카드내역이 없습니다.</p>)} 

                <ConsumDetailModal 
                    isOpen={isOpenDetail} 
                    closeModal={closeDetailModal} 
                    cardDetail={cardDetail}
                />
                <ConsumDateModal 
                    setConsumList={setConsumList} 
                    isOpen={isOpenDate} 
                    closeModal={closeDateModal} 
                    updateDates={updateDates} 
                    cardId={selectedCardId} 
                />
            </div>
        </div>
    );
}

export default Consumption;