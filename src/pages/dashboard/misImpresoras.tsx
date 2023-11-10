import { type NextPage } from "next";
import Dashboard from ".";
import TableTemplate from "~/components/Tables/tableTemplate";
import { Button, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import EditPrinterPopup from "~/components/Dashboard/editPrinterPopup";

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

const MisImpresoras: NextPage = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const { data: printersList, refetch: refetchPrintersList, isLoading } = api.printer.getMyPrinters.useQuery();
  const { mutate: deletePrinter } = api.printer.deletePrinter.useMutation();
  const { mutate: switchPrinterState } = api.printer.switchPrinterAvailability.useMutation();
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsFetchingData(false);
    }
  }, [isLoading]);

  const SwitchPrinterState = (id: string) => {
    notifications.show({
      title: "Actualizando estado",
      id: "switchPrinterState",
      message: "Espere por favor",
      autoClose: false,
      loading: true,
      withCloseButton: false,
    });
    switchPrinterState({ printerId: id }, {
      onSuccess: () => {
        notifications.update({
          id: "switchPrinterState",
          title: "Estado cambiado",
          message: "El estado de la impresora ha sido cambiado correctamente.",
          color: "green",
          autoClose: 5000,
        });
        void refetchPrintersList();
      },
      onError: (error) => {
        notifications.update({
          id: "switchPrinterState",
          title: "Error",
          message: error.message,
          color: "red",
          autoClose: 5000,
        });
      }
    })
  }

  const DeletePrinter = (id: string) => {
    notifications.show({
      title: "Eliminando impresora",
      id: "deletePrinter",
      message: "Espere por favor",
      autoClose: false,
      loading: true,
      withCloseButton: false,
    });

    deletePrinter({ printerId: id }, {
      onSuccess: () => {
        notifications.update({
          id: "deletePrinter",
          title: "Impresora eliminada",
          message: "La impresora ha sido eliminada correctamente.",
          color: "green",
          autoClose: 5000,
        });
        void refetchPrintersList();
      },
      onError: (error) => {
        notifications.update({
          id: "deletePrinter",
          title: "Error",
          message: error.message,
          color: "red",
          autoClose: 5000,
        });
      }
    })
  }

  const rows = printersList?.map((printer) => (
    <tr key={printer.id}>
      <td>{printer.brand}</td>
      <td>{printer.model}</td>
      <td>{printer.type}</td>
      <td>{printer.bedSize}</td>
      <td>{printer.isAvailable ? "Habilitada" : "Inhabilitada"}</td>
      <td>
        <div className="flex justify-end">
          <Button
            onClick={() => SwitchPrinterState(printer.id)}
            className='bg-blue-500 py-2 mr-2 text-white hover:bg-blue-700'
          >
            {printer.isAvailable ? "Deshabilitar" : "Rehabilitar"}
          </Button>
          <Button
            onClick={() => DeletePrinter(printer.id)}
            className='bg-blue-500 py-2 mr-2 text-white hover:bg-blue-700'
          >
            Eliminar
          </Button>
          <EditPrinterPopup printerInfo={printer} refreshPrinters={refetchPrintersList} />
        </div>
      </td>
    </tr>
  ));

  const content = (
    <>
      <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Tipo</th>
          <th>Tamaño</th>
          <th>Estado</th>
          <th />
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

export default MisImpresoras;