import { Game } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonsVariants } from "./shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shared/ui/dialog";

type CardGameDialogProps = Game;

export function CardGameDialog({
  title,
  short_description,
  thumbnail,
  game_url,
  genre,
  platform,
  publisher,
  release_date,
  freetogame_profile_url,
}: CardGameDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={`view details for game ${title}`}>
          View details
          <ArrowUpRight size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full p-0 lg:max-w-[800px]">
        <div className="relative aspect-[12/5] overflow-hidden rounded-xl">
          <Image
            src={thumbnail}
            alt="thumbnail game"
            fill
            quality={100}
            priority
            className="bg-cover"
          />
        </div>

        <div className="px-6 pb-6 pt-2">
          <div className="flex flex-col items-start justify-between gap-4">
            <DialogHeader>
              <DialogTitle className="inline text-start">
                <Link
                  target="_blank"
                  href={game_url}
                  className="hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  {title}
                </Link>
              </DialogTitle>
              <DialogDescription className="text-start">
                {short_description}
              </DialogDescription>
            </DialogHeader>

            <Link
              className={buttonsVariants({ variant: "neutral" })}
              href={freetogame_profile_url}
            >
              Get all infos
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="mt-8 grid grid-flow-row place-items-start items-center gap-3 last:flex-auto md:gap-3 lg:grid-flow-col">
            <div className="flex items-center justify-between gap-3 text-sm font-medium dark:text-white">
              <Button variant="green" size="md">
                Available for
              </Button>
              <span className="flex-1 text-right">{platform}</span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm font-medium dark:text-white">
              <Button variant="blue">Release</Button>
              <span className="flex-1 text-right text-neutral-900 dark:text-neutral-100">
                {release_date}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm font-medium dark:text-white">
              <Button variant="red" size="md">
                Genre
              </Button>
              <span className="flex-1 text-right text-neutral-900 dark:text-neutral-100">
                {genre}
              </span>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Powered by {publisher}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
