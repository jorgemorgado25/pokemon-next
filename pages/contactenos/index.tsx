
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from './contactenos.module.css';
import Image from 'next/image';

const imagenes = [
    { id: '1', url: "https://elearningmedico.com/img/banner_principal/164330989366.jpeg", title:"Imagen 1" },
    { id: '2', url: "https://elearningmedico.com/img/banner_principal/164271276830.jpeg", title:"Imagen 2" },
    { id: '3', url: "https://elearningmedico.com/img/banner_principal/164328445567.jpg" , title:"Imagen 3" },
    { id: '4', url: "https://elearningmedico.com/img/banner_principal/163241627067.jpeg", title:"Imagen 4" } 
]
const contactenos = () => {

  const handleClickComprar = () => {
    console.log('comprar...');
  }
  
  return (
    <>
        <Swiper
            modules={[ Navigation, Pagination, Scrollbar, A11y ]}            
            slidesPerView={ 1 }
            navigation
            pagination
            scrollbar={{ draggable: true }}
        >
            { imagenes.map( ({ url, title, id }) => (
                <SwiperSlide key={ id } className={ styles.swiperSlide }>
                    <div className={ styles.divTextos }>
                      <h2>{ title }</h2>
                      <button onClick={handleClickComprar}>Comprar</button>
                    </div>
                    <Image src={ url } alt="no image" />
                </SwiperSlide>
            )) }
        </Swiper>

        <h2>BIENVENIDOS</h2>

      </>
  )
}

export default contactenos