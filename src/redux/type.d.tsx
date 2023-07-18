// interface IUsername {
//   //   loading: boolean;
//   //   error: string | boolean;
//   //   data:
//   postSearchLoading: boolean;
//   postSearchData: any;
//   postSearchError: string | boolean;
// }

interface IUsername {
  loading: boolean;
  error: string | boolean;
  data?: any;
}

interface IRepo {
  name: string;
  description: string;
  stargazers_count: number;
}

type UsernameState = {
  postSearchLoading: boolean;
  postSearchData: any;
  postSearchError: string | boolean;
};

type ActionParams = {
  searchValue: String;
};

type UsernameAction = {
  type: string;
  response: IUsername;
};

type DispatchType = (args: UsernameAction) => UsernameAction;

export type {
  UsernameState,
  ActionParams,
  DispatchType,
  UsernameAction,
  IRepo,
};
