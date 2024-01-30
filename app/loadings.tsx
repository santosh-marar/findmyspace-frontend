import RoomCardSkeleton from '@/components/custom/RoomCardSkeleton';

function loading() {
  return (
    <div className="container flex flex-col gap-4 md:gap-8 items-center justify-center pb-8 md:pb-8">
      {'abc'.split('').map((i) => (
        <RoomCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default loading;
