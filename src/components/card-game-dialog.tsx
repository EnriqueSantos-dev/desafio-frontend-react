import { Game } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shared/ui/dialog";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
        <button
          type="button"
          aria-label={`view details for game ${title}`}
          className="focus-state z-10 flex h-10 w-fit items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 shadow-innerShadowLight ring-amber-500 ring-offset-neutral-300 transition-colors hover:bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-100 dark:shadow-innerShadowDark dark:ring-offset-neutral-900 dark:hover:bg-neutral-800"
        >
          view details
          <ArrowUpRight size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="w-full p-0 lg:max-w-[800px]">
        <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
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
          <div className="flex items-start justify-between gap-4">
            <DialogHeader>
              <DialogTitle className="inline text-start">
                <Link target="_blank" href={game_url} className="underline">
                  {title}
                </Link>
              </DialogTitle>
              <DialogDescription className="text-start">
                {short_description}
              </DialogDescription>
            </DialogHeader>

            <Link
              className="focus-state z-50 flex h-10 w-fit shrink-0 items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 shadow-innerShadowLight ring-amber-500 ring-offset-neutral-300 transition-colors hover:bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-100 dark:shadow-innerShadowDark dark:ring-offset-neutral-900 dark:hover:bg-neutral-900"
              href={freetogame_profile_url}
            >
              Get all infos
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="mt-8 grid grid-flow-row place-items-start items-center gap-3 last:flex-auto md:gap-3 lg:grid-flow-col">
            <div className="flex items-center justify-between gap-3 text-sm font-medium dark:text-white">
              <span className="inline-block rounded-md bg-green-200 px-4 py-2 text-neutral-900 dark:bg-green-600 dark:text-white">
                Available for
              </span>
              <span className="flex-1 text-right">{platform}</span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm font-medium dark:text-white">
              <span className="inline-block rounded-md bg-blue-500 px-4 py-2 text-white dark:bg-blue-600">
                Release
              </span>
              <span className="flex-1 text-right text-neutral-900 dark:text-neutral-100">
                {release_date}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm font-medium dark:text-white">
              <span className="inline-block rounded-md bg-red-500 px-4 py-2 text-white dark:bg-red-600">
                Genre
              </span>
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
