import { useContext, useEffect } from "react";
import { InfoContext } from "../Match";

function TitleInput({ handleIsInfoChange }) {
  const { userInfo, setUserInfo } = useContext(InfoContext);

  const handleMname = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, matchProtectorName: value });
    handleIsInfoChange(value.trim() !== "" && userInfo.matchProtegeName.trim() !== "");
  };

  const handleYname = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, matchProtegeName: value });
    handleIsInfoChange(userInfo.matchProtectorName.trim() !== "" && value.trim() !== "");
  };

  useEffect(() => {
    handleIsInfoChange(userInfo.matchProtectorName.trim() !== "" && userInfo.matchProtegeName.trim() !== "");
  }, [userInfo.matchProtectorName, userInfo.matchProtegeName, handleIsInfoChange]);

  return (
    <div className="input-container">
      <p>
        어르신께
        <input
          className="titleInput"
          value={userInfo.matchProtectorName}
          onChange={handleMname}
        />
        라고 불리고 싶어요
      </p>
      <p>
        어르신을
        <input
          className="titleInput"
          value={userInfo.matchProtegeName}
          onChange={handleYname}
        />
        라 부르고 싶어요
      </p>
    </div>
  );
}

export default TitleInput;
