import 'matching/button/button.css';

function SkipBtn({handleBackPageBtn}) {
  return (
    <button type="button" className="skipBtn" onClick={handleBackPageBtn}>이전</button>
  );
}

export default SkipBtn;