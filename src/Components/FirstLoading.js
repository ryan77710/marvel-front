import { useEffect } from "react";
import useCountDown from "react-countdown-hook";
import spiderMovie from "../assets/video/Miles-Morales.mp4";
const FirstLoading = ({ setIsLoading }) => {
  const initialTime = 227 * 1000;
  const interval = 1000;
  const [timeLeft, { start }] = useCountDown(initialTime, interval);
  useEffect(() => {
    start();
  }, [start]);

  return (
    <div>
      <video controls muted={true} loop autoPlay width="auto">
        <source src={spiderMovie} type="video/mp4" />
      </video>
      <button
        onClick={timeLeft < 150000 ? () => setIsLoading(false) : () => {}}
        onDoubleClick={() => setIsLoading(false)}
        className="video-button"
      >
        {timeLeft / 1000} passer
      </button>
    </div>
  );
};
export default FirstLoading;
