import { notifications } from "@mantine/notifications";
import { useState, type ChangeEvent } from 'react';
import { StlViewer } from "react-stl-viewer";
import sliceSTL from '~/utils/fileSlicer';
import { Text } from "@mantine/core";
import pako from 'pako';
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
const STLDropzone = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [stlViewerURL, setSTLViewerURL] = useState('' as string);
    const [volume, setVolume] = useState(0 as number);
    const [width, setWidth] = useState(0 as number);
    const [height, setHeight] = useState(0 as number);
    const [depth, setDepth] = useState(0 as number);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);

    const { mutate: testGetSTL } = api.printer.getPrinterForSTL.useMutation();
    const { data: sessionData } = useSession();

    const styles = {
        width: '700px',
        height: '700px',
        border: '1px solid black'
    };

    const handleFileSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0 || !files[0]) {
            notifications.show({
                title: "Error",
                message: "No se ha seleccionado ningún archivo",
                color: "red",
                autoClose: 5000,
            })
            return;
        }

        const file = files[0];

        // Check file extension
        const allowedExtensions = ['stl', "STL"];
        const fileExtension = file.name.split('.').pop()?.toLowerCase() as string;
        if (!allowedExtensions.includes(fileExtension)) {
            notifications.show({
                title: "Error",
                message: "El archivo seleccionado no es un archivo STL",
                color: "red",
                autoClose: 5000,
            })
            return;
        }

        // Render the file in the stl viewer
        const url = URL.createObjectURL(file);
        setSTLViewerURL(url);
        setIsSelected(true);

        await sliceSTL(url).then
            (response => {
                setVolume(response.volume);
                setWidth(response.dimensions.width);
                setHeight(response.dimensions.height);
                setDepth(response.dimensions.depth);
            }).catch(() => {
                notifications.show({
                    title: "Error",
                    message: "Ocurrio un error al procesar el archivo, por favor verifique que el archivo no este dañado",
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
                message: "El archivo seleccionado es demasiado grande y no se puede utilizar, por favor seleccione otro archivo",
                color: "red",
                autoClose: 5000,
            })
            return;
        }

        setCompressedFile(new File([compressedData], file.name, { type: "application/octet-stream" }));
    }

    const handleDownload = () => {
        if (compressedFile) {
            const url = URL.createObjectURL(compressedFile);
            const link = document.createElement('a');
            link.href = url;
            link.download = compressedFile.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const clearSubmit = () => {
        setIsSelected(false);
        setSTLViewerURL('');
        setVolume(0);
        setWidth(0);
        setHeight(0);
        setDepth(0);
        setCompressedFile(null);
    }

    const handleTest = () => {
        testGetSTL({ userEmail: sessionData?.user.email as string, printerType: "FDM", bedSize: "050x050x050" }, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            }
        });
    }

    return (
        <div>
            {
                !isSelected ?
                    <>
                        <input type="file" onChange={handleFileSubmit} accept=".stl" />
                        <button className="bg-[#1c2333] p-2 rounded-md mt-5" onClick={handleTest}>Test</button>
                    </>
                    :

                    <>
                        <StlViewer url={stlViewerURL} style={styles} orbitControls />

                        <Text>Volume: {volume} cm3</Text>
                        <Text>Width: {width} cm</Text>
                        <Text>Height: {height} cm</Text>
                        <Text>Depth: {depth} cm</Text>

                        <button className="bg-[#1c2333] p-2 rounded-md mt-5" onClick={handleDownload}>Download Compressed File</button>
                        <button className="bg-[#1c2333] p-2 rounded-md ml-5" onClick={clearSubmit}>Clear</button>
                        <Text className="mt-5">NOTE: It might turn as corrupted file when opening.</Text>
                    </>
            }
        </div>
    );
}

export default STLDropzone;