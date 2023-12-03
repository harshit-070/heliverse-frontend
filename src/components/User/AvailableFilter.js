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

export const AvailableList = [
  { label: "All", value: "All" },
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const AvailableFilter = ({ available, setAvailable }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        style={{padding:'0 10px'}}
        background="white"
        aria-label="Options"
        variant="outline"
        
        _hover={{ backgroundColor: "white" }}
        _active={{ backgroundColor: "white" }}
        
      >
        Available
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          defaultValue={available}
          onChange={(e) => setAvailable(e)}
        >
          {AvailableList.map((a) => (
            <MenuItemOption key={a.value} value={a.value}>
              {a.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default AvailableFilter;
