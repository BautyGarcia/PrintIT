import { type NextPage } from "next";
import Dashboard from ".";
import MyWorksTable from "~/components/Tables/myWorks";

const MisTrabajos: NextPage = () => {
  return (
    <Dashboard>
      <MyWorksTable/>
    </Dashboard>
  );
};

export default MisTrabajos;