export default function GradientSpinner() {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-green-500 border-r-green-400 animate-spin"></div>
      </div>
    </div>
  );
}
