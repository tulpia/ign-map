// Utils (external libraries)
import { useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
  Group,
  FileInput,
} from "@mantine/core";
import { IconFile, IconPhoto } from "@tabler/icons-react";

// Types
import { Trail, TrailCreate } from "../../api/trails/trails";
import { TrailDifficulty } from "../../api/trails/trails.enums";

export interface TrailFormProps {
  defaultValues?: TrailCreate | Trail | null;
  onSubmit: (formData: FormData) => void;
  submitLabel?: string;
  isPending?: boolean;
}

export default function TrailForm({
  defaultValues,
  onSubmit,
  submitLabel = "Soumettre",
  isPending = false,
}: TrailFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const isExistingTrail = (v?: TrailCreate | Trail | null): v is Trail =>
    !!v && typeof (v as Trail).id === "number";

  const initialDefaults: TrailCreate = isExistingTrail(defaultValues)
    ? {
        title: defaultValues.title,
        description: defaultValues.description,
        time_to_complete: defaultValues.stats.time_to_complete || 0,
        difficulty: defaultValues.stats.difficulty || TrailDifficulty.Easy,
        trace: undefined as unknown as File,
        images: [],
      }
    : {
        title: (defaultValues as TrailCreate | undefined)?.title || "",
        description: (defaultValues as TrailCreate | undefined)?.description || "",
        time_to_complete: (defaultValues as TrailCreate | undefined)?.time_to_complete || 0,
        difficulty: (defaultValues as TrailCreate | undefined)?.difficulty || TrailDifficulty.Easy,
        trace: undefined as unknown as File,
        images: [],
      };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TrailCreate>({
    defaultValues: initialDefaults,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(
        isExistingTrail(defaultValues)
          ? {
              title: defaultValues.title,
              description: defaultValues.description,
              time_to_complete: defaultValues.stats.time_to_complete || 0,
              difficulty: defaultValues.stats.difficulty || TrailDifficulty.Easy,
              trace: undefined as unknown as File,
              images: [],
            }
          : {
              title: defaultValues.title || "",
              description: defaultValues.description || "",
              time_to_complete: defaultValues.time_to_complete || 0,
              difficulty: defaultValues.difficulty || TrailDifficulty.Easy,
              trace: undefined as unknown as File,
              images: [],
            }
      );
    }
  }, [defaultValues, reset]);

  const internalSubmit: SubmitHandler<TrailCreate> = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("time_to_complete", String(values.time_to_complete));
    formData.append("difficulty", String(values.difficulty));

    if (values.trace) {
      formData.append("trace", values.trace as unknown as Blob);
    }

    const images = Array.isArray(values.images) ? values.images : [];
    images.forEach((file) => {
      formData.append("images[]", file as unknown as Blob);
    });

    onSubmit(formData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(internalSubmit)}>
      <Stack>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              withAsterisk
              value={field.value}
              onChange={(e) => {
                field.onChange(e.currentTarget.value);
              }}
              onBlur={field.onBlur}
              label="Titre"
              error={errors.title && "Veuillez renseigner un titre"}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              withAsterisk
              value={field.value}
              onChange={(e) => {
                field.onChange(e.currentTarget.value);
              }}
              onBlur={field.onBlur}
              label="Description"
              rows={10}
              resize="vertical"
              error={errors.description && "Veuillez renseigner une description"}
            />
          )}
        />

        <Group grow>
          <Controller
            name="time_to_complete"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <NumberInput
                withAsterisk
                value={field.value as unknown as number}
                onChange={(val) => {
                  field.onChange(val);
                }}
                label="Temps de complétion"
                placeholder="Temps (en minutes)"
                error={errors.time_to_complete && "Veuillez renseigner un temps de complétion"}
              />
            )}
          />

          <Controller
            name="difficulty"
            control={control}
            rules={{ required: true }}
            defaultValue={TrailDifficulty.Easy}
            render={({ field }) => (
              <Select
                withAsterisk
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                }}
                label="Difficulté"
                style={{ textTransform: "capitalize" }}
                data={Object.values(TrailDifficulty)}
                error={errors.difficulty && "Veuillez renseigner une difficulté"}
              />
            )}
          />
        </Group>

        <Controller
          name="trace"
          control={control}
          rules={{ required: !isExistingTrail(defaultValues) }}
          render={({ field }) => (
            <FileInput
              withAsterisk={!isExistingTrail(defaultValues)}
              rightSection={<IconFile size={18} />}
              value={field.value as unknown as File}
              onChange={(file) => {
                field.onChange(file);
              }}
              label="Tracé GPX"
              accept=".gpx,application/gpx+xml"
              placeholder=".gpx"
              error={errors.trace && "Veuillez renseigner un tracé"}
            />
          )}
        />

        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <FileInput
              multiple
              rightSection={<IconPhoto size={18} />}
              value={field.value as unknown as File[]}
              onChange={(files) => {
                field.onChange(files);
              }}
              label="Images"
              accept="image/jpeg,image/png"
              placeholder=""
              error={errors.images && "Veuillez renseigner au moins une image"}
            />
          )}
        />

        <Button type="submit" disabled={isPending}>
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
}

// Provide defaultProps for non-required props to satisfy prop-type rule in JS linting
TrailForm.defaultProps = {
  defaultValues: undefined,
  submitLabel: "Soumettre",
  isPending: false,
};
