export default function ChatSkeleton() {
  return (
    <div className="flex items-start gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background animate-pulse">
      <div className="flex-shrink-0 rounded-full p-1.5 sm:p-2 bg-muted">
        <div className="h-3 w-3 sm:h-4 sm:w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="h-4 sm:h-5 w-16 sm:w-24 bg-purple-600/40 rounded mb-2 sm:mb-3" />
        <div className="space-y-1.5 sm:space-y-2">
          <div className="h-3 sm:h-4 bg-purple-600/40 rounded w-full" />
          <div className="h-3 sm:h-4 bg-purple-600/40 rounded w-[90%]" />
          <div className="h-3 sm:h-4 bg-purple-600/40 rounded w-[75%]" />
        </div>
      </div>
    </div>
  );
}