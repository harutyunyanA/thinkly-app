import Lottie from "lottie-react";
import loaderAnimation from "../assets/brain.json";

export function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Lottie
        animationData={loaderAnimation}
        loop
        // style={{ width: 120, height: 120 }}
      />
    </div>
  );
}
