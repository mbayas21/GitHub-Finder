import { createContext, useReducer } from "react";
import gitHubReducer from "./GitHubReducer";

const GitHubContext = createContext();
const GITHUB_URL = "https://api.github.com";

export const GitHubProvider = ({ children }) => {
  // NO LONGER USING STATE
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(true);

  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(gitHubReducer, initialState);

  const searchUsers = async (text) => {
    //   CODE BELOW IS FOR WHEN WE I WAS USING THE GITHUB TOKEN WITH MY REQUEST
    // const response = await fetch("https://api.github.com/users", {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // });
    setLoading();

    const params = new URLSearchParams({
      q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const {items} = await response.json();

    // I WOULD USE THIS IF I WAS USING STATE
    // setUsers(data);
    // setLoading(false);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Set loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})

  // Clear users from state
  const clearUsers = ()  => dispatch({type: 'CLEAR_USERS'})

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
