import "cardCreate/application/CardApplication.css";
import check from 'image/icon/check.svg';
import { Link } from 'react-router-dom';

function CardAppSuccess(props) {

    return (
        <div>
            <div className='success-container'>
                <div className="icon-success">
                    <div className='success-circle'/>
                    <img src={check} alt="카드발급 성공" className="chkImg"/>
                </div>
                <p className='cardapp-success'>카드발급 완료</p>
            </div>
            <div className='mainBtn'>
                <Link to="/home" className='goMainBtn'>메인으로 돌아가기</Link>
            </div>
        </div>
    );
}

export default CardAppSuccess;