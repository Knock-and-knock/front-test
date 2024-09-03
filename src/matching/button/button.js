import NextBtn from "./NextBtn";
import SkipBtn from "./SkipBtn";

function button(props) {
  return (
    <div className="match-button">
      <SkipBtn/>
      <NextBtn/>
    </div>
  );
}

export default button;