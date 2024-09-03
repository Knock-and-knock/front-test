import { useContext, useEffect } from "react";
import { InfoContext } from "../Match";

function FYIInput({ handleIsInfoChange }) {
  const { userInfo, setUserInfo } = useContext(InfoContext);

  const handleName = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, protegeName: value });
    handleIsInfoChange(value.trim() !== "" && userInfo.protegePhone.trim() !== "");
  };

  const phoneAutoHyphen = (value) => {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };

  const handlePhone = (e) => {
    let value = e.target.value;
    value = phoneAutoHyphen(value);
    setUserInfo({ ...userInfo, protegePhone: value });
    handleIsInfoChange(userInfo.protegeName.trim() !== "" && value.trim() !== "");
  };

  useEffect(() => {
    handleIsInfoChange(userInfo.protegeName.trim() !== "" && userInfo.protegePhone.trim() !== "");
  }, [userInfo.protegeName, userInfo.protegePhone, handleIsInfoChange]);

  return (
    <div className="input-container">
      <input value={userInfo.protegeName} onChange={handleName} placeholder="이름" />
      <input
        type="tel"
        value={userInfo.protegePhone}
        maxLength="13"
        onChange={handlePhone}
        placeholder="전화번호"
      />
    </div>
  );
}

export default FYIInput;
