import { Avatar, Badge, Box, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { DomainList } from "../User/DomainFilter";
import { GenderList } from "../User/GenderFilter";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setTeamMembers } from "../../reducer/Team.reducer";
import { toastSuccess } from "../../utils/toastMessage";

const TeamChip = ({ user }) => {
  const { teamMembers } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const removeMemberFromTeam = () => {
    dispatch(setTeamMembers(teamMembers.filter((m) => m.id !== user.id)));
    toastSuccess("User Removed");
  };

  return (
    <HStack
      border={"1px solid black"}
      gap={5}
      borderRadius={"35px"}
      padding={"5px 10px"}
      maxW={"fit-content"}
    >
      <Avatar src={user.avatar} backgroundColor={"white"} />
      <Box>
        <Text fontWeight="bold">
          {user.first_name} {user.last_name}
          <Badge
            ml="1"
            colorScheme={
              GenderList.find((gender) => gender.value === user.gender)
                ?.colorScheme
            }
          >
            {user.gender}
          </Badge>
        </Text>
        <Text
          fontSize="sm"
          colorScheme={
            DomainList.find((domain) => domain.value === user.domain)
              ?.colorScheme
          }
        >
          {user.domain}
        </Text>
      </Box>
      <IconButton
        // colorScheme='teal'
        aria-label="Call Segun"
        size="sm"
        icon={<CloseIcon />}
        borderRadius={"50%"}
        onClick={removeMemberFromTeam}
      />
    </HStack>
  );
};

export default TeamChip;
