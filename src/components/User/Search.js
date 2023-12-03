import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import React from "react";
import { Search2Icon } from "@chakra-ui/icons";

const Search = ({ search, handleSearchChange }) => {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="black" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="eg. Jon Doe"
          borderColor={"black"}
          value={search}
          onChange={handleSearchChange}
          backgroundColor={"white"}
        />
      </InputGroup>
    </Box>
  );
};

export default Search;
