import React, { useState, useRef, useEffect } from 'react';
import styles from 'welfare/css/WelfareSetPW.module.css'; // CSS 모듈 import
import Header from 'header/Header.js';
import { useNavigate } from 'react-router-dom';

function WelfareSetPW() {
    const navigate = useNavigate();
    const goCheckPW = () => {
        if (password.length === 6) {
            navigate('/welfare-check-pw');
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
        inputRef.current.focus();  // 클릭 시 input에 포커스
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
                    <p className={styles.infomation}>결제 시 사용하실</p>
                    <p className={styles.infomation}>비밀번호 6자리를 설정해 주세요</p>
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
                    onClick={password.length === 6 ? goCheckPW : null}  // 6자리일 때만 클릭 가능
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

export default WelfareSetPW;
