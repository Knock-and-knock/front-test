import "matching/button/button.css";

function NextBtn({ handleNextBtn, isDisabled }) {
  return (
    <button
      type="button"
      className="match-nextBtn"
      onClick={handleNextBtn}
      disabled={isDisabled}
      style={{
        backgroundColor: !isDisabled ? "#80BAFF" : "rgba(128,186,255,0.5)",
      }}
    >
      다음
    </button>
  );
}

export default NextBtn;
