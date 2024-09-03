import { call } from "login/service/ApiService";
import "matching/notice/Matching.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Matching(props) {
  const location = useLocation();
  const navi = useNavigate();
  const { matchStatus } = location.state || {};

  useEffect(() => {
    if (matchStatus === "ACCEPT") {
      navi("/nokmain");
    }
  }, [matchStatus, navi]);

  call("/api/v1/match", "GET")
    .then((response) => {
      console.log(response);
      if (response.matchStatus === "ACCEPT") {
        navi("/home");
      }
    })
    .catch((error) => {
      console.log(error.message);
      alert("매칭실패");
      navi(-1);
    });

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="match-load">
      매칭중입니다...
      <button className="refresh-button" onClick={handleRefresh}>
        새로고침
      </button>
    </div>
  );
}

export default Matching;
