import {
  availabilityFunc,
  endRecord,
  handleAutoSub,
  handleChatRoom,
  startAutoRecord,
} from "chat/chatScript";
import "chat/VoiceChat.css";
import VoiceHeader from "chat/VoiceHeader";
import chatbot from "image/chat-char.png";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Loading from "./Loading";
import SpeakLoading from "./SpeakLoading";
import VoiceChatMovePageModal from "./VoiceChatMovePageModal";

function VoiceChat(props) {
  const [userInfo, setUserInfo] = useState("");
  // const [recognition, setRecognition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // const [roomNo, setRoomNo] = useState(null);
  const [chatResponse, setChatResponse] = useState("");
  const [visible, setVisible] = useState(false);
  const [isStart, setIsStart] = useState(false);
  //예약확인 모달
  const [isOpen, setIsOpen] = useState(false);
  const [serviceUrl, setServiceUrl] = useState("");

  useEffect(() => {
    async function initializeChat() {
      // await handleChatRoom(userInfo);
      // handleAutoSub(
      //   "Greeting",
      //   setChatResponse,
      //   setIsLoading,
      //   setIsSpeaking,
      //   setIsOpen,
      //   setServiceUrl
      // );
      await handleChatRoom(userInfo);
      availabilityFunc(sendMessage);
    }

    initializeChat();
  }, [userInfo]);


  function sendMessage(recognizedText) {
    setChatResponse("");
    setIsLoading(true);
    handleAutoSub(
      recognizedText,
      setChatResponse,
      setIsLoading,
      setIsSpeaking,
      setIsOpen,
      setServiceUrl 
    );
  }
  

  const handleStartChat = () => {
    if (!isStart) {
      startAutoRecord();
      setIsStart(true);
    } else {
      endRecord();
      setIsStart(false);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 100,
    },
    content: {
      backgroundColor: null,
      border: null,
    },
  };

  const toggleModal = () => {
    setVisible(!visible);
  };

  const closeModal =()=>{
    setIsOpen(false);
  }

  const handleSubmit = () => {
    if (serviceUrl) {
      window.location.href = serviceUrl;
    }
    console.log("이동 처리");
    closeModal();
    endRecord();
  };

  return (
    <div className="voicechat-section">
      <VoiceHeader />
      {isSpeaking && <SpeakLoading />}
      {isLoading && <Loading />}
      <img src={chatbot} alt="챗봇" className="chatbot" />
      <button className="hiddenBtn" onClick={toggleModal}>
        {visible ? "닫기" : "답변보이기"}
      </button>
      <button className="chat-startBtn" onClick={handleStartChat}>
        {isStart ? "중지" : "똑똑!"}
      </button>

      {/* Modal 컴포넌트 */}
      <Modal isOpen={visible} onRequestClose={toggleModal} style={customStyles}>
        <textarea className="textbox" value={chatResponse} readOnly />
      </Modal>
       {isOpen && (
        <VoiceChatMovePageModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default VoiceChat;
