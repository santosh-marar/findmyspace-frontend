import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AvatarPropsType {
  initialSpaceProvider: any;
  spaceProviderAvatar: string;
}

function Avatar({
  initialSpaceProvider,
  spaceProviderAvatar,
}: AvatarPropsType) {
  return (
    <div>
      {initialSpaceProvider ? (
        <Link
          href="/space-provider/my-profile"
          className="flex items-center justify-center md:gap-2"
        >
          <p className="flex justify-center text-blue-700">
            Host room
            <span>
              <ArrowRight />
            </span>
          </p>
          <Image
            className="rounded-full w-12 h-12  md:h-[75px] md:w-[75px]"
            src={`${spaceProviderAvatar}`}
            width={75}
            height={75}
            alt="Space-provider avatar"
          />
        </Link>
      ) : (
        <Link
          href="/login"
          className="flex items-center justify-center md:gap-2"
        >
          <p className="flex justify-center text-blue-700">
            Host room
            <span>
              <ArrowRight />
            </span>
          </p>
          <Image
            className="rounded-full w-12 h-12  md:h-[75px] md:w-[75px]"
            src={'https://img.icons8.com/ios/100/user-male-circle--v1.png'}
            width={75}
            height={75}
            alt="Space-provider avatar"
          />
        </Link>
      )}
    </div>
  );
}

export default Avatar;
