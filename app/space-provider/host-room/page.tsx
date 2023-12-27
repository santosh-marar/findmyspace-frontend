'use client';
import { ArrowLeft, Bed, BedDouble, ChevronDownIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { IconAddressBook, IconFriends } from '@tabler/icons-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  useRegisterMyRoomMutation,
  useRoomImagesGetPreSignedPostUrlMutation,
} from '@/redux/api/spaceProviderApi';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/constants/image';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/redux/helpers';

const isValidNepaliPhoneNumber = (value: string): boolean => {
  const nepaliPhoneNumberRegex = /^[9]\d{9}$/; // 10-digit Nepali phone number regex starting with 9
  return nepaliPhoneNumberRegex.test(value);
};

const formSchema = z.object({
  district: z.string(),
  city: z.string({ invalid_type_error: 'City is required' }),
  chockName: z.string({ invalid_type_error: 'Chockname is required' }),
  streetName: z.string(),

  spaceProviderIsLiving: z.string(),
  genderPreference: z.string(),
  facility: z.object({
    water: z.boolean(),
    bed: z.boolean(),
    table: z.boolean(),
    fan: z.boolean(),
    chair: z.boolean(),
    clothesHanger: z.boolean(),
  }),
  descriptionOfRoom: z.string(),
  rulesOfLiving: z.string(),
  phone: z.string().refine((value) => isValidNepaliPhoneNumber(value), {
    message: 'Invalid phone number format.',
  }),
  price: z.string(),
  nearPopularPlaceName: z.string({
    invalid_type_error:
      'Enter any popular place near you like hospital, school, etc',
  }),
  image: z
    .array(z.custom<File>())
    .refine(
      (files) => {
        // Check if all items in the array are instances of the File object
        return files.every((file) => file instanceof File);
      },
      {
        // If the refinement fails, throw an error with this message
        message: 'Expected a file',
      }
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_IMAGE_SIZE),
      `File size should be less than 50mb.`
    )
    .refine(
      (files) => files.every((file) => ALLOWED_IMAGE_TYPES.includes(file.type)),
      'Only these types are allowed .jpg, .jpeg, .png and .webp'
    ),
  roomImagesUrl: z.string().array().optional(),
});

const RegisterRoom = () => {
  const router = useRouter();

  const [roomImagesGetPreSignedPostUrl, { error: postDataError }] =
    useRoomImagesGetPreSignedPostUrlMutation();

  const [registerMyRoom, { isLoading, error }] = useRegisterMyRoomMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetName: '',
      facility: {
        water: false,
        bed: false,
        table: false,
        fan: false,
        chair: false,
        clothesHanger: false,
      },
    },
  });

  const handleUpload = async (values: z.infer<typeof formSchema>) => {
    const images = values?.image;
    if (!images) {
      return null;
    }

    try {
      const roomImagePath = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const { type } = image;
        const imageType = type.split('/')[1];
        const imagePathAndType = `room_images/${uuidv4()}${new Date()
          .toISOString()
          .replace(/[-:]/g, '-')}.${imageType}`;
        roomImagePath.push(imagePathAndType);
      }

      // try {
      let formDataToGetImageUrl = new FormData();
      const promises = roomImagePath.map(async (value, index) => {
        formDataToGetImageUrl.append(`imagePathAndType`, value);
      });

      const response = await roomImagesGetPreSignedPostUrl(
        formDataToGetImageUrl
      ).unwrap();

      const roomImageAndPath: string[] = [];
      let responseImageUrl: string = '';

      for (let i = 0; i < response.length; i++) {
        responseImageUrl = response[i].url;
        let key = response[i].fields.key;
        roomImageAndPath.push(`${responseImageUrl}/${key}`);
      }
      values.roomImagesUrl = roomImageAndPath;

      try {
        const res = await registerMyRoom(values).unwrap();

        const promises = images.map((image: any, index: number) => {
          const formDataToPostImageUrl = new FormData();

          const respon = response[index];
          responseImageUrl = respon?.url;
          Object.entries(respon.fields).forEach(([key, value]) => {
            formDataToPostImageUrl.append(key, value as string);
          });

          formDataToPostImageUrl.append('file', image);
          return fetch(responseImageUrl, {
            method: 'POST',
            body: formDataToPostImageUrl,
          });
        });

        await Promise.all(promises);
        // router.push('/space-provider/my-profile');
      } catch (err: any) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
          // enqueueSnackbar(errMsg, { variant: 'error' })
          toast.error(errMsg);
          // console.log(errMsg);
        } else if (isErrorWithMessage(err)) {
          toast.error(err.message);
        }
      }
    } catch (err: any) {
      return err;
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const uploadResult = await handleUpload(values);
  }

  // Get current images value (always watched updated)
  const image = form.watch('image');

  return (
    <div className="">
      <Link href="/space-provider/my-profile">
        <ArrowLeft className="md:mx-8 mx-2 mt-4 h-6 w-6 md:h-12 md:w-12" />
      </Link>

      <div className="container md:h-5/6 flex flex-col gap-4 md:gap-8 items-center justify-center">
        <h1 className="md:h1 h4 text-blue-700">Host your room </h1>
        <div className="bg-white min-w-min min-h-min md:px-16 md:py-12 py-6 px-4 flex flex-col items-center justify-center rounded-lg border border-gray-300 mb-8">
          <div className="flex flex-col gap-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-4">
                  <div className="address flex flex-col gap-1">
                    <p className="p-ui-medium flex gap-1 md:gap-2 md underline">
                      {' '}
                      <IconAddressBook /> Address
                    </p>
                    <div className="flex flex-col  gap-2 justify-between">
                      <div className="flex gap-1 w-full justify-between">
                        <FormField
                          control={form.control}
                          name="district"
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
                                    <option value="" hidden>
                                      Select a district
                                    </option>
                                    <option value="siraha">Siraha</option>
                                    <option value="saptari">Saptari</option>
                                    <option value="kathmandu">Kathmandu</option>
                                    <option value="morang">Morang</option>
                                    <option value="danusha">Dhanusha</option>
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
                                    <option value="" hidden>
                                      Select a city
                                    </option>
                                    <option value="lahan">Lahan</option>
                                    <option value="rajbiraj">Rajbiraj</option>
                                    <option value="kathmandu">Kathmandu</option>
                                    <option value="biratnagar">
                                      Biratnagar
                                    </option>
                                    <option value="janakpur">Janakpur</option>
                                  </select>
                                </FormControl>
                                <ChevronDownIcon className="absolute right-3 top-4 h-4 w-4 opacity-50" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex gap-1 w-full justify-between">
                        <FormField
                          control={form.control}
                          name="chockName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Chock name"
                                  {...field}
                                  className="input-box-small"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="streetName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Street name"
                                  {...field}
                                  className="input-box-small"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="address flex flex-col gap-1">
                    <p className="p-ui-medium flex gap-1 md:gap-2 md underline">
                      {' '}
                      <BedDouble /> Are you living
                    </p>

                    <div className="flex gap-1 w-full justify-between">
                      <FormField
                        control={form.control}
                        name="spaceProviderIsLiving"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid max-w-md grid-cols-2 gap-8 pt-2"
                            >
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  <FormControl>
                                    <RadioGroupItem value="false" id="r1" />
                                  </FormControl>

                                  <span className="block w-full p-2 text-center font-normal">
                                    No
                                  </span>
                                </FormLabel>
                              </FormItem>
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  <FormControl>
                                    <RadioGroupItem value="true" id="r2" />
                                  </FormControl>

                                  <span className="block w-full p-2 text-center font-normal">
                                    Yes
                                  </span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="address flex flex-col gap-1">
                    <p className="p-ui-medium flex gap-1 md:gap-2 md underline">
                      {' '}
                      <IconFriends /> Gender Preference
                    </p>
                    <div className="flex gap-1 w-full justify-between">
                      <FormField
                        control={form.control}
                        name="genderPreference"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="md:grid min-w-md grid-cols-4 gap-1 pt-1 flex flex-wrap justify-start"
                            >
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  <FormControl>
                                    <RadioGroupItem value="forAll" id="r1" />
                                  </FormControl>

                                  <span className="block w-full p-2 text-center font-normal">
                                    All
                                  </span>
                                </FormLabel>
                              </FormItem>
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  <FormControl>
                                    <RadioGroupItem value="girlsOnly" id="r2" />
                                  </FormControl>

                                  <span className="block w-full p-2 text-center font-normal">
                                    Girls Only
                                  </span>
                                </FormLabel>
                              </FormItem>
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  <FormControl>
                                    <RadioGroupItem value="boysOnly" id="r1" />
                                  </FormControl>

                                  <span className="block w-full p-2 text-center font-normal">
                                    Boys Only
                                  </span>
                                </FormLabel>
                              </FormItem>
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  <FormControl>
                                    <RadioGroupItem
                                      value="familyAndGirlsOnly"
                                      id="r1"
                                    />
                                  </FormControl>

                                  <span className="block w-full p-2 text-center font-normal">
                                    Family & Girls only
                                  </span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="address flex flex-col gap-2">
                    <p className="p-ui-medium flex gap-1 md:gap-2 md underline">
                      {' '}
                      <Bed /> Facility
                    </p>

                    <div className="flex gap-2 w-full justify-between flex-wrap">
                      <FormField
                        control={form.control}
                        name="facility.bed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="subtle-medium-medium-medium ">
                              Bed
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="facility.table"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="subtle-medium-medium-medium">
                              Table
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="facility.chair"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="subtle-medium-medium-medium ">
                              Chair
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="facility.fan"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="subtle-medium-medium-medium ">
                              Fan
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="facility.clothesHanger"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="subtle-medium-medium-medium ">
                              Clothes Hanger
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* <div> */}
                  <FormField
                    control={form.control}
                    name="descriptionOfRoom"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Description of room"
                            className="resize-none subtle-medium bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rulesOfLiving"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Rules of living"
                            className="resize-none subtle-medium bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* </div> */}

                  <div className="flex gap-2 md:flex-row flex-col">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Phone number"
                              {...field}
                              className="input-box"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Per month charge"
                              {...field}
                              className="input-box"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-2 md:flex-row flex-col">
                    <FormField
                      control={form.control}
                      name="nearPopularPlaceName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Near popular place. Any hospital, school"
                              {...field}
                              className="input-box"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: { onChange }, ...field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              multiple={true}
                              accept="image/*"
                              type="file"
                              placeholder="Profile picture"
                              disabled={form.formState.isSubmitting}
                              {...field}
                              className="input-box"
                              onChange={(event) => {
                                // Triggered when user uploaded a new file
                                // FileList is immutable, so we need to create a new one
                                const dataTransfer = new DataTransfer();

                                // Add old images
                                if (image) {
                                  Array.from(image).forEach((image) =>
                                    dataTransfer.items.add(image)
                                  );
                                }

                                // Add newly uploaded images
                                Array.from(event.target.files!).forEach(
                                  (image) => dataTransfer.items.add(image)
                                );

                                // Validate and update uploaded file
                                const newFiles = dataTransfer.files;
                                const imageArray = Array.from(newFiles);
                                onChange(imageArray);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" className="btn">
                  Host my room
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRoom;
