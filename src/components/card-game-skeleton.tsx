export function CardGameSkeleton() {
  return (
    <div className="grid grid-flow-row gap-4 overflow-hidden rounded-xl border-2 border-neutral-200 dark:border-neutral-800">
      <div className="relative h-56 w-full animate-pulse overflow-hidden rounded-tr-lg bg-gradient-to-tr from-neutral-100 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />

      <div className="flex h-max flex-col px-4 pb-4">
        <div className="border-b border-neutral-200 py-1 dark:border-neutral-800">
          <h2 className="inline-block h-6 w-1/2 animate-pulse rounded-lg bg-gradient-to-tr from-neutral-100 to-neutral-300 dark:from-neutral-700 dark:text-neutral-100" />
        </div>

        <p className="mt-2 h-4 w-full animate-pulse rounded-lg bg-gradient-to-tr from-neutral-100 to-neutral-300 text-sm/5 text-neutral-700 dark:from-neutral-700 dark:to-neutral-800" />
        <p className="mt-2 h-4 w-full animate-pulse rounded-lg bg-gradient-to-tr from-neutral-100 to-neutral-300 text-sm/5 text-neutral-700 dark:from-neutral-700 dark:to-neutral-800" />

        <div className="mt-6 flex items-center justify-between">
          <span className="inline-block h-6 flex-1 animate-pulse rounded-md bg-gradient-to-tr from-neutral-100 to-neutral-300 px-4 py-2 dark:from-neutral-700 dark:to-neutral-800" />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="inline-block h-6 flex-1 animate-pulse rounded-md bg-gradient-to-tr from-neutral-100 to-neutral-300 px-4 py-2 dark:from-neutral-700 dark:to-neutral-800" />
        </div>
      </div>
    </div>
  );
}
