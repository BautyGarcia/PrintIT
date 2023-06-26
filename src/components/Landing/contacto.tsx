import { Group, Button, Autocomplete, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { type FormEventHandler, useState, useRef } from "react";

const Contacto = () => {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number>(-1);
  const largeScreen = useMediaQuery("(min-width: 1300px)");

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => !/^\S+@\S+$/.test(value),
    },
  });

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setError(false);
    setValue(val);
    setEmail(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com", "icloud.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 500);
    }
  };

  return (
    <form
      className={largeScreen ? "w-2/3" : "w-full"}
      onSubmit={form.onSubmit(() => null)}
    >
      <Autocomplete
        {...(error ? { error } : {})}
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        placeholder="Your email"
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
};

export default Contacto;
