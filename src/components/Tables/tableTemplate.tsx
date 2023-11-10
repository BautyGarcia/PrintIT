import { Loader, ScrollArea, Table } from "@mantine/core";

interface TableProps {
    children: React.ReactNode;
    isFetchingData: boolean;
    setScrolled: (scrolled: boolean) => void;
}

const TableTemplate = ({ children, isFetchingData, setScrolled }: TableProps) => {
    return (
        <ScrollArea className='h-full' onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            {
                isFetchingData ? (
                    <div className='flex h-screen w-full items-center justify-center'>
                        <Loader size='xl' />
                    </div>
                ) : (
                    <Table miw={700} verticalSpacing="sm" fontSize="md" horizontalSpacing="xl">
                        {children}
                    </Table>
                )
            }
        </ScrollArea>
    );
}

export default TableTemplate;