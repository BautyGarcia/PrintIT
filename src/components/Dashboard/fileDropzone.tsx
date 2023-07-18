import { notifications } from "@mantine/notifications";
import { useState, type ChangeEvent, useRef, useEffect } from "react";
import { StlViewer } from "react-stl-viewer";
import sliceSTL from "~/utils/fileSlicer";
import { Text } from "@mantine/core";
import pako from "pako";
import "remixicon/fonts/remixicon.css";
import {
  TextInput,
  SimpleGrid,
  Group,
  Title,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useCounter } from "@mantine/hooks";
import { cn } from "~/utils/util";

const STLDropzone = () => {
  const { colorScheme } = useMantineColorScheme();
  const [isSelected, setIsSelected] = useState(false);
  const [stlViewerURL, setSTLViewerURL] = useState("" as string);
  const [volume, setVolume] = useState(0 as number);
  const [width, setWidth] = useState(0 as number);
  const [height, setHeight] = useState(0 as number);
  const [depth, setDepth] = useState(0 as number);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const files = fileRef.current?.files;
    if (files && files.length > 0) {
      console.log("Se ha cargado un archivo");
    } else {
      console.log("No se ha cargado ningún archivo");
    }
  }, [fileRef.current]);

  const styles = {
    width: "500px",
    height: "500px",
    border: "1px solid black",
  };

  const handleFileSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0 || !files[0]) {
      notifications.show({
        title: "Error",
        message: "No se ha seleccionado ningún archivo",
        color: "red",
        autoClose: 5000,
      });
      return;
    }

    const file = files[0];

    // Check file extension
    const allowedExtensions = ["stl", "STL"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() as string;
    if (!allowedExtensions.includes(fileExtension)) {
      notifications.show({
        title: "Error",
        message: "El archivo seleccionado no es un archivo STL",
        color: "red",
        autoClose: 5000,
      });
      return;
    }

    // Render the file in the stl viewer
    const url = URL.createObjectURL(file);
    setSTLViewerURL(url);
    setIsSelected(true);

    await sliceSTL(url)
      .then((response) => {
        setVolume(response.volume);
        setWidth(response.dimensions.width);
        setHeight(response.dimensions.height);
        setDepth(response.dimensions.depth);
      })
      .catch(() => {
        notifications.show({
          title: "Error",
          message:
            "Ocurrio un error al procesar el archivo, por favor verifique que el archivo no este dañado",
          color: "red",
          autoClose: 5000,
        });
        return;
      });

    // Compress the file
    const fileData = await file.arrayBuffer();
    const compressedData = pako.deflate(fileData, { level: 9 });
    const compressedSize = Math.ceil(compressedData.byteLength / 1024 / 1024);

    // Check if the compressed file is bigger than 6MB
    if (compressedSize > 6) {
      notifications.show({
        title: "Error",
        message:
          "El archivo seleccionado es demasiado grande y no se puede utilizar, por favor seleccione otro archivo",
        color: "red",
        autoClose: 5000,
      });
      return;
    }

    setCompressedFile(
      new File([compressedData], file.name, {
        type: "application/octet-stream",
      })
    );
  };

  const handleDownload = () => {
    if (compressedFile) {
      const url = URL.createObjectURL(compressedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = compressedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearSubmit = () => {
    setIsSelected(false);
    setSTLViewerURL("");
    setVolume(0);
    setWidth(0);
    setHeight(0);
    setDepth(0);
    setCompressedFile(null);
  };

  return (
    <div
      className={cn(
        "mt-28 flex h-96 w-full flex-col items-center justify-center",
        {
          "mt-8 h-[750px]": isSelected,
        }
      )}
    >
      <h1
        className={cn("mb-4", {
          hidden: !isSelected,
        })}
      >
        Estás cada vez más cerca de conseguir tu impresión 3D deseada 
      </h1>
      <h3
        className={cn("mb-4", {
          hidden: !isSelected,
        })}
      >
        Completa el formulario abajo y podrás seguir con el procedimiento
      </h3>
      {isSelected ? (
        <></>
      ) : (
        <>
          <h1>Sube tu archivo y te mostraremos los distintos proovedores</h1>
          <h3 className="mb-12 mt-8">
            Ten en cuenta que solamente soportamos archivos STL de un tamaño
            menor a # MB.
          </h3>
        </>
      )}
      <div
        className={
          colorScheme === "dark"
            ? "flex h-full w-3/5 flex-col items-center justify-center rounded-sm border-2 border-dashed border-blue-600 bg-[#1C2333]"
            : "flex h-full w-3/5 flex-col items-center justify-center rounded-sm border-2 border-dashed border-blue-600 bg-[#FFFFFF]"
        }
      >
        <i
          className={cn(
            ["ri-upload-cloud-fill", "mb-4 text-6xl text-[#3B82F6]"].join(" "),
            {
              hidden: isSelected,
            }
          )}
        ></i>
        <h3
          className={cn("mb-4", {
            hidden: isSelected,
          })}
        >
          Arrastra tu archivo aca
        </h3>
        {!isSelected ? (
          <>
            <input
              className="absolute h-60 w-2/4 bg-opacity-0 text-transparent"
              type="file"
              onChange={handleFileSubmit}
              accept=".stl"
              ref={fileRef}
            />
          </>
        ) : (
          <>
            <div className="ml-8 flex flex-row justify-around">
              <div className="flex flex-col">
                <div className="mt-12 ">
                  <StlViewer url={stlViewerURL} style={styles} orbitControls />
                </div>
                <div className="mt-8 flex gap-2">
                  <Text>Volume: {volume} cm3</Text>
                  <Text>Width: {width} cm</Text>
                  <Text>Height: {height} cm</Text>
                  <Text>Depth: {depth} cm</Text>
                </div>
              </div>

              <div className="justify-cenmter ml-8 mt-12 flex h-full flex-col items-center gap-2">
                <GetInTouchSimple />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <button
                className={
                  colorScheme === "dark"
                    ? "mt-5 rounded-md border border-white bg-[#1c2333] p-2"
                    : "mt-5 rounded-md border border-black bg-[#FFFFFF] p-2"
                }
                onClick={handleDownload}
              >
                Download Compressed File
              </button>
              <button
                className={
                  colorScheme === "dark"
                    ? "mt-5 rounded-md border border-white bg-[#1c2333] p-2"
                    : "mt-5 rounded-md border border-black bg-[#FFFFFF] p-2"
                }
                onClick={clearSubmit}
              >
                Clear
              </button>
            </div>
            <Text className="mb-5 mt-5 flex flex-col">
              NOTE: It might turn as corrupted file when opening.
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

function ContadorImpresiones() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Text>{count}</Text>
      <Group
        className={
          colorScheme === "dark"
            ? "mr-[79px] mt-5 rounded-md border border-white bg-[#1c2333] "
            : "mr-[79px] mt-5 rounded-md border border-black bg-[#FFFFFF] "
        }
        position="left"
      >
        <Button
          className={colorScheme === "dark" ? "text-white" : "text-black"}
          onClick={handlers.increment}
        >
          +
        </Button>
        <Button
          className={colorScheme === "dark" ? "text-white" : "text-black"}
          onClick={handlers.decrement}
        >
          -
        </Button>
        <Button
          className={colorScheme === "dark" ? "text-white" : "text-black"}
          onClick={handlers.reset}
        >
          <i className="ri-loop-left-line"></i>
        </Button>
      </Group>
    </>
  );
}

function GetInTouchSimple() {
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  const form = useForm({
    initialValues: {
      nombre: "",
    },
    validate: {
      nombre: (value) => value.trim().length < 2,
    },
  });

  return (
    <form
      className={largeScreen ? "w-4/6" : "w-full"}
      onSubmit={form.onSubmit(() => null)}
    >
      <Title className="mt-10" order={2} size="h1" weight={200} align="start">
        <p>Tu Impresion 3D</p>
      </Title>

      <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <TextInput
          className="mb-2 w-60"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          name="nombre"
          variant="filled"
          {...form.getInputProps("nombre")}
        />
      </SimpleGrid>
      <h2 className="mb-2">Calidad de la Impresion</h2>
      <h3 className="mb-2">...</h3>
      <h2 className="mb-2">Precio Estimado</h2>
      <h3 className="mb-2">precio...</h3>
      <h2 className="mb-2">Cantidad de Impresiones</h2>
      <ContadorImpresiones />
      <Group position="center" mt="xl">
        <Button
          type="submit"
          size="md"
          className="w-60 rounded-lg bg-blue-500 hover:bg-blue-700"
        >
          Send Stl
        </Button>
      </Group>
    </form>
  );
}

export default STLDropzone;
