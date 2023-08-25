export const Message = ({ owner }: { owner: boolean }) => {
  return (
    <div className={`${owner ? "flex-row-reverse" : "flex-row"} flex gap-4`}>
      <div className="min-w-max">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src="https://source.unsplash.com/random/80x80/?profile"
          alt="profile"
        />
        <span className="font-light text-xs">just now</span>
      </div>

      <div className={`${owner ? "items-end" : ""} gap-2 flex flex-col w-full`}>
        <p
          className={`${
            owner
              ? "bg-[#414857] text-white rounded-[10px_0px_10px_10px]"
              : "bg-white rounded-[0px_10px_10px_10px]"
          } max-w-max p-2 text-sm px-4`}
        >
          Hello
        </p>
        <img
          className="max-w-[50%]"
          src="https://source.unsplash.com/random/"
          alt=""
        />
      </div>
    </div>
  );
};
