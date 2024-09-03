import CardBottom from 'home/component/CardBottom';
import CardSection from 'home/component/CardSection';
import "home/component/CardSlide.css";
import { call } from 'login/service/ApiService';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';
import NCardBottom from './NCardBottom';
import NCardSection from './NCardSection';

function CardSlide({isProtege}) {
    const userNo = localStorage.getItem("userNo");
    const [cardList, setCardList] = useState([]);
    const [isCard, setIsCard] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(()=>{
        call(`/api/v1/card`,"GET",null).then((response)=>{
            if(response.length === 0 || response[0].cardId === null){
                setIsCard(false);
            }else{      
                setCardList(response);
            }
            
        }).catch((error)=>{
            alert("카드조회 실패");
            
    });
    },[userNo,isCard]);

    const handleSlideChange = (swiper) => {
        setCurrentSlide(swiper.activeIndex);
    };

    return (
        <div className="cardSwiper-container">
                {isCard?(
                    <>
                        <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[Navigation, EffectCards]}
                        className="mySwiper"
                        navigation={{
                            prevEl: '.preBtn',
                            nextEl: '.nextBtn',
                        }}
                        slidesPerView={1}
                        onSlideChange={handleSlideChange}
                    >
                        {cardList.map((card) => (
                        
                            <SwiperSlide key={card.cardId}>
                                <CardSection isProtege={isProtege} cardlist={card}/>
                                <CardBottom isProtege={isProtege} cardlist={card}/>
    
                            </SwiperSlide>
                            
                        
                        ))}
                        <SwiperSlide key="empty-slide">
                            <NCardSection isCard={isCard}/>
                            <NCardBottom isProtege={isProtege} isAddition={true}/>
                        </SwiperSlide>
                    </Swiper>
                    <i className={`preBtn ${currentSlide === 0 ? 'hidden' : ''}`} />
                    <i className={`nextBtn ${currentSlide === cardList.length ? 'hidden' : ''}`} />
                    </>
                    ):(
                    <div>
                        <NCardSection isCard={isCard}/>
                        <NCardBottom isProtege={isProtege} isAddition={false}/>
                    </div>
                )}
            

            
        </div>
    );
}

export default CardSlide;