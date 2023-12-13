'use client';
import Carousel from '@/components/custom/Carousel';
import FacilityCard from '@/components/custom/FacilityCard';
import { useGetRoomByIdQuery } from '@/redux/api/roomApi';
import { IconDoor, IconHanger, IconRuler3 } from '@tabler/icons-react';
import {
  ArrowLeft,
  Bed,
  BedSingle,
  CheckCircle2,
  CrosshairIcon,
  DoorOpen,
  Fan,
  Phone,
  Table2Icon,
  XCircle,
  XCircleIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// chockName
// city
// country
// createdAt
// descriptionOfRoom
// district
// facility
// genderPreference
// nearPopularPlaceName
// numOfReviews
// phone
// price
// ratings
// reviews
// roomImages
// rulesOfLiving
// spaceProviderIsLiving

export default function Room() {
  const params = useParams();
  const id = params.room[1];
  // console.log(id);

  const { isLoading, data, error } = useGetRoomByIdQuery(id);
  const room = data?.singleRoom;
  // console.log(room)
  const facility = room?.facility;
  // console.log(facility?.bed)
  const roomImages = room?.roomImages;

  return (
    <div className="h-full">
      <Link href="/">
        <ArrowLeft className="md:mx-8 mx-2 mt-4 h-6 w-6 md:h-12 md:w-12" />
      </Link>

      <div className="container flex flex-col gap-4 md:gap-8 items-center justify-center mb-2">
        <div className="">
          <h4 className="md:h2 h4 text-blue-700">
            {/* A semi-furnished room offering a cozy ambiance and serene
            surroundings.{' '} */}
            {room?.descriptionOfRoom}
          </h4>
          <p className="subtle-medium text-gray-700">
            {/* Near eye hospital, Hospital chock, Lahan */}
            {`${room?.nearPopularPlaceName}, ${room?.chockName}, ${room?.city}`}
          </p>
        </div>
      </div>
      <Carousel roomImages={roomImages} />
      <div className="container mt-2 md:mt-4">
        <div className="flex flex-col">
          <span className="subtle flex text-gray-700 gap-1 items-end">
            <span className="md:h3 text-gray-950">
              <div className="flex items-center gap-1 font-bold">
                रु॰ {room?.price}
                {/* रु॰ 500 */}
              </div>
            </span>
            per/month
          </span>
          {/* <p className="subtle text-gray-700">Boys Only</p> */}
          <p className="subtle text-gray-700">{room?.genderPreference}</p>
        </div>
      </div>
      <section className="md:my-4 my-2">
        <div className="container flex items-center gap-2 mb-2">
          <Bed />
          <p className="p-ui-medium text-gray-950">Facility</p>
        </div>
        <div className="w-full flex flex-col bg-white py-4">
          <div className="container flex gap-2 md:gap-8 flex-wrap ">
            <FacilityCard>
              <BedSingle className="w-6 h-6 md:w-12 md:h-12" />
              <p className="subtle text-gray-700">Bed</p>
              {facility?.bed ? (
                <CheckCircle2 className="text-green-700 w-4 md:w-6 " />
              ) : (
                <XCircleIcon className="text-red-700 w-4 md:w-6" />
              )}{' '}
            </FacilityCard>

            <div className="flex flex-col items-center justify-center gap-1 bg-white w-fit p-2 md:p-4 rounded-md shadow-2xl">
              <Table2Icon className="w-6 h-6 md:w-12 md:h-12" />
              <p className="subtle text-gray-700">Table</p>
              {facility?.table ? (
                <CheckCircle2 className="text-green-700 w-4 md:w-6 " />
              ) : (
                <XCircleIcon className="text-red-700 w-4 md:w-6" />
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-1 bg-white w-fit p-2 md:p-4 rounded-md shadow-2xl">
              <CrosshairIcon className="w-6 h-6 md:w-12 md:h-12" />
              <p className="subtle text-gray-700">Chair</p>
              {facility?.chair ? (
                <CheckCircle2 className="text-green-700 w-4 md:w-6 " />
              ) : (
                <XCircleIcon className="text-red-700 w-4 md:w-6" />
              )}{' '}
            </div>

            <div className="flex flex-col items-center justify-center gap-1 bg-white w-fit p-2 md:p-4 rounded-md shadow-2xl">
              <Fan className="w-6 h-6 md:w-12 md:h-12" />
              <p className="subtle text-gray-700">Fan</p>
              {facility?.fan ? (
                <CheckCircle2 className="text-green-700 w-4 md:w-6 " />
              ) : (
                <XCircleIcon className="text-red-700 w-4 md:w-6" />
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-1 bg-white w-fit p-2 md:p-4 rounded-md shadow-2xl">
              <IconHanger className="w-6 h-6 md:w-12 md:h-12" />
              <p className="subtle text-gray-700">Hanger</p>
              {facility?.clothesHanger ? (
                <CheckCircle2 className="text-green-700 w-4 md:w-6 " />
              ) : (
                <XCircleIcon className="text-red-700 w-4 md:w-6" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="md:my-4 my-2">
        <div className="container flex items-center gap-2 mb-2">
          <IconDoor />
          <p className="p-ui-medium text-gray-950">Description</p>
        </div>
        <div className="w-full flex flex-col bg-white py-4">
          <p className="container body text-gray-700">
            {/* A semi-furnished room offering a cozy ambiance and serene
            surroundings. Thoughtfully designed for comfort, it exudes a warm
            atmosphere, perfect for relaxation and peaceful living. */}
            {room?.descriptionOfRoom}
          </p>
        </div>
      </section>

      <section className="md:my-4 my-2">
        <div className="container flex items-center gap-2 mb-2">
          <IconRuler3 />
          <p className="p-ui-medium text-gray-950">Rules of living</p>
        </div>
        <div className="w-full flex flex-col bg-white py-4">
          <p className="container body text-gray-700">
            {/* 1. **Keep it Clean:** Regularly tidy up the room to maintain
            cleanliness. 2. **Respect Privacy:** Knock before entering others
            rooms. */}
            {room?.rulesOfLiving}
          </p>
        </div>
      </section>
      <section className="container flex items-center gap-2 mb-2">
        <DoorOpen />
        <div className="flex gap-8">
          <p className="p-ui-medium text-gray-950">
            Is space-provider is living
          </p>
          {room?.spaceProviderIsLiving ? (
            <CheckCircle2 className="text-green-700 w-6 " />
          ) : (
            <XCircle className="text-red-700 w-4 md:w-6" />
          )}
        </div>
      </section>
      <section className="container flex items-center gap-2 mb-2 pb-4">
        <Phone />
        <div className="flex gap-2">
          <p className="p-ui-medium text-gray-950">Phone number:</p>
          <p className="body text-gray-700">{room?.phone[0]}</p>,
          <p className="body text-gray-700">{room?.phone[1]}</p>
        </div>
      </section>
    </div>
  );
}
