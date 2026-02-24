import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const validate = async () => {
      try {
        await api.get("users/me/");
        if (isMounted) {
          setIsAllowed(true);
        }
      } catch {
        if (isMounted) {
          setIsAllowed(false);
        }
      }
    };

    void validate();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAllowed === null) {
    return (
      <p className="text-center mb-8 text-xl lg:text-normal">
        Verification de session...
      </p>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
