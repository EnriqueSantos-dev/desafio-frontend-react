import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shared/ui/tooltip";
import Image from "next/image";

type Platforms = "PC (Windows)" | "Web Browser";

const iconsForPlatforms: Record<Platforms, string> = {
  "PC (Windows)": "/windows-logo.svg",
  "Web Browser": "/chrome.svg",
};

type BadgeGamePlatformProps = {
  platform: string;
};

export default function BadgeGamePlatform({
  platform,
}: BadgeGamePlatformProps) {
  const platforms = platform
    .split(",")
    .map((platform) => platform.trim()) as Platforms[];

  return (
    <div className="flex justify-end gap-2">
      {platforms.map((platform) => (
        <TooltipProvider key={platform} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger>
              <Image
                src={iconsForPlatforms[platform]}
                alt={platform}
                width={20}
                height={20}
              />
            </TooltipTrigger>
            <TooltipContent>{platform}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
