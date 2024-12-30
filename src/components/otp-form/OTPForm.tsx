import { FC, KeyboardEvent, useCallback, useRef, useState } from 'react';

interface OTPFormProps {
    length?: number;
    onComplete?: (otp: string) => void;
}

const OTPForm: FC<OTPFormProps> = ({ length = 4, onComplete }) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

    const handleInputChange = useCallback((index: number, value: string) => {
        if (!/^[0-9]{1}$/.test(value)) return

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        // Move focus to next input if current input is filled
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check if OTP is complete
        if (newOtpValues.every(val => val.length === 1)) {
            onComplete?.(newOtpValues.join(''));
        }
    }, [otpValues, length, onComplete]);

    const handleKeyDown = useCallback((index: number, event: KeyboardEvent<HTMLInputElement>) => {
        const input = event.currentTarget;

        switch (event.code) {
            case 'Backspace':
            case 'Delete':
                event.preventDefault();

                // If input is empty, move focus to previous input
                if (input.value.length === 0 && index > 0) {
                    inputRefs.current[index - 1]?.focus();

                    // Clear the previous input when moving back
                    const newOtpValues = [...otpValues];
                    newOtpValues[index - 1] = '';
                    setOtpValues(newOtpValues);
                } else {
                    // Clear current input
                    const newOtpValues = [...otpValues];
                    newOtpValues[index] = '';
                    setOtpValues(newOtpValues);
                }
                break;

            case 'ArrowLeft':
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
                break;

            case 'ArrowRight':
                if (index < length - 1) {
                    inputRefs.current[index + 1]?.focus();
                }
                break;
        }
    }, [otpValues, length]);

    return (
        <div className="flex justify-center items-center">
            <div className="flex gap-4">
                {otpValues.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => inputRefs.current[index] = el}
                        type="text"
                        pattern="\d*"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        aria-label={`OTP digit ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default OTPForm;