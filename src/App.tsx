// Utils
import { AppShell, Skeleton } from "@mantine/core";

// Components
import Map from "./components/Map";
import Header from "./components/Header";

function App() {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="0"
    >
      <Header />
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100vh",
        }}
      >
        <Map />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
