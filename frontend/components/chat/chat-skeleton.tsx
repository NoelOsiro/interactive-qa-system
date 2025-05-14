export default function ChatSkeleton() {
  return (
    <div className="flex items-start gap-4 px-4 py-3 rounded-lg bg-background animate-pulse">
      <div className="flex-shrink-0 rounded-full p-2 bg-accent">
        <div className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="h-5 w-24 bg-muted rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-[90%]" />
          <div className="h-4 bg-muted rounded w-[75%]" />
        </div>
      </div>
    </div>
  );
}