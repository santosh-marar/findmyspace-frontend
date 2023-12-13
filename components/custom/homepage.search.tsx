'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  city: z.string(),
  chockName: z.string(),
});

type FormValues = {
  city: string;
  chockName: string;
};

const MyComponent: React.FC = () => {
  // const { isLoading, data, error } = useGetRoomsQuery(null);
  // console.log(data?.room);
  // const rooms = data?.room;

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Handle form submission here
    // console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 items-center justify-center"
    >
      <div>
        {/* <label>Select Option</label> */}
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className="border rounded px-4 py-2 focus:outline-none  w-96 input-box"
            >
              <option value="" disabled hidden>
                Select a city
              </option>
              <option value="lahan">Lahan</option>
              <option value="rajbiraj">Rajbiraj</option>
              <option value="kathmandu">Kathmandu</option>
            </select>
          )}
        />
      </div>
      <div>
        <div className="flex items-center">
          <input
            {...register('chockName')}
            type="text"
            className="block border border-gray-300 bg-white rounded px-4 py-2 w-96 focus:text-blue-700 input-box"
            placeholder="Enter chock name"
          />
        </div>
        {errors.chockName && <span>{errors.chockName.message}</span>}
      </div>
      <Button
        type="submit"
        className="bg-blue-700 body-medium rounded-md px-4 py-2 flex gap-2 md:w-96 w-78"
      >
        Search now <Search size={24} />
      </Button>
    </form>
  );
};

export default MyComponent;
