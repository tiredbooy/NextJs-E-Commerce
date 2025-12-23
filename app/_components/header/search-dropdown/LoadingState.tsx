import { FaSpinner } from "react-icons/fa";

interface LoadingStateProps {
  loading: boolean;
}

export default function LoadingState({ loading }: LoadingStateProps) {
  if (!loading) return null;

  return (
    <div className="flex items-center justify-center py-6">
      <FaSpinner className="h-5 w-5 animate-spin text-primary mr-2" />
      <span className="text-sm text-muted-foreground">Searching...</span>
    </div>
  );
}