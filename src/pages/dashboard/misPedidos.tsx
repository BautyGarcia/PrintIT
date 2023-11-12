import { type NextPage } from "next";
import Dashboard from ".";
import { Button, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import PriceNegotiationModal from "~/components/Dashboard/priceNegotiationModal";
import TableTemplate from "~/components/Tables/tableTemplate";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import SellerInformationModal from "~/components/Dashboard/sellerInformationModal";

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

const MisPedidos: NextPage = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: ordersList, refetch: refetchOrdersList, isLoading } = api.work.getMyOrders.useQuery();
  const { mutate: createPreference } = api.utils.createPreference.useMutation();
  const { mutate: setWorkPaid } = api.work.setWorkToPrinting.useMutation();
  const { mutate: sendPaymentEmail } = api.email.sendPaymentEmail.useMutation();
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const preferenceId = urlParams.get("preference_id");
    
    if (status) setIsUpdating(true);

    if (status === "approved") {
      setWorkPaid({
        preferenceId: preferenceId as string,
      }, {
        onSuccess: (data) => {
          notifications.show({
            title: "Pago aprobado!",
            message: "El pago fue aprobado.",
            color: "green",
            autoClose: 5000,
          });
          sendPaymentEmail({ workId: data.id })
          setIsUpdating(false);
          void refetchOrdersList();
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
    } else if (status === "failure") {
      notifications.show({
        title: "Pago rechazado!",
        message: "El pago fue rechazado.",
        color: "red",
        autoClose: 5000,
      });
      setIsUpdating(false);
    }
  }, [setWorkPaid, refetchOrdersList, sendPaymentEmail]);

  useEffect(() => {
    if (!isLoading) {
      setIsFetchingData(false);
    }
  }, [isLoading]);

  const rows = ordersList?.map((order) => (
    <tr key={order.id}>
      <td>{order.name}</td>
      <td>{order.worker.name}</td>
      <td>{`$${order.prices[order.prices.length - 1]?.amount as number}`}</td>
      <td>{order.status}</td>
      <td>{order.quality}</td>
      <td>{order.amount}</td>
      <td>{order.notes}</td>
      <td>{order.lastBidder === "CLIENT" ? "Cliente" : "Vendedor"}</td>
      <td>
        <div className='flex justify-end'>
          {
            order.status === "Negociacion" ?
              <PriceNegotiationModal
                refreshWorks={refetchOrdersList}
                workInfo={
                  {
                    id: order.id,
                    lastBidder: order.lastBidder,
                    prices: order.prices,
                    status: order.status,
                  }
                }
              /> :
              order.status === "Pagando" ?
                <Button
                  className='bg-blue-500 py-2 ml-2 text-white hover:bg-blue-700'
                  loading={isUpdating}
                  onClick={() => {
                    createPreference({
                      id: order.id,
                      price: order.prices[order.prices.length - 1]?.amount as number,
                      quantity: order.amount,
                    }, {
                      onSuccess: (data) => {
                        void import("@mercadopago/sdk-react").then(({ initMercadoPago }) => {
                          initMercadoPago(data.mp_token as string);
                        });
                        void window.open(data.redirectURL, "_blank");
                      },
                      onError: (error) => {
                        notifications.show({
                          title: "Error",
                          message: error.message,
                          color: "red",
                          autoClose: 5000,
                        });
                      }
                    })
                  }}
                >
                  { isUpdating ? "Verificando Pago" : "Pagar" }
                </Button> :
                order.status === "Imprimiendo" ?
                  <SellerInformationModal
                    imageUrl={order.worker.image || ""}
                    username={order.worker.name}
                    email={order.worker.email}
                  /> : <></>
          }
        </div>
      </td>
    </tr>
  ));

  const content = (
    <>
      <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
        <tr>
          <th>Nombre</th>
          <th>Vendedor</th>
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

export default MisPedidos;
