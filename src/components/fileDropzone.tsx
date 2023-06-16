import { notifications } from "@mantine/notifications";
import { useState, type ChangeEvent } from 'react';
import { StlViewer } from "react-stl-viewer";
import sliceSTL from '~/utils/fileSlicer';
import { Text } from "@mantine/core";
const STLDropzone = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [stlViewerURL, setSTLViewerURL] = useState('' as string);
    const [volume, setVolume] = useState(0 as number);
    const [width, setWidth] = useState(0 as number);
    const [height, setHeight] = useState(0 as number);
    const [depth, setDepth] = useState(0 as number);

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

        console.log('File acepted.')
        const url = URL.createObjectURL(file);

        await sliceSTL(url).then
            (response => {
                //The file could be sliced, so set the url
                setSTLViewerURL(url);

                //Set the stats values
                setVolume(response.volume);
                setWidth(response.dimensions.width);
                setHeight(response.dimensions.height);
                setDepth(response.dimensions.depth);

                //Finally set the state to true so the stl viewer is rendered
                setIsSelected(true);
            }).catch(err => {
                console.log(err);
                return;
            });
    }


    return (
        <div>
            {
                !isSelected ?
                    <input type="file" onChange={handleFileSubmit} accept=".stl"/>

                    :

                    <>
                        <StlViewer url={stlViewerURL} style={styles} orbitControls/>
                        <Text>Volume: {volume} cm3</Text>
                        <Text>Width: {width} cm</Text>
                        <Text>Height: {height} cm</Text>
                        <Text>Depth: {depth} cm</Text>
                    </>
            }
        </div>
    );
}

export default STLDropzone;