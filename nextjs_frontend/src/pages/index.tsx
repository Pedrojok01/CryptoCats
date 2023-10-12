import type { NextPage } from "next";

import { Default } from "../components/layouts";
import { Home } from "../components/templates/home";

const HomePage: NextPage = () => {
  return (
    <Default pageName="Home">
      <Home />
    </Default>
  );
};

export default HomePage;
