'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { isValidNepaliPhoneNumber } from '@/lib/validation';
import {
  useRegisterMutation,
  useSpaceProviderAvatarGetPreSignedPostUrlMutation,
} from '@/redux/api/spaceProviderAuthApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/redux/helpers';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/constants/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAddressBook } from '@tabler/icons-react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string({ invalid_type_error: 'Full name is required' }),
  email: z.string().email('Invalid email address'),
  DOB: z.string(),
  profession: z.string({ invalid_type_error: 'Your profession is required' }),
  address: z.object({
    district: z.string(),
    city: z.string({ invalid_type_error: 'City is required' }),
    chockName: z.string({ invalid_type_error: 'Chockname is required' }),
  }),
  phone: z.string().refine((value) => isValidNepaliPhoneNumber(value), {
    message: 'Invalid phone number format.',
  }),
  password: z.string().min(6, {
    message: 'At least 6 letter is required!',
  }),
  imageUrl: z.string().optional(),
  image: z.array(z.custom<File>())
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
});



const SignUp = () => {
  const router = useRouter();

  const [spaceProviderAvatarGetPreSignedPostUrl, { error: postDataError }] =
    useSpaceProviderAvatarGetPreSignedPostUrlMutation();

  const [register, { data, error, isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profession: '',
    },
  });

  const handleUpload = async (values: any) => {
    const image = values?.image[0];
    if (!image) {
      return null;
    }

    try {
      const { type } = image;
      const imageType = type.split('/')[1];
      const imagePathAndType = `space-providers_avatar/${uuidv4()}${new Date()
        .toISOString()
        .replace(/[-:]/g, '-')}.${imageType}`;

      const formDataToGetImageUrl = new FormData();
      formDataToGetImageUrl.append('imagePathAndType', imagePathAndType);

      const response = await spaceProviderAvatarGetPreSignedPostUrl(
        formDataToGetImageUrl
      ).unwrap();

      const imageUrl = `${response?.url}/${imagePathAndType}`;
      values.imageUrl = imageUrl;

      try {
        const res = await register(values).unwrap();

        const formDataToPostImageUrl = new FormData();
        Object.entries(response.fields).forEach(([key, value]) => {
          formDataToPostImageUrl.append(key, value as string);
        });

        formDataToPostImageUrl.append('file', image);

        try {
          const res = await fetch(response.url, {
            method: 'POST',
            body: formDataToPostImageUrl,
          });

          router.push('/login');
          return `image upload successfully`;
        } catch (error) {
          return error;
        }
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
    <div className="h-full">
      <Link href="/login">
        <ArrowLeft className="md:mx-8 mx-2 mt-4 h-6 w-6 md:h-12 md:w-12" />
      </Link>

      <div className="container md:h-5/6 flex flex-col gap-4 md:gap-8 items-center justify-center">
        <h1 className="md:h1 h4 text-blue-700">Space-provider Sign-up </h1>
        <div className="bg-white min-w-min min-h-min md:px-16 md:py-12 py-6 px-4 flex flex-col items-center justify-center rounded-lg border border-gray-300 mb-8">
          <div className="flex flex-col gap-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 md:flex-row flex-col">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Full name"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              className="input-box"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-2 w-full justify-between">
                    <FormField
                      control={form.control}
                      name="DOB"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Date of birth"
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
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Profession"
                              {...field}
                              className="input-box-small"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="address flex flex-col gap-1">
                    <p className="p-ui-medium flex gap-1 md:gap-2 md">
                      {' '}
                      <IconAddressBook /> Address
                    </p>
                    <div className="flex flex-col  gap-2 justify-between">
                      <div className="flex gap-1 w-full justify-between">
                        <FormField
                          control={form.control}
                          name="address.district"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="District"
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
                          name="address.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="City"
                                  {...field}
                                  className="input-box-small"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex gap-1 w-full justify-between">
                        <FormField
                          control={form.control}
                          name="address.chockName"
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
                      </div>
                    </div>
                  </div>
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password"
                              {...field}
                              className="input-box"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple={true}
                            disabled={form.formState.isSubmitting}
                            {...field}
                            onChange={(event) => {
                              // Triggered when user uploaded a new file
                              // FileList is immutable, so we need to create a new one
                              const dataTransfer = new DataTransfer();

                              // Add old images
                              if (image) {
                                Array.from(image).forEach((image: any) =>
                                  dataTransfer.items.add(image)
                                );
                              }

                              // Add newly uploaded images
                              Array.from(event.target.files!).forEach((image) =>
                                dataTransfer.items.add(image)
                              );

                              // Validate and update uploaded file
                              const newFiles = dataTransfer.files;
                              // console.log(newFiles);
                              onChange(newFiles);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="btn">
                  Sign up
                </Button>
              </form>
              <div>
                <div className="flex flex-col gap-1">
                  <span>
                    Already have a account?{' '}
                    <Link href="/login" className="text-blue-700 underline">
                      login now
                    </Link>{' '}
                  </span>
                </div>
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
