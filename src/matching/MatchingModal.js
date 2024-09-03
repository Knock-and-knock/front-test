import "matching/MatchingModal.css";
import Modal from "react-modal";

function MatchingModal({ isOpen, closeModal,handleSubmit}) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 100
    },
    content: {
      position: "fixed",
      top: "40%",
      bottom: "0",
      left: "0",
      right: "0",
      height: "auto",
      width: "100%",
      borderRadius: "15px 15px 0 0",
      padding: "25px 25px 0px 25px",
      boxSizing: "border-box",
    },
  };

  

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <p className="matchModal-title">매칭하기</p>
        <div className="matchModal-content matchModal-line">
          <p>
            <span className="blueText">홍길동보호자님</span>과 연결하시겠습니까?
          </p>
        </div>
        <div className="modalContainer">
          <button className="matchModalAgreeBtn" onClick={handleSubmit}>
            수락
          </button>
          <button className="matchModalBtn" onClick={closeModal}>
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default MatchingModal;
