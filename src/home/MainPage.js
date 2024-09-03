import Button from "home/component/Button";
import Header from "home/component/Header";
import WelfareSlide from "home/component/WelfareSlide";
import "home/MainPage.css";
import { call } from "login/service/ApiService";
import MatchingModal from "matching/MatchingModal";
import { useEffect, useState } from "react";
import CardSlide from "./component/CardSlide";

function MainPage() {
  const [isProtege, setIsProtege] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [matchData, setMatchData] = useState({});
  const [isMatch, setIsMatch] = useState("REJECT");

  const closeModal = async () => {
    try {
      const response = await call("/api/v1/match", "PUT", {
        ...matchData,
        matchStatus: "REJECT",
      });
      console.log(response);
      setIsMatch("REJECT");
    } catch (error) {
      console.log(error.message);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const userType = localStorage.getItem("loginUser");
    
    if (userType === "PROTEGE") {
      call("/api/v1/match", "GET", null)
        .then((response) => {
          console.log(response);
          const data = {
            matchNo: response.matchNo,
            matchStatus: response.matchStatus,
          };
          setMatchData(data);

          // matchStatus가 "WAIT"이 아니면 모달을 열지 않음
          if (data.matchStatus === "WAIT") {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }else{
      setIsProtege(false);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await call("/api/v1/match", "PUT", {
        ...matchData,
        matchStatus: "ACCEPT",
      });
      console.log(response);
      setIsMatch("ACCEPT");
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main-container">
      <Header isProtege={isProtege} />
      <WelfareSlide />
      <Button isProtege={isProtege} />
      <CardSlide isProtege={isProtege} />
      {isOpen && (
        <MatchingModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default MainPage;
