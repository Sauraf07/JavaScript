import { useEffect, useState } from "react";
import { getProfile } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then(res => setData(res.data))
      .catch(() => {
        alert("Unauthorized");
        navigate("/");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Profile</h2>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button onClick={logout}>Logout</button>
    </div>
  );
}