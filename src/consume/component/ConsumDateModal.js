import React, { useState } from 'react';
import Modal from 'react-modal';
import "consume/component/ConsumDateModal.css";
import { call } from 'login/service/ApiService';

function ConsumDateModal({ isOpen, closeModal, updateDates, setConsumList, cardId }) {
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0]; // 현재 날짜를 'YYYY-MM-DD' 형식으로 반환
    };

    const [localStartDate, setLocalStartDate] = useState(getCurrentDate());
    const [localEndDate, setLocalEndDate] = useState(getCurrentDate());

    const handleStartDateChange = (event) => {
        const value = event.target.value;
        setLocalStartDate(value);
        if (new Date(value) > new Date(localEndDate)) {
            setLocalEndDate(value); // 시작일 변경 후 종료일이 시작일보다 빠르면 종료일을 시작일과 같게 설정
        }
    };

    const handleEndDateChange = (event) => {
        const value = event.target.value;
        setLocalEndDate(value);
    };

    const handleSaveDates = () => {
        updateDates(localStartDate, localEndDate);
        call('/api/v1/card-history', "GET", { 
            cardId: cardId, 
            startDate: localStartDate,
            endDate: localEndDate
        }).then((response) => {
            setConsumList(response);
        }).catch((error) => {
            console.error("데이터 조회 실패", error);
        });
        closeModal(); // 모달 닫기
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: "2"
                },
                content: {
                    top: "50%",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    height: "auto",
                    borderRadius: "15px 15px 0px 0px",
                },
            }}
        >
            <div className="container">
                <div className="modal-section modal-container">
                    <p className="consume-modal-title">기간 설정</p>
                    <hr />
                    <div className="reserve-info-container-box">
                        <div className="consume-info-container1">
                            <span className="consume-info-text">시작일</span>
                            <input 
                                type="date" 
                                className='consume-start-date' 
                                value={localStartDate}
                                onChange={handleStartDateChange} 
                            />
                        </div>
                        <div className="consume-info-container2">
                            <span className="consume-info-text">종료일</span>
                            <input 
                                type="date" 
                                className='consume-end-date' 
                                value={localEndDate}
                                min={localStartDate}
                                onChange={handleEndDateChange} 
                            />
                        </div>
                        <hr />
                    </div>
                    <div className="modal-buttons">
                        <span className="main-text modal-cancel" onClick={closeModal}>닫기</span>
                        <span className="main-text modal-yeah" onClick={handleSaveDates}>다음</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ConsumDateModal;