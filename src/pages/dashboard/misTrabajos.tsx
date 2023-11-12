import { type NextPage } from "next";
import Dashboard from ".";
import PriceNegotiationModal from "~/components/Dashboard/priceNegotiationModal";
import { Button, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import TableTemplate from "~/components/Tables/tableTemplate";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? "#1c2333" : theme.white,
    transition: 'box-shadow 150ms ease',
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const MisTrabajos: NextPage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const { data: worksList, refetch: refetchWorksList, isLoading } = api.work.getMyWorks.useQuery();
  const { mutate: finishWork } = api.work.setWorkToFinished.useMutation();
  const [isFetchingData, setIsFetchingData] = useState(true);
  const { mutate: sendFinishedWorkEmail } = api.email.sendFinishedWorkEmail.useMutation();

  useEffect(() => {
    if (!isLoading) {
      setIsFetchingData(false);
    }
  }, [isLoading]);

  const handleFileDownload = (fileURL: string) => {
    const fileName = fileURL.split('https://storage.googleapis.com/printit-app/')[1];
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = fileName as string;
    downloadLink.click();
  };

  const rows = worksList?.map((work) => (
    <tr key={work.id}>
      <td>{work.name}</td>
      <td>{work.client.name}</td>
      <td>{`$${work.prices[work.prices.length - 1]?.amount as number}`}</td>
      <td>{work.status}</td>
      <td>{work.quality}</td>
      <td>{work.amount}</td>
      <td>{work.notes}</td>
      <td>{work.lastBidder === "CLIENT" ? "Cliente" : "Vos"}</td>
      <td>
        <div className='flex justify-end '>
          {
            work.status === "Negociacion" ?
              <PriceNegotiationModal
                refreshWorks={refetchWorksList}
                workInfo={
                  {
                    id: work.id,
                    lastBidder: work.lastBidder,
                    prices: work.prices,
                    status: work.status,
                  }
                }
              /> :
              work.status === "Imprimiendo" ?
                <Button
                  loading={isUpdating}
                  onClick={() => {
                    setIsUpdating(true);
                    finishWork({ workId: work.id }, {
                      onSuccess: () => {
                        notifications.show({
                          title: "Trabajo finalizado",
                          message: "El trabajo ha sido finalizado correctamente.",
                          color: "green",
                          autoClose: 5000,
                        });
                        sendFinishedWorkEmail({ workId: work.id });
                        setIsUpdating(false);
                        void refetchWorksList();
                      },
                      onError: (error) => {
                        notifications.show({
                          title: "Error",
                          message: error.message,
                          color: "red",
                          autoClose: 5000,
                        });
                        setIsUpdating(false);
                      }
                    })
                  }}
                  className='bg-blue-500 py-2 ml-2 text-white hover:bg-blue-700'
                >
                  Termine de imprimir
                </Button> : <></>
          }
          <Button
            onClick={() => handleFileDownload(work.stlUrl as string)}
            className='bg-blue-500 py-2 ml-2 text-white hover:bg-blue-700'
          >
            Descargar Archivo
          </Button>
        </div>
      </td>
    </tr>
  ));

  const content = (
    <>
      <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
        <tr>
          <th>Nombre</th>
          <th>Cliente</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Calidad</th>
          <th>Cantidad</th>
          <th>Notas</th>
          <th>Ultimo Postor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </>
  );

  return (
    <Dashboard>
      <TableTemplate setScrolled={setScrolled} isFetchingData={isFetchingData}>
        {content}
      </TableTemplate>
    </Dashboard>
  );
};

export default MisTrabajos;