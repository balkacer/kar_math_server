type TResponseBody<T> = {
  messages: string[];
  data: T | null;
  isSuccess: boolean;
};

export default TResponseBody;
