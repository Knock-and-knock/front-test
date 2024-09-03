import "home/component/WelfareSlide.css";
import slide01 from "image/slide01.png";
import slide02 from "image/slide02.png";
import slide03 from "image/slide03.png";
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function WelfareSlide(props) {
  const navi = useNavigate();
  const handleGoWelfare = ()=>{
    navi('/welfare-main');
  };
    return (
    <div onClick ={handleGoWelfare} >
    <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className='slide-container'>
        
            <SwiperSlide><img src={slide01} alt="복지슬라이드01" className="slide" /></SwiperSlide>
            <SwiperSlide><img src={slide02} alt="복지슬라이드02" className="slide" /></SwiperSlide>
            <SwiperSlide><img src={slide03} alt="복지슬라이드03" className="slide" /></SwiperSlide>
     </Swiper>
     </div>
    );
}

export default WelfareSlide;