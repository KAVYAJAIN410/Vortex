import Marquee from "react-fast-marquee";
import Image from "next/image";
import star from "@/assets/star.svg"
const Star = () => {
  return (
    <div className="flex items-center">
      <Image className="h-6" src={star} alt="roboVitics" />
    </div>
  );
};
const Marq = () => {
  return (
    <div>
      <Marquee speed={100} className="bg-white">
        <div className="flex gap-10 bg-white text-black justify-around font-bold text-lg md:text-3xl leading-normal">
          &nbsp;
          <Star></Star>
          &nbsp;RoboVitics&nbsp;
          <Star></Star>
          &nbsp;RoboVitics&nbsp;
          <Star></Star>
          &nbsp;RoboVitics&nbsp;
          <Star></Star>
          &nbsp;RoboVitics&nbsp;
          <Star></Star>
          &nbsp;RoboVitics&nbsp;
        </div>
      </Marquee>
    </div>
  );
};

export default Marq;