import { NextPage } from "next";

import { Default } from "../components/layouts";
import CatFactory from "../components/templates/factory/CatFactory";

const Factory: NextPage = () => {
  return (
    <Default pageName="Factory">
      <CatFactory />
    </Default>
  );
};

export default Factory;
