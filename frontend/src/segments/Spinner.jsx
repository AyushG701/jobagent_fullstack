import React from "react";
import { PacmanLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <PacmanLoader color="#000000" margin={0} size={29} />

      <p className="text-lg text-center px-2">loading</p>
    </div>
  );
};

export default Spinner;
