import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
    const { data: sessionData } = useSession();
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="text-4xl font-bold text-white">Home Page</h1>
            {sessionData && <p className="text-white">Welcome {sessionData.user?.name}</p>}
        </main>
    );
}

export default Home;