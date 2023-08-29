// import React from 'react'

import { IoMdClose } from "react-icons/io";

export const ImagePreviewModel = ({
  imgURL,
  onClose,
}: {
  imgURL: string;
  onClose: any;
}) => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-screen flex justify-center items-center backdrop-blur-[4px] ">
      <div className="flex h-4/5">
        <img className="rounded-md" src={imgURL} alt="imagePrev" />
        <IoMdClose
          onClick={onClose}
          className="ml-2 text-lg hover:scale-125 duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};
