// Providers
import { AuthProvider } from "../auth/AuthProvider";

// Components / inner provider
import { InnerApp } from "./InnerApp";

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
