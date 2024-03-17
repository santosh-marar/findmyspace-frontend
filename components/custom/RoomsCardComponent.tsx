import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { RoomsComponentTypes } from '@/types/types';

function RoomsComponent({
  id,
  roomImages,
  price,
  city,
  chockName,
  genderPreference,
  nearPopularPlaceName,
  descriptionOfRoom,
  rules,
}: RoomsComponentTypes) {
  // console.log(id);
  const roomImage = roomImages[0];
  // console.log(roomImage);

  return (
    <section className="bg-white rounded-md flex flex-col items-center w-[96%]">
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-16 w-full pb-4 md:pb-0 md:pr-4">
        <div className="relative md:h-[296px] md:w-full h-[300px] w-[100%]">
          <Image
            className="md:rounded-l-lg rounded-t-lg md:rounded-tr-none"
            src={roomImage}
            alt="room image"
            quality={100}
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>

        <div className="room-detail w-72 md:w-96  flex flex-col gap-4">
          <span className="flex items-center font-bold gap-1">
            रु॰
            <span className="flex items-center gap-1">
              <h3 className="h3">{price}</h3>
              <p>per/month</p>
            </span>
          </span>
          <div className="flex justify-between flex-col gap-4">
            <div>
              <div className="flex justify-between">
                <p>{city}</p>
                <p>{chockName}</p>
              </div>
              <div className="flex justify-between">
                <p>{genderPreference}</p>
                <p>{nearPopularPlaceName}</p>
              </div>
              <p className="body-font">{descriptionOfRoom}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href={`/room/${id}`}>
              <Button className="bg-blue-700 rounded-[6px] px-4 py-2 w-fit">
                View more
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

export default RoomsComponent;
