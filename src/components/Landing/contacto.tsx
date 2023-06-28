import { Group, Button, Autocomplete, Loader } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type FormEventHandler, useState, useRef } from "react";
import { notifications } from "@mantine/notifications";
const Contacto = () => {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef<number>(-1);
  const largeScreen = useMediaQuery("(min-width: 1300px)");

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsSending(true);

    const regex = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );

    if (!regex.test(email)) {
      setError(true);
      notifications.show({
        title: "Error",
        message: "Por favor ingrese un email valido",
        color: "red",
        autoClose: 5000,
      });
      setIsSending(false);
      return;
    }

    setIsSending(false);
  };

  return (
    <form
      className={largeScreen ? "w-2/3" : "w-full"}
      onSubmit={handleSubmit}
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
          className="w-11/12 rounded-lg bg-blue-500 hover:bg-blue-700"
          loading={isSending}
        >
          Contactate
        </Button>
      </Group>
    </form>
  );
};

export default Contacto;
