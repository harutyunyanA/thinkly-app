import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import loaderAnimation from "../assets/brain-loader.json";

type LoaderProps = {
  size?: number;
  fullscreen?: boolean;
};

export default function Loader({
  size = 150,
  fullscreen = false,
}: LoaderProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(0.5);
  }, []);

  const content = (
    <Lottie
      lottieRef={lottieRef}
      animationData={loaderAnimation}
      loop
      autoplay
      style={{ width: size, height: size }}
    />
  );

  if (fullscreen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        {content}
      </div>
    );
  }

  return content;
}
