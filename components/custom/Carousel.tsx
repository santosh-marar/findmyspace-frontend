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
        className="mySwiper w-full h-[400px] md:h-[448px] bg-white md:object-fill"
      >
        {roomImages?.map((roomImage) => {
          return (
            <SwiperSlide key={roomImage}>
              <Image
                src={roomImage}
                fill
                alt="room image"
                style={{
                  objectFit: 'cover',
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
