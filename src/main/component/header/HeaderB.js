import 'main/component/header/HeaderB.css';
import LogoNav from "main/component/header/LogoNav";
import ProfileB from "main/component/header/ProfileB";

function Header(props) {
  return (
    <div className="white-back">
      <div className="top-nav">
        <LogoNav />
        <ProfileB />
      </div>
    </div>
  );
}

export default Header;
