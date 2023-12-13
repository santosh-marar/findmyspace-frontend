'use client';
import RoomsComponent from '@/components/custom/roomsCardComponent';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useGetRoomsQuery } from '@/redux/api/roomApi';
import { setInitialSpaceProvider } from '@/redux/features/spaceProviderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, ChevronDownIcon, Search } from 'lucide-react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const inter = Inter({ subsets: ['latin'] });

const schema = z.object({
  city: z.string(),
  chockName: z.string().optional(),
});

type FormValues = {
  city: string;
  chockName: string;
};

let city: string = '';
let chockName: string = '';

export default function Home() {
  const dispatch = useAppDispatch();

  const initialSpaceProvider = useAppSelector(
    (state) => state.spaceProvider.initialSpaceProvider
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageData =
        localStorage.getItem('spaceProviderInfo') || null;

      const initialSpaceProvider = localStorageData
        ? JSON.parse(localStorageData)
        : null;

      dispatch(setInitialSpaceProvider(initialSpaceProvider));

      const timeoutMilliseconds = 58 * 24 * 60 * 60 * 1000;
      setTimeout(() => {
        // Remove data from localStorage after the specified time
        localStorage.removeItem('spaceProviderInfo');
      }, timeoutMilliseconds);
    }
  }, []);

  const spaceProviderAvatar = initialSpaceProvider?.spaceProviderAvatar;
  // console.log(spaceProviderAvatar);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: '',
      chockName: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (value) => {
    (city = value.city), (chockName = value.chockName);
  };

  // console.log(city, chockName);

  const { isLoading, data, error } = useGetRoomsQuery({ city, chockName });
  const rooms = data?.room;
  const totalRooms = data?.totalRooms;
  // console.log(data?.totalRooms);

  return (
    <main className="bg-gray-100">
      <div className="mb-8">
        <nav className="container flex items-center justify-between py-1 md:py-2">
          <div className="logo">
            <p className="text-blue-700 italic font-semibold text-2xl">
              fms.live
            </p>
          </div>
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
                  src={
                    'https://img.icons8.com/ios/100/user-male-circle--v1.png'
                  }
                  width={75}
                  height={75}
                  alt="Space-provider avatar"
                />
              </Link>
            )}
          </div>
        </nav>
        <section
          className="bg-fit md:bg-contain w-full md:h-auto flex items-center justify-center py-24"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1171&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          }}
        >
          {
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative w-max">
                        <FormControl className="input-box-small">
                          <select
                            className={cn(
                              buttonVariants({ variant: 'outline' }),
                              'appearance-none bg-white font-normal'
                            )}
                            {...field}
                          >
                            <option value="" disabled hidden>
                              Select a city
                            </option>
                            <option value="lahan">Lahan</option>
                            <option value="rajbiraj">Rajbiraj</option>
                            <option value="kathmandu">Kathmandu</option>
                            <option value="biratnagar">Biratnagar</option>
                            <option value="janakpur">Janakpur</option>
                          </select>
                        </FormControl>
                        <ChevronDownIcon className="absolute right-3 top-4 h-4 w-4 opacity-50" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chockName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter chock name"
                          {...field}
                          className="input-box-small"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-blue-700 body-medium rounded-md px-4 py-2 flex gap-2 md:w-96 w-78"
                >
                  Search now <Search size={24} />
                </Button>
              </form>
            </Form>
          }
        </section>
      </div>
      <div className="container mb-2">
        {' '}
        <p>Total rooms: {totalRooms}</p>
      </div>

      <div className="container flex flex-col gap-4 md:gap-8 items-center justify-center pb-8 md:pb-8">
        {rooms?.map((room: any) => {
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
            <RoomsComponent
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

        {/* <RoomsComponent /> */}
        <div className="flex flex-col gap-1">
          <span>
            Hopes you are agree with these terms and conditions?{' '}
            <Link
              href="/TermsAndConditions"
              className="text-blue-700 underline"
            >
              terms & conditions
            </Link>{' '}
          </span>
        </div>
      </div>
    </main>
  );
}
