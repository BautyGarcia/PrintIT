import { notifications } from "@mantine/notifications";
import { useState, type ChangeEvent } from "react";
import sliceSTL from "~/utils/fileSlicer";
import { NumberInput, SegmentedControl, Skeleton, Text, Textarea, Tooltip } from "@mantine/core";
import "remixicon/fonts/remixicon.css";
import {
  TextInput,
  SimpleGrid,
  Title,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconCloudUpload,
  IconDimensions,
  IconAugmentedReality,
  IconTrash,
  IconInfoCircleFilled
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { cn } from "~/utils/util";
import { StlViewer } from "react-stl-viewer";
import { useSession } from "next-auth/react";
import ChoosePrinterPopup from "./choosePrinterPopup";
import { api } from "~/utils/api";

const loadCompressWorker = () =>
  new Worker(new URL("~/utils/compressWorker", import.meta.url));

const STLDropzone = () => {
  const { colorScheme } = useMantineColorScheme();
  const [amountPrints, setAmountPrints] = useState(1);
  const [printName, setPrintName] = useState("" as string);
  const [printQuality, setPrintQuality] = useState("Media" as string);
  const [printNotes, setPrintNotes] = useState("" as string);
  const [printPrice, setPrintPrice] = useState(0 as number);
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
  const [isFileDisabled, setIsFileDisabled] = useState(false);
  const { data: sessionData } = useSession();
  const { mutate: testFetch } = api.utils.fetchFilamentPrice.useMutation()

  const largeScreen = useMediaQuery("(min-width: 1300px)");

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
      setIsFileDisabled(true);
      return;
    }

    const file = files[0];
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    setFileName(`${(sessionData?.user?.name as string)}-${(file.name).split(".")[0]}-${Date.now()}`.replace(/ /g, "_"));
    setPrintName((file.name).split(".")[0] as string);
    // Check file size
    if (Math.ceil(file.size / 1024 / 1024) > 20) {
      notifications.show({
        title: "Error",
        message: "El archivo seleccionado es demasiado grande",
        color: "red",
        autoClose: 5000,
      });
      setIsFileDisabled(true);
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
      setIsFileDisabled(true);
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
        testFetch({
          printVolume: response.volume,
        }, {
          onSuccess: (data) => {
            setPrintPrice(data);
            setIsSlicing(false);
          },
          onError: (error) => {
            notifications.show({
              title: "Error",
              message: error.message,
              color: "red",
              autoClose: 5000,
            });
            setIsFileDisabled(true);
            setIsSlicing(false);
          }
        })
      })
      .catch(() => {
        notifications.show({
          title: "Error",
          message:
            "Ocurrio un error al procesar el archivo, por favor verifique que el archivo no este dañado",
          color: "red",
          autoClose: 5000,
        });
        setIsFileDisabled(true);
        setIsSlicing(false);
        return;
      });

    
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
        setIsFileDisabled(true);
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
    setIsFileDisabled(false);
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
        className={cn("mb-4 font-semibold", {
          hidden: !isSelected || !largeScreen,
        })}
      >
        Estás cada vez más cerca de conseguir tu impresión 3D
      </h1>
      <h3
        className={cn("mb-4", {
          hidden: !isSelected || !largeScreen,
        })}
      >
        Completa el formulario para poder seguir
      </h3>
      {isSelected ? (
        <></>
      ) : (
        <>
          <h1 className="font-semibold mb-[100px]">Sube tu archivo y te mostraremos los distintos proovedores</h1>
        </>
      )}

      {!isSelected ? (
        <>
          <div
            className={`flex h-full w-3/5 flex-col items-center justify-center p-5 text-center rounded-lg border-2 ${isSelected ? "border-none" : "border-dashed"} border-[#3B81F6] ${colorScheme === "dark" ? "bg-[#1C2333]" : "bg-[#FFFFFF]"}`}
          >
            <IconCloudUpload
              className="text-[#3B81F6] mb-4"
              stroke={1.5}
              size={75}
            />
            <h3
              className="font-semibold text-xl"
            >
              Arrastra tu archivo aca
            </h3>
            <input
              className="absolute h-60 w-2/4 bg-opacity-0 text-transparent"
              type="file"
              onChange={handleFileSubmit}
              accept=".stl"
              id="fileInput"
            />
            <Button
              className="rounded-md mt-5 bg-blue-500 hover:bg-blue-700"
              onClick={() => {
                document.getElementById("fileInput")?.click();
              }}
            >
              Seleccionar Archivo
            </Button>
          </div>
        </>
      ) : (
        <div className={`flex h-full gap-5 bg-[#0E1525] ${largeScreen ? "w-5/6" : "w-full flex-col"}`}>
          <div className={`flex h-full w-full flex-col gap-5`}>
            <div className={`flex h-5/6 w-full ${colorScheme === "dark" ? "bg-[#1C2333]" : "bg-[#FFFFFF]"} rounded-lg`}>
              <div className="w-full h-full p-5">
                <StlViewer url={stlViewerURL} orbitControls className="w-full h-full rounded-lg border-2 border-dashed border-[#3B81F6]" />
              </div>
            </div>
            <div className={`flex w-full justify-between items-center p-5 rounded-lg ${colorScheme === "dark" ? "bg-[#1C2333]" : "bg-[#FFFFFF]"} ${largeScreen ? "h-1/6" : "flex-col gap-1"}`}>
              {
                isSlicing ?
                  <Skeleton height={50} radius="sm" className="mt-3" /> :
                  <>
                    { largeScreen && <IconDimensions size={50} /> }
                    <Text className="font-semibold">Ancho: {width} cm</Text>
                    <Text className="font-semibold">Alto: {height} cm</Text>
                    <Text className="font-semibold">Profundo: {depth} cm</Text>
                    { largeScreen && <IconAugmentedReality size={45}/> }
                    <Text className="font-semibold">Volumen: {volume} cm3</Text>
                  </>
              }
            </div>
          </div>
          <div className={`flex h-full rounded-lg ${colorScheme === "dark" ? "bg-[#1C2333]" : "bg-[#FFFFFF]"} ${largeScreen ? "w-2/5" : "w-full mb-5"}`}>
            <div className="flex h-full w-full flex-col gap-5 p-5 pb-2">
              <Title order={3} className="font-semibold">Tu impresión 3D</Title>
              <SimpleGrid cols={1} spacing="lg" className="flex h-full w-full flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <TextInput
                    label="Nombre del objeto"
                    placeholder="Pisa papeles"
                    onChange={(event) => {
                      setPrintName(event.currentTarget.value);
                    }}
                    value={printName}
                  />
                  <div>
                    <Text size={"sm"} fw={500}>Calidad de Impresion </Text>
                    <SegmentedControl fullWidth size="sm" className="mt-[2px]" radius="md" data={['Baja', 'Media', 'Alta']} onChange={(value) => setPrintQuality(value)} value={printQuality} />
                  </div>
                  <NumberInput
                    variant="filled"
                    label="Cantidad"
                    placeholder="Cantidad de impresiones"
                    onChange={(value) => setAmountPrints(value as number)}
                    defaultValue={1}
                    min={1}
                  />
                  <Textarea
                    label="Notas"
                    placeholder="Es una pieza flexible, color rojo..."
                    onChange={(event) => setPrintNotes(event.currentTarget.value)}
                    value={printNotes}
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      <Text size={"sm"} fw={500}>Precio estimado </Text>
                      <Tooltip position="top" multiline w={220} withArrow label="Este precio es una estimacion automatica de referencia, no tiene porque coincidir con el precio final de la impreison.">
                        <IconInfoCircleFilled className="" size={15} />
                      </Tooltip>
                    </div>
                    {isSlicing ? <Skeleton height={30} radius="sm" className="mt-3" /> : <Text className="text-2xl" fw={700}>${printPrice}</Text>}
                  </div>
                </div>
                <div className="flex w-full gap-2">
                  <div className="w-full">
                    <ChoosePrinterPopup disabled={isFileDisabled} loading={isCompressing || isSlicing ? true : false} fileName={fileName} fileUrl={compressedUrl} fileSize={`${height}x${width}x${depth}`} printName={printName} printAmount={amountPrints} printQuality={printQuality} printPrice={printPrice} printNotes={printNotes} />
                  </div>
                  <Button className="bg-red-600 p-1 hover:bg-red-700 rounded-md" onClick={clearSubmit}><IconTrash /></Button>
                </div>
              </SimpleGrid>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default STLDropzone;