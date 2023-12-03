import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const GenderList = [
  { label: "All", value: "All" },
  { label: "Male", value: "Male", colorScheme: "blue" },
  { label: "Female", value: "Female", colorScheme: "pink" },
  { label: "Genderqueer", value: "Genderqueer", colorScheme: "yellow" },
  { label: "Agender", value: "Agender", colorScheme: "purple" },
  { label: "Non-binary", value: "Non-binary", colorScheme: "teal" },
  { label: "Polygender", value: "Polygender", colorScheme: "blue" },
  { label: "Bigender", value: "Bigender", colorScheme: "yellow" },
  { label: "GenderFluid", value: "GenderFluid", colorScheme: "cyan" },
];

const GenderFilter = ({ gender, setGender }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        background="white"
        style={{padding:'0 10px'}}
        aria-label="Options"
        variant="outline"
        _hover={{ backgroundColor: "white" }}
        _active={{ backgroundColor: "white" }}
      >
        Gender
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          defaultValue={gender}
          onChange={(e) => setGender(e)}
        >
          {GenderList.map((g) => (
            <MenuItemOption key={g.value} value={g.value}>
              {g.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default GenderFilter;
