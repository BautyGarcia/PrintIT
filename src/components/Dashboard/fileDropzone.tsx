import { notifications } from "@mantine/notifications";
import { useState, type ChangeEvent } from "react";
import sliceSTL from "~/utils/fileSlicer";
import { Loader, Text } from "@mantine/core";
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
import { StlViewer } from "react-stl-viewer";
import { useSession } from "next-auth/react";
import ChoosePrinterPopup from "./choosePrinterPopup";

const loadCompressWorker = () =>
  new Worker(new URL("~/utils/compressWorker", import.meta.url));

const STLDropzone = () => {
  const { colorScheme } = useMantineColorScheme();
  const [isSelected, setIsSelected] = useState(false);
  const [isSlicing, setIsSlicing] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [stlViewerURL, setSTLViewerURL] = useState("" as string);
  const [volume, setVolume] = useState(0 as number);
  const [width, setWidth] = useState(0 as number);
  const [height, setHeight] = useState(0 as number);
  const [depth, setDepth] = useState(0 as number);
  const [compressedUrl, setCompressedUrl] = useState("" as string);
  const [fileName, setFileName] = useState("" as string);
  const { data: sessionData } = useSession();

  const largeScreen = useMediaQuery("(min-width: 1300px)");
  const form = useForm({
    initialValues: {
      nombre: "",
    },
    validate: {
      nombre: (value) => value.trim().length < 2,
    },
  });

  const handleFileSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsSlicing(true);
    setIsCompressing(true);
    const files = event.target.files;
    
    // Check if files were selected
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
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    setFileName(`${(sessionData?.user?.name as string)}-${(file.name).split(".")[0]}-${Date.now()}`.replace(/ /g, "_"));

    // Check file size
    if (Math.ceil(file.size / 1024 / 1024) > 20) {
      notifications.show({
        title: "Error",
        message: "El archivo seleccionado es demasiado grande",
        color: "red",
        autoClose: 5000,
      });
      return;
    }

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

    setIsSlicing(false);
    // Compress the file
    const fileData = await file.arrayBuffer();

    const worker = loadCompressWorker();
    
    worker.onmessage = function (e: MessageEvent<{ compressedFile: File | null; error?: string }>) {
      const { compressedFile, error } = e.data;

      if (error) {
        notifications.show({
          title: "Error",
          message: error,
          color: "red",
          autoClose: 5000,
        });
      } else {
        setCompressedUrl(URL.createObjectURL(compressedFile as File));
      }

      setIsCompressing(false);
      worker.terminate();
    };

    worker.postMessage({ arrayBuffer: fileData });
  };

  const clearSubmit = () => {
    setIsSelected(false);
    setSTLViewerURL("");
    setVolume(0);
    setWidth(0);
    setHeight(0);
    setDepth(0);
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
            />
          </>
        ) : (
          <>
            <div className="ml-8 flex flex-col justify-center">
              <div className="mt-8 ">
                <StlViewer url={stlViewerURL} orbitControls />
              </div>
              <div className="mt-4 flex gap-2">
                {
                  isSlicing ? (
                    <Loader />
                  ) :
                    (
                      <>
                        <Text>Volume: {volume} cm3</Text>
                        <Text>Width: {width} cm</Text>
                        <Text>Height: {height} cm</Text>
                        <Text>Depth: {depth} cm</Text>
                      </>
                    )
                }
              </div>
              <div className=" mb-4 flex flex-row items-center justify-center gap-4">
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
              <ChoosePrinterPopup loading={isCompressing || isSlicing ? true : false} fileName={fileName} fileUrl={compressedUrl} fileSize={`${height}x${width}x${depth}`}/>
            </Group>
          </form>
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
            ? "ml-12 mr-[88px] mt-5 rounded-md border border-white bg-[#1c2333] "
            : "ml-12 mr-[88px] mt-5 rounded-md border border-black bg-[#FFFFFF] "
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

export default STLDropzone;
