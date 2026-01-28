"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSentEmail } from "@/store/slices/auth";
import {
  useCheckAuthQuery,
  useRequestCodeMutation,
  useVerifyCodeMutation,
} from "@/store/apis/auth";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Key, Check, LoaderIcon } from "lucide-react";

export default function AuthPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const sentEmail = useSelector((state: RootState) => state.auth.sentEmail);

  const { data: user, isLoading: checkingAuth } = useCheckAuthQuery();
  const [requestCode, { isLoading: requesting }] = useRequestCodeMutation();
  const [verifyCode, { isLoading: verifying }] = useVerifyCodeMutation();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleRequestCode = async () => {
    if (!email) return;
    if (email === sentEmail) {
      setStep(2);
      return;
    }
    try {
      await requestCode({ email }).unwrap();
      dispatch(setSentEmail(email));
      toast.success("Code sent! Check your email.");
      setStep(2);
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to send code");
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return;
    try {
      await verifyCode({ email, code }).unwrap();
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.error || "Invalid code");
    }
  };

  const loading = checkingAuth || requesting || verifying;

  return (
    <div className="flex justify-center items-center min-h-dvh px-4 bg-white">
      <Card className="w-full max-w-md border rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">
            {step === 1 ? "Login with Email" : "Enter the Code"}
          </CardTitle>
          <CardDescription className="text-sm mt-1">
            {step === 1
              ? "We will send a 6-digit code to your email"
              : "Check your email and enter the code"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <InputGroup className="border rounded-md">
                <InputGroupAddon className="border-r">
                  <Mail className="w-5 h-5" />
                </InputGroupAddon>
                <InputGroupInput
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none focus:ring-0"
                />
              </InputGroup>

              <Button
                className="w-full flex items-center justify-center gap-2 border rounded-md"
                onClick={handleRequestCode}
                disabled={loading || !email}
              >
                {requesting ? (
                  <div className="flex items-center gap-2">
                    <LoaderIcon className="animate-spin w-5 h-5" />
                    Sending
                  </div>
                ) : (
                  <>
                    Send Code
                    <Check className="w-5 h-5" />
                  </>
                )}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <InputGroup className="border rounded-md">
                <InputGroupAddon className="border-r">
                  <Key className="w-5 h-5" />
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  placeholder="6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="border-none focus:ring-0"
                />
              </InputGroup>

              <Button
                className="w-full border rounded-md"
                onClick={handleVerifyCode}
                disabled={loading || !code}
              >
                {verifying ? "Verifying..." : "Login"}
              </Button>

              <Button
                variant="link"
                className="w-full mt-2 text-center"
                onClick={() => {
                  setStep(1);
                  setCode("");
                }}
              >
                Change Email
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
