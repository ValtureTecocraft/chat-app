import { Message } from "./Message";

export const Messages = () => {
  return (
    <div className="w-full min-h-full flex flex-col-reverse gap-3">
      <Message owner={true} />
      <Message owner={false} />
      <Message owner={true} />
      <Message owner={false} />
      <Message owner={true} />
      <Message owner={false} />
      <Message owner={true} />
      <Message owner={false} />
    </div>
  );
};
