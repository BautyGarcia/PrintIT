import { type NextPage } from "next";
import Dashboard from ".";
import MyOrdersTable from "~/components/Tables/myOrders";

const MisPedidos: NextPage = () => {

  return (
    <Dashboard>
      <MyOrdersTable/>
    </Dashboard>
  );
};

export default MisPedidos;