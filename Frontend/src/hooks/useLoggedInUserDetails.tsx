import { useCallback, useEffect, useState } from "react";
import { getUserDetailsService } from "../services/user";

function useLoggedInUserDetails() {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userType: "",
    _id: "",
  });

  const getUserLoggedIn = useCallback(async () => {
    const details = await getUserDetailsService();
    setLoggedInUserDetails(details);
  }, []);

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    if (userType !== "") getUserLoggedIn();
  }, []);
  return { loggedInUserDetails };
}

export default useLoggedInUserDetails;
