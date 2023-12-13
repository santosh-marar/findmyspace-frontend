'use client';
import PrivateRoomsComponent from '@/components/custom/PrivateRoomsComponent';
import { useMyRoomsQuery } from '@/redux/api/spaceProviderApi';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Rooms = () => {
  const { isLoading, data } = useMyRoomsQuery(null);
  // console.log(data);
  const rooms = data?.rooms;
  // console.log(rooms)

  return (
    <div className="h-full">
      <Link href="/space-provider/my-profile">
        <ArrowLeft className="md:mx-8 mx-2 mt-4 h-6 w-6 md:h-12 md:w-12" />
      </Link>

      <div className="container flex flex-col gap-4 md:gap-8 items-center justify-center pb-4 md:pb-8">
        <h1 className="md:h1 h4 text-blue-700">My rooms </h1>

        <p className="">Total Rooms: {data?.totalRooms}</p>

        {/* <RoomsComponent /> props: image,price,district,chockName,genderPrefence, nearPopularPlace,description, */}

        <div className="container flex flex-col gap-4 md:gap-8 items-center justify-center pb-8 md:pb-8">
          {rooms?.map((room: any) => {
            // console.log('Room:', room); // Log the entire room object
            const {
              _id,
              roomImages,
              price,
              district,
              city,
              chockName,
              genderPreference,
              nearPopularPlaceName,
              descriptionOfRoom,
              rules,
            } = room;
            return (
              <PrivateRoomsComponent
                key={_id}
                id={_id}
                roomImages={roomImages}
                price={price}
                district={district}
                city={city}
                chockName={chockName}
                genderPreference={genderPreference}
                nearPopularPlaceName={nearPopularPlaceName}
                descriptionOfRoom={descriptionOfRoom}
                rules={rules}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
