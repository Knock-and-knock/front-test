import React, { useState, useRef, useEffect } from 'react';
import styles from 'welfare/css/WelfareCheckPW.module.css'; // CSS 모듈 import
import Header from 'header/Header.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { call } from 'login/service/ApiService';
import { useSpecHook } from './WelfareInputTotal';

function WelfareCheckPW() {
    const navigate = useNavigate();
    const location = useLocation();
    const cardId = location.state.value;
    const { userSpec} = useSpecHook();

    const gopayComplete = () => {
        if (password.length === 6) {
            navigate('/welfare-input/paycomplete');
            call('/api/v1/welfare-book/reserve', 'POST', userSpec).then((response)=>{
                console.log(response);
    
                call('/api/v1/card-history', 'POST',{
                        cardHistoryAmount: userSpec.welfareBookTotalPrice,
                        cardHistoryShopname: "돌봄 서비스",
                        // cardHistoryApprove: getCßurrentFormattedDate(),
                        cardCategoryNo: 8,
                        cardId: cardId,
                    }).then((response)=> {    
                    navigate('/welfare-input/paycomplete');
                }).catch((error)=>{
                    console.log("카드내역 생성 실패: " + error)
                    alert("카드내역 생성 실패했음");
                });
    
                // navigate('/welfare-set-pw', { state: { reservationData: response.data } });
            }).catch((error)=>{
                console.log("예약 실패: " + error)
                alert("예약 실패");
            });
        }
    }

    const [password, setPassword] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        // 페이지 로드 시 input에 자동 포커스 설정
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleCircleClick = () => {
        inputRef.current.focus(); // 클릭 시 input에 포커스
    };

    const handleChange = (e) => {
        let value = e.target.value.slice(0, 6);  // 최대 6자리 숫자

        // Backspace 키를 눌렀을 때
        if (e.nativeEvent.inputType === "deleteContentBackward") {
            value = password.slice(0, -1);
        }

        setPassword(value);
    };

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles["main-container"]}>
                <div className={styles["pay-container"]}>
                    <p className={styles.infomation}>결제 비밀번호를 입력하세요</p>
                </div>

                <div className={styles["password-container"]} onClick={handleCircleClick}>
                    <div className={styles["password-section"]}>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div
                                key={index}
                                className={password.length >= index ? styles.bluecircle : styles.graycircle}
                            />
                        ))}
                    </div>
                    <p className={styles['incorrect-message']}>비밀번호가 틀립니다.</p>
                    {/* 비번 틀리면 css에서 나오게 하기!! */}
                </div>

                {/* 숨겨진 input 요소 */}
                <input
                    ref={inputRef}
                    type="number"
                    value={password}
                    onChange={handleChange}
                    className={styles["hidden-input"]}
                />

                <div
                    className={`${styles["main-section"]} ${styles["go-pay"]}`}
                    onClick={password.length === 6 ? gopayComplete : null}  // 6자리일 때만 클릭 가능
                    style={{
                        backgroundColor: password.length === 6 ? '#80BAFF' : 'rgba(128,186,255,0.5)'
                    }}
                >
                    <p className={`${styles["main-text"]} ${styles["go-pay-text"]}`}>다음</p>
                </div>
            </div>
        </div>
    );
}

export default WelfareCheckPW;
