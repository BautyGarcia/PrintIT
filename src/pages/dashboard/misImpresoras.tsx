import { type NextPage } from "next";
import Dashboard from ".";
import MyPrintersTable from "~/components/Tables/myPrinters";

const MisImpresoras: NextPage = () => {
  return (
    <Dashboard>
      <MyPrintersTable/>
    </Dashboard>
  );
};

export default MisImpresoras;