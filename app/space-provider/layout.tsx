'use client';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SpaceProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSpaceProvider = useAppSelector(
    (state: any) => state.spaceProvider?.initialSpaceProvider
  );
  // console.log(initialSpaceProvider);

  const router = useRouter();

  useEffect(() => {
    if (initialSpaceProvider) {
      // console.log(initialSpaceProvider);
      router.push('/space-provider/my-profile');
      return;
    } else {
      router.push('/');
      return;
    }
  }, [router, initialSpaceProvider]);

  return <section>{children}</section>;
}
