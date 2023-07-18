import axios from "axios";
import { ActionParams, IRepo } from "../type.d";

export const POST_SEARCH = "POST_SEARCH";
export const LINK_REPO = "LINK_REPO";

const timeout = 120000; //milisec

export const postSearch = ({ searchValue }: ActionParams) => {
  const url = `https://api.github.com/search/users?per_page=5&q=${searchValue}&type=user`;

  return (dispatch: any) => {
    dispatch({
      type: POST_SEARCH,
      response: {
        loading: true,
        data: false,
        error: false,
      },
    });

    axios({
      method: "GET",
      url: url,
      timeout: timeout,
    })
      .then((response) => {
        let mutateResponse: any[] = [];
        let responseData = response.data.items;
        if (responseData) {
          responseData.forEach((element: any) => {
            let links: IRepo[] = [];
            axios({ method: "GET", url: element.repos_url })
              .then((repoResponse: any) => {
                repoResponse.data.forEach((repo: IRepo) => {
                  links.push({
                    name: repo.name,
                    description: repo.description,
                    stargazers_count: repo.stargazers_count,
                  });
                });
              })
              .catch((err) => {
                dispatch({
                  type: POST_SEARCH,
                  response: {
                    loading: false,
                    data: false,
                    error: err.message,
                  },
                });
              });
            mutateResponse.push({
              login: element.login,
              links: links,
            });
          });
        }

        dispatch({
          type: POST_SEARCH,
          response: {
            loading: false,
            data: mutateResponse,
            error: mutateResponse.length <= 0 ? "No Data" : false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_SEARCH,
          response: {
            loading: false,
            data: false,
            error: err.message,
          },
        });
      });
  };
};

export const linkRepo = (link: string) => {
  const url = link;
  return (dispatch: any) => {
    dispatch({
      type: LINK_REPO,
      response: {
        loading: true,
        data: false,
        error: false,
      },
    });

    axios({
      method: "GET",
      url: url,
      timeout: timeout,
    })
      .then((response) => {
        dispatch({
          type: LINK_REPO,
          response: {
            loading: false,
            data: response.data.items,
            error: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: LINK_REPO,
          response: {
            loading: false,
            data: false,
            error: err.message,
          },
        });
      });
  };
};
