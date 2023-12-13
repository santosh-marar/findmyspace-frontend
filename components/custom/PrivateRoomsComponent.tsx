import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { RoomsComponentTypes } from '@/types/types';
import { useDeleteMyRoomMutation } from '@/redux/api/spaceProviderApi';

function PrivateRoomsComponent({
  id,
  roomImages,
  price,
  district,
  city,
  chockName,
  genderPreference,
  nearPopularPlaceName,
  descriptionOfRoom,
  rules,
}: RoomsComponentTypes) {
  const [deleteMyRoom, { isError, isLoading, isSuccess }] =
    useDeleteMyRoomMutation();

  const roomImage = roomImages[0];
  // console.log(roomImage);

  return (
    <section className="bg-white rounded-md flex flex-col items-center min-w-fit">
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-16 w-full pb-4 md:pb-0 md:pr-4">
        <Image
          className="md:rounded-l-lg rounded-t-lg md:rounded-tr-none md:h-[296px] md:w-[478] h-40 w-78"
          src={roomImage}
          width={478}
          height={296}
          alt="room-image"
        />
        <div className="room-detail w-72 md:w-96  flex flex-col gap-4 px-4">
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
                {/* <p>Hospital chock</p> */}
              </div>
              <div className="flex justify-between">
                <p>{genderPreference}</p>
                {/* <p>boysOnly</p> */}
                <p>{nearPopularPlaceName}</p>
                {/* <p>Near Narsing Home</p> */}
              </div>
              <p className="body-font">
                {/* A semi-furnished room offering a cozy ambiance and serene
                surroundings. Thoughtfully designed for comfort, it exudes a
                warm atmosphere, perfect for relaxation and peaceful living. */}
                {descriptionOfRoom}
              </p>
            </div>

            <div className="flex items-center justify-between">
              {/* <Link href={`/space-provider/room/${id}`}> */}
              <Button
                variant="destructive"
                className="rounded-[6px] px-4 py-2 w-fit"
                onClick={() => deleteMyRoom(id)}
                // console.log(id)
              >
                Delete
              </Button>
              {/* </Link> */}

              <Link href={`/space-provider/room/${id}`}>
                <Button className="bg-blue-700 rounded-[6px] px-4 py-2 w-fit">
                  View more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default PrivateRoomsComponent;
