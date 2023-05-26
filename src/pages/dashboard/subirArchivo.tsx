import { type NextPage } from "next";
import Dashboard from ".";
import STLDropzone from "~/components/fileDropzone";

const SubirArchivo: NextPage = () => {

  return (
    <Dashboard>
        <STLDropzone />
    </Dashboard>
  );
};

export default SubirArchivo;
