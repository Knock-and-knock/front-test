import React, { useState, useEffect } from 'react';
import styles from 'welfare/css/WelfareReservedList.module.css';
import Modal from "react-modal";
import WelfareReserveCancelModal from 'welfare/component/WelfareReserveCancelModal';
import WelfareReservedItem from 'welfare/component/WelfareReservedItem';
import Header from 'header/BlueHeader.js';
import { call } from 'login/service/ApiService';
import info from "image/icon/info.png";

function WelfareReservedList() {
  const [isOpen, setIsOpen] = useState(false);
  const [reservedItems, setReserveItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isProtege, setIsProtege] = useState(true);

  const [protegeUserNo, setProtegeUserNo] = useState(null);
  const [userNo, setUserNo] = useState(null);


  useEffect(() => {
    const userType = localStorage.getItem("loginUser");
    if (userType === "PROTECTOR") {
      call("/api/v1/match", "GET", null)
        .then((response) => {
          console.log(response);
          const protegeNo = response.protegeUserNo;
          setUserNo(protegeNo);  // PROTECTOR일 경우 protegeUserNo를 상태로 저장
          setIsProtege(true);
          console.log(protegeNo);
        })
        .catch((error) => {
          console.log(error.message);
          setIsProtege(false);
        });
    } else if (userType === "PROTEGE") {
      const protegeUserNo = localStorage.getItem("userNo");
      setUserNo(protegeUserNo);  // PROTEGE일 경우 localStorage에서 userNo 값을 상태로 저장
      setIsProtege(false);
    } else {
      setIsProtege(false);
    }
  }, []);
  

  useEffect(() => {
    // if (userNo) {
    //   call(`/api/v1/welfare-book?userNo=${userNo}`, "GET", null)
    //     .then((response) => {
    //       setReserveItems(response);  // userNo에 해당하는 데이터만 가져옴
    //     })
    //     .catch((error) => {
    //       alert("복지목록 조회 실패");
    //     });
    // } else {
    //   call('/api/v1/welfare-book', "GET", null)
    //     .then((response) => {
    //       setReserveItems(response);
    //     })
    //     .catch((error) => {
    //       alert("복지목록 조회 실패");
    //     });
    // }
    call('/api/v1/welfare-book', "GET", null)
        .then((response) => {
          setReserveItems(response);
        })
        .catch((error) => {
          alert("복지목록 조회 실패");
        });
  }, []);
  

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const openModal = (itemId) => {
    console.log("Opening modal for item ID:", itemId);
    setSelectedItemId(itemId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItemId(null);
  };

  const handleDelete = () => {
    if (selectedItemId) {
      call(`/api/v1/welfare-book/${selectedItemId}`, "DELETE", null)
        .then(() => {
          const updatedItems = reservedItems.filter(item => item.id !== selectedItemId);
          setReserveItems(updatedItems);
          closeModal();
          window.location.reload();
        })
        .catch((error) => {
          console.error("삭제 실패:", error);
          alert("삭제 처리 중 오류가 발생했습니다.");
        });
    } else {
      alert("삭제할 항목이 선택되지 않았습니다.");
    }
  };

  const CancelStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 100
    },
    content: {
      height: "250px",
      margin: "auto",
      borderRadius: "15px",
      padding: "20px",
    },
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles["main-container"]}>
        {reservedItems.length > 0 ? (
          reservedItems.map((item, index) => (
            <WelfareReservedItem
              key={index}
              title={item.welfareName}
              welfareBookReservationDate={item.welfareBookReservationDate}
              welfareBookStartDate={item.welfareBookStartDate}
              welfareBookUseTime={item.welfareBookUseTime}
              welfareTotalPrice={item.welfareTotalPrice}
              onCancel={() => openModal(item.welfareBookNo)}
            />
          ))
        ) : (
          <div className={styles.noItemsContainer}>
            <img src={info} alt='느낌표'></img>
            <p className={styles.noItems}>예약된 서비스가 없습니다.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={CancelStyles}>
        <WelfareReserveCancelModal closeModal={closeModal} handleDelete={handleDelete} />
      </Modal>
    </div>
  );
}

export default WelfareReservedList;
