import "consume/component/ConsumCard.css";
import "consume/component/ConsumFilter.css";
import card from "image/card2.png";

function ConsumCard({ cardlist, startDate, endDate, handleOpenModal,totalAmount}) {
    return (
        <div className='consumCard-container'>
            <img src={card} alt="카드" className="consume-card" />
            <p>신한 Life Care ({cardlist.cardNo.slice(-4)})</p>
            <div className='filter-content'>
                <div className="filter-date">
                    <p>{startDate && endDate ? `${startDate} ~ ${endDate}` : '날짜 선택'}</p>
                    <button onClick={() => handleOpenModal(cardlist.cardId)} className="filterBtn">기간설정</button>
                </div>
                <div className="filter-totalPrice">
                    <p className='filter-price'>총 이용금액</p>
                    <p className='filter-num'>
                        {totalAmount.toLocaleString()} 원
                    </p>
                </div>
            </div> 
        </div>
    );
}

export default ConsumCard;





