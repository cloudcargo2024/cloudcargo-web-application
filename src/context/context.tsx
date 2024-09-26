import { createContext } from "react";
const IsLoggedInContext = createContext<
  | {
      loggedIn: boolean;
      setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);
export default IsLoggedInContext;

