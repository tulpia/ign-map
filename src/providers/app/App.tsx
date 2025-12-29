// Context
import { AuthProvider } from "../auth/AuthProvider";
import { InnerApp } from "./InnerApp";

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
