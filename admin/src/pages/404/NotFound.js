import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 4,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <h1>You are Lost ??</h1>
      <h2>Page not found</h2>
      <Link to={"/"}>
        <button
          style={{
            border: "1px solid teal",
            backgroundColor: "transparent",
            padding: 15,
            cursor: "pointer",
            marginTop: 20,
          }}
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
