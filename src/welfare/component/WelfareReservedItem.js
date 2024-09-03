import React from 'react';
import styles from 'welfare/css/WelfareReservedList.module.css';

function WelfareReservedItem({ title, welfareBookReservationDate, welfareBookStartDate, welfareBookUseTime, welfareTotalPrice, onCancel }) {
  
  function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0 // 소수점 아래 자리수를 0으로 설정하여 정수로 표시
    }).format(price);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' 로케일은 yyyy-mm-dd 형식을 반환합니다.
  }

  function displayTime(duration) {
    switch(duration) {
      case 1:
        return '3시간 (09:00 ~ 12:00)';
      case 2:
        return '6시간 (09:00 ~ 15:00)';
      case 3:
        return '9시간 (09:00 ~ 18:00)';
      case 4:
        return '1개월';
      case 5:
        return '2개월';
      case 6:
        return '3개월';
      case 7:
        return '4개월';
      case 8:
        return '5개월';
      case 9:
        return '6개월';
      default:
        return '시간 정보 없음';
    }
  }

  const formattedwelfareBookReservationDate = formatDate(welfareBookReservationDate);
  
  return (
      <div className={`${styles["main-section"]} ${styles["detailed-reserve"]}`}>
        <p className={`${styles["main-text"]} ${styles["detailed-reserved-title"]}`}>{title}</p>
        <div className={styles["detailed-reserved-cancel-container"]}>
          <span className={`${styles["main-text"]} ${styles["detailed-reserved-date"]}`}>결제일: {formattedwelfareBookReservationDate}</span>
        </div>
        <span className={`${styles["main-text"]} ${styles["detailed-reserved-cancel"]}`} onClick={onCancel}>예약취소</span>
        <hr />
        <div className={styles["detailed-reserved-info-container1"]}>
          <span className={`${styles["main-text"]} ${styles["main-info"]}`}>예약 날짜</span>
          <span className={styles["detailed-reserved-text"]}>{welfareBookStartDate}</span>
        </div>
        <br />
        <div className={styles["detailed-reserved-info-container2"]}>
          <span className={`${styles["main-text"]} ${styles["main-info"]}`}>예약 시간</span>
          <span className={styles["detailed-reserved-text"]}>{displayTime(welfareBookUseTime)}</span>
        </div>
        <hr />
        <div className={styles["detailed-reserved-info-container3"]}>
          <span className={styles["total-price-text"]}>최종결제금액</span>
          <span className={styles["total-price-number"]}>{formatPrice(welfareTotalPrice)} 원</span>
        </div>
      </div>
  );
}

export default WelfareReservedItem;
