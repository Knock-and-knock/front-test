import React, { useEffect } from 'react';
import styles from 'welfare/css/WelfareCheckSpec.module.css';
import { useNavigate } from 'react-router-dom';
import Header from 'header/Header.js';
import { useSpecHook } from 'welfare/component/WelfareInputTotal';
import { call } from 'login/service/ApiService';

function WelfareCheckSpec() {
    const navigate = useNavigate();
    const { userSpec, setUserSpec } = useSpecHook();

    const getCurrentFormattedDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (localStorage.getItem("loginUser") === "PROTECTOR") {
          call("/api/v1/match", "GET", null)
            .then((response) => {
              setUserSpec({
                ...userSpec,
                protegeUserNo: response.protegeUserNo // 날짜 모달창에서 userSpec에 protegeUserName 추가했으므로 여기서 쓸 수 있음
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
        else {
            const userNo = localStorage.getItem("userNo");
            console.log(userNo);
    
            setUserSpec({
                ...userSpec,
                userNo: parseInt( userNo,10)  // userNo를 userSpec 상태에 추가

            });
            console.log(userSpec);
        
        }
      }, []);

    const formattedReservationInfo = () => {
        if (!userSpec.welfareBookStartDate || !userSpec.welfarebookDurationText) return '정보 없음';
        return `${userSpec.welfareBookStartDate} | ${userSpec.welfarebookDurationText}`;
    };

    const goSetPW = () => {
        navigate('/welfare-input/pay');
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatGender = (gender) => {
        if (gender === 1) {
            return "남성";
        } else {
            return "여성";
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles["main-container"]}>
                <div className={styles["infomation-container"]}>
                    <p className={styles.infomation}>입력하신 정보가</p>
                    <p className={styles.infomation}>맞는지 확인 해주세요</p>
                </div>

                <div className={styles["spec-container"]}>
                    <p className={styles["spec-info"]}>이름</p>
                    <input className={styles["spec-check"]} type="text" placeholder="이름" value={userSpec.protegeUserName || ''} disabled />

                    <p className={styles["spec-info"]}>생년월일</p>
                    <input className={styles["spec-check"]} type="Date" placeholder="생년월일" value={formatDate(userSpec.userBirth) || ''} disabled />

                    <p className={styles["spec-info"]}>성별</p>
                    <input className={styles["spec-check"]} type="text" placeholder="성별" value={formatGender(userSpec.userGender) || ''} disabled />

                    <p className={styles["spec-info"]}>주소</p>
                    <input className={styles["spec-check"]} type="text" placeholder="주소" value={`${userSpec.protegeAddress} ${userSpec.protegeAddressDetail}` || ''} disabled />

                    <p className={styles["spec-info"]}>신체</p>
                    <input className={styles["spec-check-hw"]} type="number" placeholder="키" value={userSpec.userHeight || ''} disabled />
                    <span className={styles.hw}>cm</span>
                    <input className={styles["spec-check-hw"]} type="number" placeholder="몸무게" value={userSpec.userWeight || ''} disabled />
                    <span className={styles.hw}>kg</span>

                    <p className={styles["spec-info"]}>질병</p>
                    <input className={`${styles["spec-check"]} ${styles.disease}`} type="text" placeholder="질병 내역이 없습니다." value={userSpec.userDisease || ''} disabled />
                    
                    <p className={styles["spec-info"]}>예약 정보</p>
                    <input className={`${styles["spec-check"]} ${styles.last}`} type="text" placeholder="예약 정보" value={formattedReservationInfo()} disabled />
                </div>

                <div className={`${styles["main-section"]} ${styles["go-password"]}`} onClick={goSetPW}>
                    <p className={`${styles["main-text"]} ${styles["go-password-text"]}`}>다음</p>
                </div>
            </div>
        </div>
    );
}

export default WelfareCheckSpec;
