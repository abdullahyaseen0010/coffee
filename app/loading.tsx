export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e7c9a8] border-t-[#2d1b12]" aria-label="Loading" />
    </div>
  );
}
