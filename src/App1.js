import Agreement from "cardCreate/application/Agreement";
import CardApp from "cardCreate/application/CardApp";
import CreditInfo from "cardCreate/application/CreditInfo";
import DefaultInfo from "cardCreate/application/DefaultInfo";
import ExtraInfo from "cardCreate/application/ExtraInfo";
import FundSourceInfo from "cardCreate/application/FundSourceInfo";
import CardCreate from "cardCreate/CardCreate";
import VoiceChat from "chat/VoiceChat";
import MainA from "main/MainA";
import MainB from "main/MainB";
import Match from "matching/Match";
import Matching from "matching/notice/Matching";
import { Route, Routes } from "react-router-dom";


import AddAddress from "cardCreate/application/AddAddress";
import CardAppSuccess from "cardCreate/application/CardAppSuccess";
import FamilyAddAddress from "cardCreate/application/FamilyAddAddress";
import FamilyCardYN from "cardCreate/application/FamilyCardYN";
import FamilyDefaultInfo from "cardCreate/application/FamilyDefaultInfo";
import FamilyExtraInfo from "cardCreate/application/FamilyExtraInfo";
import FamilySimplePW from "cardCreate/application/FamilySimplePW";
import SimplePW from "cardCreate/application/SimplePW";
import OnboardingPage from "onboarding/OnboardingPage";
import PrivateRoute from "PrivateRoute";
import { createContext } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
export const CommonContext = createContext();

function App(props) {
  return (
      <Routes>
        <Route path="/" element={<OnboardingPage />} /> v
        {/* 첫화면 메인화면으로 가기!! */}

      
        <Route path="/main" element={<PrivateRoute><MainA /></PrivateRoute>} />
        <Route path="/nokmain" element={<PrivateRoute><MainB /></PrivateRoute>} />
        <Route path="/match" element={<PrivateRoute><Match /></PrivateRoute>} />
        <Route path="/matching" element={<PrivateRoute><Matching /></PrivateRoute>} />
        <Route path="/voicechat" element={<PrivateRoute><VoiceChat /></PrivateRoute>} />
        <Route path="/cardcreate" element={<PrivateRoute><CardCreate /></PrivateRoute>} />
        <Route path="/main" element={<PrivateRoute><MainA /></PrivateRoute>} />
        <Route path="/nokmain" element={<PrivateRoute><MainB /></PrivateRoute>} />
        <Route path="/match" element={<PrivateRoute><Match /></PrivateRoute>} />
        <Route path="/matching" element={<PrivateRoute><Matching /></PrivateRoute>} />
        <Route path="/voicechat" element={<PrivateRoute><VoiceChat /></PrivateRoute>} />

        <Route path="/cardcreate" element={<PrivateRoute><CardCreate /></PrivateRoute>} />

        
        <Route path="/cardapp/*" element={<PrivateRoute><CardApp/> </PrivateRoute>}>
          <Route path="defaultinfo" element={<PrivateRoute><DefaultInfo /></PrivateRoute>} />
          <Route path="extrainfo" element={<PrivateRoute><ExtraInfo /></PrivateRoute>} />
          <Route path="agreement" element={<PrivateRoute><Agreement /></PrivateRoute>} />
          <Route path="creditinfo" element={<PrivateRoute><CreditInfo /></PrivateRoute>} />
          <Route path="fundsourceinfo" element={<PrivateRoute><FundSourceInfo /></PrivateRoute>} />
          <Route path="address" element={<PrivateRoute><AddAddress /></PrivateRoute>} />
          <Route path="simplepw" element={<PrivateRoute><SimplePW /></PrivateRoute>} />
          <Route path="familycardyn" element={<PrivateRoute><FamilyCardYN /></PrivateRoute>} />
          <Route path="fdefaultinfo" element={<PrivateRoute><FamilyDefaultInfo /></PrivateRoute>} />
          <Route path="fextrainfo" element={<PrivateRoute><FamilyExtraInfo /></PrivateRoute>} />
          <Route path="faddress" element={<PrivateRoute><FamilyAddAddress /></PrivateRoute>} />
          <Route path="fsimplepw" element={<PrivateRoute><FamilySimplePW /></PrivateRoute>} />
          <Route path="cardsuccess" element={<PrivateRoute><CardAppSuccess /></PrivateRoute>} />
        </Route>
      </Routes>
    
    );

}

export default App;
