import "cardCreate/application/AddressSearchComponent.css";
import DaumPostcode from "react-daum-postcode";

function AddressSearchComponent({ onComplete, onClose }) {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          닫기
        </button>
        <DaumPostcode
          onComplete={onComplete}
          autoClose={false}
          width={"100%"}
          height={"400px"}
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}

export default AddressSearchComponent;