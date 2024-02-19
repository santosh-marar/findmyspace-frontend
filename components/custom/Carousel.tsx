'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  roomImages: string[];
}

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function Carousel({ roomImages }: CarouselProps) {
  // console.log(roomImages);
  return (
    <>
      <Swiper
        autoplay={{ delay: 300 }}
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper w-full md:h-96 bg-white md:object-fill"
      >
        {roomImages?.map((roomImage) => {
          return (
            <SwiperSlide key={roomImage}>
              <Image
                className="w-full object-contain"
                src={roomImage}
                width={150}
                height={200}
                alt="room image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
