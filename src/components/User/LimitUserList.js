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

const GenderList = [
  { label: "20", value: "20" },
  { label: "50", value: "50" },
  { label: "75", value: "75" },
  { label: "100", value: "100" },
];

const LimitUserList = ({ limit, setLimit }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        // rightIcon={<ChevronDownIcon />}
        background="white"
        style={{ padding: "0 10px" }}
        aria-label="Options"
        variant="outline"
        _hover={{ backgroundColor: "white" }}
        _active={{ backgroundColor: "white" }}
      >
        Limit : {limit}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          defaultValue={limit}
          onChange={(e) => setLimit(e)}
        >
          {GenderList.map((p) => (
            <MenuItemOption key={p.value} value={p.value}>
              {p.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LimitUserList;
