import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner";
import z from "zod";



// zod schema
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})



export default function Verify() {

const location = useLocation();
const navigate = useNavigate();
const [email] = useState(location.state);
const [isConfirmd, setIsConfirmd] = useState(false);
const [sendOtp] = useSendOtpMutation();
const [verifyOtp] = useVerifyOtpMutation();

// useEffect(() => {
  
//      if(!email){
//          navigate("/login");
//      }

// }, [email])


const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })


  // 
const onSubmit = async(values: z.infer<typeof FormSchema>)=>{
        const toastId = toast.loading("Verifing Otp");
        // 
      const userInfo ={
         email,
         otp: values?.pin
        }

        try {
          const res = await verifyOtp(userInfo).unwrap();
    
         if(res.success){
             setIsConfirmd(!isConfirmd);
             toast.success("Otp send",{id:toastId});

         }
        } catch (error) {
           console.log(error);
        }

}



// 
const handleConfirm = async()=>{
  const toastId = toast.loading("Sending Otp")
    try {
       const res = await sendOtp({email:email}).unwrap();
    
         if(res.success){
             setIsConfirmd(!isConfirmd);
             toast.success("Your account successfully verified",{id:toastId})
         }
    } catch (error) {
       console.log(error);
    }


}





// 
  return (
       
    <div className="w-[400px]">
       {/*  */}
 
        {isConfirmd ? <>
             <Card>
                <CardHeader>
                  <CardTitle>Verify your account through</CardTitle>
                  <CardDescription>
                      Check your email inbox to find Otp code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/*  */}
                  <Form {...form}>
                    <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                      <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                          <FormItem className="w-full m-auto">
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                              <InputOTP className="w-full" maxLength={6} {...field}>
                                <InputOTPGroup className="w-full">
                                  <InputOTPSlot index={0} />
                                </InputOTPGroup>
                                <InputOTPGroup className="w-full">
                                  <InputOTPSlot index={1} />
                                </InputOTPGroup>
                                <InputOTPGroup className="w-full">
                                  <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <Minus />
                                <InputOTPGroup className="w-full">
                                  <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPGroup className="w-full">
                                  <InputOTPSlot index={4} />
                                </InputOTPGroup>
                                <InputOTPGroup className="w-full">
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormDescription>
                              Please enter the one-time password sent to your phone.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>

                </CardContent>
                  <CardFooter className="flex-col gap-2">
                  <Button form="otp-form" type="submit" className="w-full text-teal-50">
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </> :
            <>
            <Card>
              <CardTitle>Verify your account through Email</CardTitle>
                <CardDescription>
                    We will send you an otp code plese click on Confirm button
                </CardDescription>
                <CardFooter className="flex-col gap-2">
                  <Button onClick={()=>handleConfirm()} type="submit" className="w-full text-teal-50">
                      Confirmd
                  </Button>
                </CardFooter>
              </Card>
            </>
         
      }


       {/*  */}
    
    </div>
      
  )
}
