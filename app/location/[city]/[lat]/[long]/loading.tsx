import { FC } from "react";
import { SunIcon } from "@heroicons/react/solid";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="bg-gradient-to-br from-[#394f68] to-[#183b7e] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="h-24 w-24 animate-spin text-yellow-500"
        color="yellow"
      />
      <h1 className="text-6xl font-bold mb-10 animate-pulse text-center text-yellow-500">
        Loading City Weather Information
      </h1>
      <h2 className="text-xl font-bold text center mb-10 animate-pulse">
        Hold on tight, we&apos;re getting the weather for you!
      </h2>
    </div>
  );
};

export default Loading;
