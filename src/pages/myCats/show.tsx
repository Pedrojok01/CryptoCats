import { NextPage } from "next";
import { useAccount } from "wagmi";

import { NotConnected } from "../../components/elements";
import { Default } from "../../components/layouts";
import ShowContent from "../../components/templates/myCats/ShowContent";

const Show: NextPage = () => {
    const { isConnected } = useAccount();

    return <Default pageName="Show">{!isConnected ? <NotConnected /> : <ShowContent />}</Default>;
};

export default Show;
