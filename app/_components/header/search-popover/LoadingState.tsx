import { FaSpinner } from "react-icons/fa";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-6">
      <FaSpinner className="h-5 w-5 animate-spin text-primary mr-2" />
      <span className="text-sm text-muted-foreground">Searching...</span>
    </div>
  );
}