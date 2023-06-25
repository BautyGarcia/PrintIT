import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
const Contacto = () => {
  const largeScreen = useMediaQuery("(min-width: 1300px)");

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => !/^\S+@\S+$/.test(value),
    },
  });

  return (
    <form
      className={largeScreen ? "w-2/3" : "w-full"}
      onSubmit={form.onSubmit(() => null)}
    >
      <TextInput
        className="mt-4"
        label="Email"
        placeholder="Ingrese su email"
        name="email"
        variant="filled"
        {...form.getInputProps("email")}
      />
      <Group position="center" mt="xl">
        <Button
          type="submit"
          size="md"
          className="rounded-lg bg-blue-500 hover:bg-blue-700"
        >
          Contactate
        </Button>
      </Group>
    </form>
  );
}

export default Contacto;
