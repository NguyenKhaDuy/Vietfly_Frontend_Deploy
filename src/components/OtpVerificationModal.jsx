/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, X, RotateCw } from "lucide-react";

const OTP_DURATION = 5 * 60; // 5 phút = 300 giây

export default function OtpVerificationModal({
  open,
  email = "",
  onClose,
  onVerify,
  onResend,
  loading = false,
  error = "",
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(OTP_DURATION);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!open) return;

    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(OTP_DURATION);

    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, timeLeft]);

  if (!open) return null;

  const otpValue = otp.join("");
  const isComplete = otpValue.length === 6;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  const handleChange = (index, value) => {
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Paste nhiều số
    if (numericValue.length > 1) {
      const pastedOtp = numericValue.slice(0, 6).split("");
      const newOtp = ["", "", "", "", "", ""];

      pastedOtp.forEach((char, i) => {
        newOtp[i] = char;
      });

      setOtp(newOtp);

      const nextIndex = Math.min(pastedOtp.length, 5);
      inputRefs.current[nextIndex]?.focus();

      return;
    }

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Tự chuyển ô
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (event.key === "Enter" && isComplete && !loading) {
      onVerify?.(otpValue);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || loading) return;

    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(OTP_DURATION);

    await onResend?.();

    inputRefs.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">Xác thực OTP</h2>

              <p className="text-xs text-slate-500">
                Bảo mật tài khoản VietFly
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>
        <div className="px-6 py-7">
          <div className="text-center">
            <p className="text-sm leading-6 text-slate-500">
              Mã xác thực gồm 6 chữ số đã được gửi đến
            </p>

            {email && (
              <p className="mt-1 font-semibold text-slate-800">{email}</p>
            )}
          </div>
          <div className="mt-7 flex justify-center gap-2 sm:gap-3">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                disabled={loading}
                className={`
                  h-12 w-11 rounded-xl border
                  bg-slate-50 text-center text-xl font-bold
                  text-slate-900 outline-none transition
                  sm:h-14 sm:w-12
                  ${
                    error
                      ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  }
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                `}
              />
            ))}
          </div>
          {error && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}
          <div className="mt-6 text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-slate-500">
                Mã OTP có hiệu lực trong{" "}
                <span className="font-semibold text-cyan-600">
                  {formattedTime}
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCw size={15} />
                Gửi lại mã OTP
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => onVerify?.(otpValue)}
            disabled={!isComplete || loading}
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Đang xác thực...
              </>
            ) : (
              "Xác nhận OTP"
            )}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            Không chia sẻ mã OTP này với bất kỳ ai để đảm bảo an toàn cho tài
            khoản của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
