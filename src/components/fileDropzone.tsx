import { Text } from '@mantine/core';
import { type ChangeEvent } from 'react';
const STLDropzone = () => {

    const handleFileSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0 || !files[0]) {
            console.log('No files selected.');
            return;
        }

        const file = files[0];

        // Check file extension
        const allowedExtensions = ['stl', "STL"];
        const fileExtension = file.name.split('.').pop()?.toLowerCase() as string;
        if (!allowedExtensions.includes(fileExtension)) {
            console.log('Invalid file extension. Only .stl files are allowed.');
            return;
        }

        // Check file size
        const maxSize = 60 * 1024 * 1024; // 60MB
        if (file.size > maxSize) {
            console.log('File size exceeds the allowed limit.');
            return;
        }

        console.log('Uploading file...');
    }


    return (
        <div>
            <Text>Dropzone</Text>
            <input type="file" onChange={handleFileSubmit} />
        </div>
    );
}

export default STLDropzone;