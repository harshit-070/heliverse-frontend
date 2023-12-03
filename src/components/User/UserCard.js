import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showToastError,
  toastError,
  toastSuccess,
} from "../../utils/toastMessage";
import { setTeamMembers } from "../../reducer/Team.reducer";
import { useDeleteUserMutation } from "../../services/User.api";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Avatar,
  Badge,
  HStack,
  Center,
  Button,
  Box,
  AvatarBadge,
  CircularProgress,
} from "@chakra-ui/react";
import { DomainList } from "./DomainFilter";
import { GenderList } from "./GenderFilter";
import { setEditUser } from "../../reducer/User.reducer";

const UserCard = ({ user, isTeamCard, isCreatingTeam, onOpen }) => {
  const { teamMembers } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deleteUser, deleteUserResult] = useDeleteUserMutation();
  useEffect(() => {
    const { isLoading, isError, isSuccess, error } = deleteUserResult;
    setLoading(isLoading);
    if (isError) {
      showToastError(error);
    }
    if (isSuccess) {
      toastSuccess("User Deleted");
    }
  }, [deleteUserResult]);

  const addMemberInTeam = (newMember) => {
    if (!isCreatingTeam) {
      return;
    }
    if (!newMember.available) {
      toastError("User is Not available");
      return;
    }

    const isDomainAlreadyAdded = teamMembers.find(
      (member) => member.domain === newMember.domain
    );

    if (isDomainAlreadyAdded) {
      toastError("User with this domain is Already in Team");
      return;
    }
    dispatch(setTeamMembers([...teamMembers, newMember]));
  };

  const handleDeleteClick = () => {
    deleteUser({ id: user.id });
  };

  const handleEditClick = () => {
    dispatch(setEditUser(user));
    onOpen();
  };

  if (loading) {
    <Center>
      <CircularProgress isIndeterminate />
    </Center>;
  }

  return (
    <Card
      borderRadius={20}
      size="sm"
      // background={"rgb(248, 248, 251)"}
    >
      <CardBody>
        <Avatar
          size="xl"
          name="Kola Tioluwani"
          src={user.avatar}
          style={{ border: "1px solid black" }}
        >
          <AvatarBadge
            boxSize="1em"
            bg={user.available ? "green.500" : "tomato"}
          />
        </Avatar>
        <Stack mt="6" spacing="3">
          <Center>
            <HStack>
              <Heading size="md">
                {user.first_name} {user.last_name}
              </Heading>
              <span>
                <Badge
                  style={{ fontSize: "10px" }}
                  colorScheme={
                    GenderList.find((gender) => gender.value === user.gender)
                      ?.colorScheme
                  }
                >
                  {user.gender}
                </Badge>
              </span>
            </HStack>
          </Center>
          <span>
            <Badge
              variant="outline"
              colorScheme={
                DomainList.find((domain) => domain.value === user.domain)
                  ?.colorScheme
              }
            >
              {user.domain}
            </Badge>
          </span>
          <Text
            color="blue.600"
            fontSize="sm"
            style={{ cursor: "pointer", color: "#8675eb" }}
          >
            {user.email}
          </Text>
          {isCreatingTeam ? (
            <Button
              colorScheme="green"
              variant="ghost"
              onClick={() => {
                addMemberInTeam(user);
              }}
            >
              Add
            </Button>
          ) : (
            <Box>
              <Button
                colorScheme="yellow"
                variant="ghost"
                onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                variant="ghost"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
