'use client';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/api/spaceProviderAuthApi';
import { useRouter } from 'next/navigation';

const DummySpaceProviderAvatar =
  'https://img.icons8.com/ios/100/user-male-circle--v1.png';

const Profile = () => {
  const router = useRouter();

  const spaceProviderInfo: any = useAppSelector(
    (state: any) => state.spaceProvider?.initialSpaceProvider
  );

  const SpaceProviderAvatar = spaceProviderInfo?.spaceProviderAvatar;

  const [logout, { isLoading }] = useLogoutMutation();

  async function Logout() {
    localStorage.removeItem('spaceProviderInfo');
    await logout(null);
    router.push('/');
  }

  return (
    <div className="h-full">
      <Link href="/">
        <ArrowLeft className="md:mx-8 mx-2 mt-4 h-6 w-6 md:h-12 md:w-12" />
      </Link>

      <div className="container md:h-5/6 flex flex-col gap-4 md:gap-8 items-center justify-center">
        <div className="flex items-center justify-between gap-8 w-[90%]">
          <Image
            className="rounded-full md:w-52 md:h-52 h-16 w-16"
            src={`${
              SpaceProviderAvatar === undefined
                ? DummySpaceProviderAvatar
                : SpaceProviderAvatar
            }`}
            width="200"
            height="200"
            // sizes='()'
            alt="profile image"
            style={{ objectFit: 'contain' }}
            quality={100}
          />
          <div>
            <p className="body-font md:body-medium">Hello,</p>
            <h4 className="md:h1 h4 text-blue-700">
              {spaceProviderInfo?.fullName}
            </h4>
            <p className="md:lead">{spaceProviderInfo?.email}</p>
            <p className="md:lead">{spaceProviderInfo?.phone}</p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 md:gap-4 w-11/12">
          <p className="p-ui-medium">My room</p>
          <div className="flex items-center justify-between w-11/12">
            <div className="bg-white rounded-lg flex items-center justify-center flex-col">
              <Image
                src="/view-room.svg"
                width={120}
                height={120}
                alt="bed Icon"
                className="md:h-32 md:w-32 h-16 w-16 mx-4"
              />
              <Link href="/space-provider/rooms">
                <Button variant="link">View room</Button>
              </Link>
            </div>
            <div className="bg-white rounded-lg flex items-center justify-center flex-col">
              <Image
                src="/add-room.svg"
                width={120}
                height={120}
                alt="bed Icon"
                className="md:h-32 md:w-32 h-16 w-16 mx-4"
              />
              <Link href="/space-provider/host-room">
                <Button variant="link">Add room</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex  flex-col items-start justify-between w-11/12">
          <p className="p-ui-medium">Address</p>
          <div className="flex gap-2 flex-wrap">
            <p className="p-ui">{spaceProviderInfo?.address?.district}</p>
            <p className="p-ui">{spaceProviderInfo?.address?.city}</p>
            <p className="p-ui">{spaceProviderInfo?.address?.chockName}</p>
            <p className="p-ui">{spaceProviderInfo?.address?.streetName}</p>
          </div>
          <Button
            variant="destructive"
            className="mt-4 flex gap-1"
            onClick={() => Logout()}
          >
            Logout <LogOut size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
