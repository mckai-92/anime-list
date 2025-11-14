import { Input } from "@heroui/input";

export const Characters = () => {
  return (
    <div className="flex w-full flex-col">
      Characters list
      <Input label="Email" type="email" />
      <Input label="Email" placeholder="Enter your email" type="email" />
    </div>
  );
};
