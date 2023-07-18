import { notifications } from "@mantine/notifications";
import { useState, type ChangeEvent, useRef, useEffect } from "react";
import { StlViewer } from "react-stl-viewer";
import sliceSTL from "~/utils/fileSlicer";
import { Text } from "@mantine/core";
import pako from "pako";
import "remixicon/fonts/remixicon.css";
import {
  TextInput,
  Textarea,
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
          "mt-8 h-[800px]": isSelected,
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
        className={cn(
          "flex h-full w-3/5 flex-row items-center justify-center rounded-sm border-2 border-dashed border-blue-600 bg-[#FFFFFF]",
          {
            "flex h-full w-3/5 flex-row items-center justify-center rounded-sm border-2 border-dashed border-blue-600 bg-[#1C2333]":
              colorScheme === "dark",
            "border-none": isSelected,
          }
        )}
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
            <div className="ml-8 flex flex-col justify-center">
              <div className="mt-8 ">
                <StlViewer url={stlViewerURL} style={styles} orbitControls />
              </div>
              <div className="mt-4 flex gap-2">
                <Text>Volume: {volume} cm3</Text>
                <Text>Width: {width} cm</Text>
                <Text>Height: {height} cm</Text>
                <Text>Depth: {depth} cm</Text>
              </div>
              <div className=" mb-4 flex flex-row items-center justify-center gap-4">
                <button
                  className={
                    colorScheme === "dark"
                      ? "mt-5 flex flex-row rounded-md border border-white bg-[#1c2333] p-2"
                      : "mt-5 flex flex-row rounded-md border border-black bg-[#FFFFFF] p-2"
                  }
                  onClick={handleDownload}
                >
                  Download Compressed File
                </button>
                <button
                  className={
                    colorScheme === "dark"
                      ? "mt-5 flex flex-row rounded-md border border-white bg-[#1c2333] p-2"
                      : "mt-5 flex flex-row rounded-md border border-black bg-[#FFFFFF] p-2"
                  }
                  onClick={clearSubmit}
                >
                  Clear
                </button>
              </div>
            </div>
          </>
        )}
        <div
          className={cn(
            "-mt-20 ml-8 mr-8 flex h-[500px] flex-col items-center justify-center rounded-sm border-2 border-black",
            {
              "-mt-20 ml-8 mr-8 flex h-[500px] flex-col items-center justify-center rounded-sm border-2 border-white":
                colorScheme === "dark",
              hidden: !isSelected,
            }
          )}
        >
          <GetInTouchSimple />
        </div>
      </div>
      <Text
        className={cn("mb-5 mt-5 flex flex-col", {
          hidden: !isSelected,
        })}
      >
        NOTE: It might turn as corrupted file when opening.
      </Text>
    </div>
  );
};

function ContadorImpresiones() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Text className="ml-12 items-center justify-center">{count}</Text>
      <Group
        className={
          colorScheme === "dark"
            ? "ml-12 mr-[98px] mt-5 rounded-md border border-white bg-[#1c2333] "
            : "ml-12 mr-[98px] mt-5 rounded-md border border-black bg-[#FFFFFF] "
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
      className={
        largeScreen ? "h-full w-11/12 items-center justify-center" : "w-full"
      }
      onSubmit={form.onSubmit(() => null)}
    >
      <Title className="mt-4" order={2} size="h1" weight={200} align="center">
        <p>Tu Impresion 3D</p>
      </Title>

      <SimpleGrid
        className="items-center justify-center"
        cols={2}
        mt="xl"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <TextInput
          className="mb-2 ml-12 w-60 items-center justify-center"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          name="nombre"
          variant="filled"
          {...form.getInputProps("nombre")}
        />
      </SimpleGrid>
      <div className="mb-2 ml-12 items-center justify-center">
        <h2>Calidad de la Impresion</h2>
        <h3>...</h3>
        <h2>Precio Estimado</h2>
        <h3>precio...</h3>
        <h2>Cantidad de Impresiones</h2>
      </div>
      <ContadorImpresiones />
      <Group position="center" mt="xl">
        <Button
          type="submit"
          size="md"
          className="mb-4 w-60 rounded-lg bg-blue-500 hover:bg-blue-700"
        >
          Send Stl
        </Button>
      </Group>
    </form>
  );
}

export default STLDropzone;
