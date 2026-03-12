// Utils
import { Flex } from "@mantine/core";

// Hooks
import { useQueryMapState } from "../../../hooks/useQueryMapState";

// Components
import Filter from "./Filter";

// Enums
import { TrailDifficulty, TrailMapSort } from "../../../api/trails/trails.enums";

function Filters() {
  const { difficulty, sort, setDifficulty, setSort } = useQueryMapState();

  return (
    <Flex
      direction="row"
      align="center"
      p="md"
      gap="md"
      style={{
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        borderLeft: "0",
        borderRight: 0,
      }}
    >
      <Filter
        label="Trier par"
        data={Object.entries(TrailMapSort).map(([label, value]) => ({
          label,
          value,
        }))}
        value={sort}
        setValue={setSort}
      />
      <Filter
        label="Difficulté"
        data={Object.values(TrailDifficulty)}
        value={difficulty}
        setValue={setDifficulty}
      />
    </Flex>
  );
}

export default Filters;
