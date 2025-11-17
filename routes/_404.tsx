import Layout from "../components/Layout.tsx";

export default function Error404() {
  return (
    <Layout
      title="404 - Page Not Found | OnsLand"
      description="The page you were looking for doesn't exist."
    >
      <div style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
        <h2 style={{ marginBottom: "1rem" }}>Page Not Found</h2>
        <p style={{ marginBottom: "2rem", color: "#666" }}>
          The page you were looking for doesn't exist.
        </p>
        <a href="/" style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          background: "var(--nature-500, #4a7c59)",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px"
        }}>
          Go back home
        </a>
      </div>
    </Layout>
  );
}
