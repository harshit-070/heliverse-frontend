import { Input, InputGroup } from "@chakra-ui/react";
import React from "react";

const TeamName = ({ name, setName }) => {
  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="eg. Team Maverick"
        value={name}
        name="first_name"
        borderColor={"black"}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </InputGroup>
  );
};

export default TeamName;
