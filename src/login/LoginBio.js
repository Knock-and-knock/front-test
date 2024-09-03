import React, { useState, useEffect } from 'react';
import fingerprint from 'image/icon/fingerprint.svg';
import LoginBtn from './component/button/LoginBtn';
import LoginHeader from './component/header/LoginHeader';
import { call } from './service/ApiService';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

function LoginBio(props) {
    const userNo = localStorage.getItem("userNo");
    const userBioPassword = localStorage.getItem("userBioPassword");
    const navigate = useNavigate(); // useNavigate 훅으로 navigate 함수 초기화

    const [check, setCheck] = useState(false);  // 인증 결과를 저장하는 상태 변수
    const [isBioChecked, setIsBioChecked] = useState(false);


    useEffect(() => {
        console.log('인증 상태:', check);
    }, [check]);

    useEffect(() => {
        console.log('지문 인증 상태:', isBioChecked);
    }, [isBioChecked, ]);

    const handleBiometricAuth = async () => {
        if (!navigator.credentials) {
            console.error('This browser does not support the Web Authentication API');
            return;
        }
    
        try {
            const publicKey = {
                challenge: window.crypto.getRandomValues(new Uint8Array(32)),
                rp: {
                    name: "Example Corp"
                },
                user: {
                    id: new Uint8Array(16),
                    name: "user@example.com",
                    displayName: "User Name"
                },
                pubKeyCredParams: [
                    {
                        type: "public-key",
                        alg: -7 // ECDSA with SHA-256, 지문 인식용으로 구체적 알고리즘 지정이 필요하면 여기를 수정
                    }
                ],
                authenticatorSelection: {
                    authenticatorAttachment: "platform", // 플랫폼 인증기(디바이스) 제한
                    userVerification: "required" // 사용자 확인을 필수로 요구
                },
                timeout: 60000,
                attestation: "direct"
            };
            const credential = await navigator.credentials.create({ publicKey });
            console.log('지문 인증 성공:', credential);
            
            // 사용자 정보 및 세션 관리 코드
            const userNo = localStorage.getItem("userNo");
            const userBioPassword = localStorage.getItem("userBioPassword");
    
            console.log("userNo: " + userNo);
            console.log("userBioPassword: " + userBioPassword);
    
            call("/api/v1/auth/login/bio", "POST", { userNo: userNo, userBioPassword: userBioPassword }).then((response)=>{
                localStorage.setItem("ACCESS_TOKEN", response.accessToken);
            }).catch(
                (error)=>{
                console.log("못 받았어요" + error);
            });

            setCheck(true);
            setIsBioChecked(true);
            navigate('/home');
            
        } catch (error) {
            console.error('Biometric authentication failed:', error);
            console.log("못 보냈어요" + error);
            setCheck(false);
            setIsBioChecked(false);
            return false;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userNo = localStorage.getItem("userNo");
        const userBioPassword = localStorage.getItem("userBioPassword");
        call("/api/v1/auth/login/bio", "POST", { userNo: userNo, userBioPassword: userBioPassword }).then((response)=>{
            const accessToken = localStorage.setItem("ACCESS_TOKEN", response.accessToken);
            console.log(userNo, userBioPassword, accessToken);
          }).catch(
            (error)=>{
            console.log("못 받았어요" + error);
         });

      };

    return (
        <div>
            <LoginHeader/>
            <form noValidate onSubmit={handleSubmit}>
            <div className="login-container">
                <div className='icon-bio'>
                    <div className='circle'/>
                    <img 
                        src={fingerprint} 
                        alt="지문 인증 로그인" 
                        className="fingerprint" 
                        onClick={handleBiometricAuth}
                    />
                </div>
                
            </div>
            <LoginBtn/>
            </form>
        </div>
    );
}

export default LoginBio;
