import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0E1525] from-[#2e026d] to-[#15162c]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Oooops....</h1>
        <h2 className="mt-2 text-xl">That page cannot be found</h2>
        <Link href={"/"} className="mt-4 text-blue-500 hover:underline">
          Go back to the HomePage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
