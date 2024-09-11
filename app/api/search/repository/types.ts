type WikiSearchResult = {
  ns: number;
  pageid: number;
  size: number;
  snippet: string;
  timestamp: string;
  title: string;
  wordcount: number;
};

export type WikiResponseSchema = {
  query: {
    searchinfo: {
      totalhits: number;
    };
    search: WikiSearchResult[];
  };
};
