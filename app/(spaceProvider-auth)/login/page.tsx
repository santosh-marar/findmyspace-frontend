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
import { useLoginMutation } from '@/redux/api/spaceProviderAuthApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/redux/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as z from 'zod';

const isValidNepaliPhoneNumber = (value: string): boolean => {
  const nepaliPhoneNumberRegex = /^[9]\d{9}$/; // 10-digit Nepali phone number regex starting with 9
  return nepaliPhoneNumberRegex.test(value);
};

const formSchema = z.object({
  phone: z.string().refine((value) => isValidNepaliPhoneNumber(value), {
    message: 'Invalid phone number format.',
  }),
  password: z.string().min(6, {
    message: 'At least 6 letter is required!',
  }),
});

const Login = () => {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    try {
      const response = await login(values).unwrap();
      router.push('/space-provider/my-profile');
    } catch (err: any) {
      if (isErrorWithMessage(err)) {
        toast.error(err?.message);
        // console.log(errMsg);
      } else if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        toast.error(errMsg);
      }
      // console.log(e);
    }
  }

  return (
    <div className="h-full">
      <Link href="/">
        <ArrowLeft className="md:mx-8 mx-2 mt-4 h-6 w-6 md:h-12 md:w-12" />
      </Link>
      <div className="container h-5/6 flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 md:h-full lg:gap-16 xl:gap-32 flex-wrap">
          <div>
            <h1 className="text-blue-700 h2 md:h1 mb-2">findmyspace.live</h1>
            <p className="lead hidden md:block">
              findmyspace.live help you to find room <br /> according to your
              condition and comfort.
            </p>
          </div>
          <div className="bg-white md:px-16 py-12 px-8 md:w-[436px] md:h-[428] flex flex-col items-center justify-center rounded-lg border border-gray-300 w-11/12">
            <div className="flex flex-col gap-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-4">
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
                  <Button type="submit" disabled={isLoading} className="btn">
                    Login
                  </Button>
                </form>
                <div className="flex flex-col gap-1">
                  {/* <Link href="#">
                    <p className="p-ui underline">Forget password</p>
                  </Link> */}
                  <span>
                    Don’t have an account?{' '}
                    <Link href="/signup" className="text-blue-700 underline">
                      Signup now
                    </Link>{' '}
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
