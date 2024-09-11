import { Result as ResultModel } from '@/app/models/result.model';
import { removeHtmlTags } from '@/app/utils/htmlUtils';

import './result.css';

type Props = {
  result: ResultModel;
};

const Result = ({ result }: Props) => {
  return (
    <li key={result.id} className="result">
      <a href={result.url} target="_blank" rel="noreferrer">
        <h3 className="result__title">{result.title}</h3>
      </a>
      <div className="result__description">
        {removeHtmlTags(result.htmlDescription)}
      </div>
    </li>
  );
};

export default Result;
