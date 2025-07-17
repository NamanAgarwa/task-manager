import Layout from "../components/Layout";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
