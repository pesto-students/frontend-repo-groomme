import { useEffect, useState } from "react";

import { validateUserToken } from "../services/authentication";

const useAuth = () => {
  const [auth, setAuth] = useState<{ loggedIn: boolean }>({
    loggedIn: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const result = await validateUserToken();

        if (result.userId) {
          setAuth({ loggedIn: true });
        } else {
          setAuth({ loggedIn: false });
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setAuth({ loggedIn: false });
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  return { ...auth, loading };
};

export default useAuth;
