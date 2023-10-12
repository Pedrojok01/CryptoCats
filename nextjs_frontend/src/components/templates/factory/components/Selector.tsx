import type { FC } from "react";

import { Badge, Box } from "@chakra-ui/react";

const Selector: FC<SelectorProps> = ({ action, name, range, idCode, badge }) => {
  return (
    <Box className="form-group" style={{ marginBottom: "0.94rem" }}>
      <label htmlFor="formControlRange" style={{ marginBottom: "0.94rem" }}>
        <b>{name}</b>
        <Badge colorScheme="purple" ml={2}>
          Code: {badge ? badge : idCode}
        </Badge>
      </label>
      <input
        type="range"
        min={range.min}
        max={range.max}
        style={{ width: "100%" }}
        onChange={(e) => action(e.target.value)}
        value={idCode}
      />
    </Box>
  );
};

export default Selector;
