// Utils
import { Select, ComboboxItem } from "@mantine/core";

function Filter<T extends string>({
  label,
  data,
  value,
  setValue,
}: {
  label: string;
  data: (string | ComboboxItem)[];
  value: T | null;
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type, @typescript-eslint/no-explicit-any
  setValue: (value: T | null) => void | Promise<any>;
}) {
  return (
    <Select
      label={label}
      data={data}
      value={value}
      onChange={(val) => setValue(val as T | null)}
    />
  );
}

export default Filter;
