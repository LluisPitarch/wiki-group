import './result.css';
import { Skeleton } from '@/components/ui/skeleton';

const ResultSkeleton = ({ key }: { key: number }) => {
  return (
    <li key={key} className="result">
      <Skeleton className="h-6 w-[125px] mb-2" />
      <div className="result__description">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </li>
  );
};

export default ResultSkeleton;
