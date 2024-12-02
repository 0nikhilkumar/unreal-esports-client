import {
  FigmaLogoIcon,
  FramerLogoIcon,
  SketchLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
  VercelLogoIcon,
  NotionLogoIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const LOGOS = [
  <FigmaLogoIcon width={24} height={24} className="text-slate-800" />,
  <FramerLogoIcon width={24} height={24} className="text-slate-800" />,
  <SketchLogoIcon width={24} height={24} className=" text-slate-800" />,
  <TwitterLogoIcon width={24} height={24} className="text-slate-800" />,
  <GitHubLogoIcon width={24} height={24} className="text-slate-800" />,
  <VercelLogoIcon width={24} height={24} className="text-slate-800" />,
  <NotionLogoIcon width={24} height={24} className="text-slate-800" />,
  <DiscordLogoIcon width={24} height={24} className="text-slate-800" />,
  <InstagramLogoIcon width={24} height={24} className="text-slate-800" />,
  <LinkedInLogoIcon width={24} height={24} className="text-slate-800" />,
];

const Partners = () => {
  return (
    <div className="relative m-auto flex justify-center items-center w-[320px] sm:w-[600px] md:w-[700px] lg:w-[1000px] h-[100px] overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <h1 className="absolute inset-0 text-black text-center text-3xl z-10">
        Our Clients
      </h1>

      <div className="animate-infinite-slider flex w-[calc(250px*10)]">
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[125px] items-center justify-center"
            key={index}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
