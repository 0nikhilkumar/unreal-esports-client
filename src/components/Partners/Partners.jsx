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
  <FigmaLogoIcon width={24} height={24} className="text-white" />,
  <FramerLogoIcon width={24} height={24} className="text-white" />,
  <SketchLogoIcon width={24} height={24} className="text-white" />,
  <TwitterLogoIcon width={24} height={24} className="text-white" />,
  <GitHubLogoIcon width={24} height={24} className="text-white" />,
  <VercelLogoIcon width={24} height={24} className="text-white" />,
  <NotionLogoIcon width={24} height={24} className="text-white" />,
  <DiscordLogoIcon width={24} height={24} className="text-white" />,
  <InstagramLogoIcon width={24} height={24} className="text-white" />,
  <LinkedInLogoIcon width={24} height={24} className="text-white" />,
];

const Partners = () => {
  return (
    <div className="relative bg-black py-10">
      {/* Headline */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase relative inline-block text-white">
          Partners
          <span className="block h-1 bg-blue-500 w-16 mx-auto mt-2"></span>
        </h1>
      </div>

      {/* Scrolling Logos */}
      <div className="px-20 h-52 flex justify-center items-center">
        <div className="m-auto flex justify-center items-end h-[100px] overflow-hidden">
          <div className="animate-infinite-slider mb-6 flex w-[calc(250px*10)] justify-center items-center">
            {LOGOS.map((logo, index) => (
              <div
                className="slide flex w-[125px] items-center justify-center"
                key={index}>
                {logo}
              </div>
            ))}
            {LOGOS.map((logo, index) => (
              <div
                className="slide flex w-[125px] items-center justify-center"
                key={index}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
