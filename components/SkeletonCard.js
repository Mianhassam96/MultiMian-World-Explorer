export default function SkeletonCard() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="h-48 skeleton"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 skeleton rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 skeleton rounded"></div>
          <div className="h-4 skeleton rounded"></div>
          <div className="h-4 skeleton rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}
