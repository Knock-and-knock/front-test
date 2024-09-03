import "matching/button/button.css";

function SubmitBtn({ handleSubmitBtn, isDisabled }) {
  return (
    <button
      type="button"
      className="submitBtn"
      onClick={handleSubmitBtn}
      disabled={isDisabled}
      style={{
        backgroundColor: !isDisabled ? "#80BAFF" : "rgba(128,186,255,0.5)",
      }}
    >
      매칭알림 보내기
    </button>
  );
}

export default SubmitBtn;
