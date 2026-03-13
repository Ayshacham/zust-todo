const inputClasses =
  "p-3 rounded border-none bg-[#2d2d2d] text-white w-full";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return <input className={inputClasses} {...props} />;
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea(props: TextAreaProps) {
  return <textarea className={`${inputClasses} resize-y`} {...props} />;
}
