import {
    Header,
    Group,
    useMantineColorScheme,
    MediaQuery,
} from "@mantine/core";
import { Logo } from "../Logos/logo";
import Link from "next/link";
import SchemeButton from "../Landing/schemeButton";
import UserBox from "../Dashboard/userBox";
import { useSession } from "next-auth/react";

const SettingsHeader: React.FC = () => {
    const { colorScheme } = useMantineColorScheme();
    const { data: sessionData } = useSession();

    return (
        <>
            <Header
                height={60}
                px="md"
                className={
                    colorScheme === "dark" ? "fixed bg-[#1C2333]" : "fixed bg-white"
                }
            >
                <Group position="apart" sx={{ height: "100%" }}>
                    <Link className="flex flex-row items-center gap-2" href="/dashboard/subirArchivo" passHref>
                        <Logo width={40} height={40} />
                    </Link>

                    <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                        <Group>
                            <SchemeButton />
                            <UserBox
                                user={{
                                    name: sessionData?.user.name as string,
                                    image: sessionData?.user.image as string,
                                }}
                            />
                        </Group>
                    </MediaQuery>

                    <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                        <Group>
                            <SchemeButton />
                        </Group>
                    </MediaQuery>
                </Group>
            </Header>
        </>
    );
};

export default SettingsHeader;