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

export const DomainList = [
  { label: "All", value: "All" },
  { label: "IT", value: "IT", colorScheme: "telegram" },
  { label: "Sales", value: "Sales", colorScheme: "pink" },
  { label: "UI Designing", value: "UI Designing", colorScheme: "yellow" },
  {
    label: "Business Development",
    value: "Business Development",
    colorScheme: "green",
  },
  { label: "Finance", value: "Finance", colorScheme: "teal" },
  { label: "Management", value: "Management", colorScheme: "blue" },
  { label: "Marketing", value: "Marketing", colorScheme: "cyan" },
];

const DomainFilter = ({ domain, setDomain }) => {
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
        Domain
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          defaultValue={domain}
          onChange={(e) => setDomain(e)}
        >
          {DomainList.map((d) => (
            <MenuItemOption key={d.value} value={d.value}>
              {d.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default DomainFilter;
