import { type NextPage } from "next";
import Dashboard from ".";
import { Button, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import PriceNegotiationModal from "~/components/Dashboard/priceNegotiationModal";
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

const MisPedidos: NextPage = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const { data: ordersList, refetch: refetchOrdersList, isLoading } = api.work.getMyOrders.useQuery();
  const { mutate: createPreference } = api.utils.createPreference.useMutation();
  const [isFetchingData, setIsFetchingData] = useState(true);

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
                  Pagar
                </Button> :
                <></>
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

export default MisPedidos;
