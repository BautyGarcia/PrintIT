import { useRef } from 'react';
import { Text, Group, Button, createStyles, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: rem(30),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    dropzone: {
        borderWidth: rem(1),
        paddingBottom: rem(50),
        width: '50%',
        margin: '0 auto',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
}));

const STLDropzone = () => {
    const { theme } = useStyles();
    const openRef = useRef<() => void>(null);

    return (
        <div className='relative mb-14 flex flex-col items-center'>
            <h2 className="text-4xl mb-14 mt-14 text-center">Sube tu archivo y te mostraremos los distintos proveedores</h2>
            <p className="text-xl text-gray-500 mb-14 text-center">Ten en cuenta que solamente soportamos archivos STL de un tamaño menor a 30 MB.</p>

            <Dropzone
                openRef={openRef}
                onDrop={() => console.log('dropped')}
                className="border-1 pb-10 w-1/2 mx-auto"
                radius="md"
                accept={[MIME_TYPES.pdf]}
                maxSize={30 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <Dropzone.Accept>
                            <IconDownload
                                size={rem(50)}
                                color="#3B82F6"
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload
                                size={rem(50)}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                        <Dropzone.Idle>Upload resume</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                        are less than 30mb in size.
                    </Text>
                </div>
            </Dropzone>

            <Button
                className="absolute w-40 left-1/2 transform -translate-x-1/2 -bottom-5 bg-[#3B82F6]"
                size="md"
                radius="xl"
                onClick={() => openRef.current?.()}
            >
                Select files
            </Button>
        </div>
    );
}

export default STLDropzone;