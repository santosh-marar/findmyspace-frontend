import { Skeleton } from '../ui/skeleton';

function RoomCardSkeleton() {
  return (
    <div className="container flex flex-col gap-4 md:gap-8 items-center justify-center pb-8 md:pb-8">
      <section className="bg-white rounded-md flex flex-col items-center 2xl:w-[1280px] xl:w-[1024px] lg:w-[768px] w-[90%]">
        <section className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-16 w-full pb-4 md:pb-0 md:pr-4">
          <Skeleton className='bg-gray-200  md:h-[296px] md:w-[478] h-40 w-full' />

          <div className="room-detail w-72 md:w-96  flex flex-col gap-4">
            <span className="flex items-center font-bold gap-1">
              <span className="flex items-center gap-1">
                <h3 className="h3">
                  {' '}
                  <Skeleton className="bg-gray-200 w-40 h-6"/>{' '}
                </h3>
              </span>
            </span>
            <div className="flex justify-between flex-col gap-4">
              <div className='flex flex-col gap-2'>
                <div className="flex justify-between">
                  <p>
                    {' '}
                    <Skeleton className="bg-gray-200 w-28 h-6"/>{' '}
                  </p>
                  <p>
                    {' '}
                    <Skeleton className="bg-gray-200 w-28 h-6"/>{' '}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>
                    {' '}
                    <Skeleton className="bg-gray-200 w-28 h-6"/>{' '}
                  </p>
                  <p>
                    {' '}
                    <Skeleton className="bg-gray-200 w-28 h-6" />{' '}
                  </p>
                </div>
                <p className="body-font">
                  <Skeleton className="bg-gray-200 h-12" />
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="bg-blue-200 rounded-[6px] px-16 py-5 " />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default RoomCardSkeleton;
