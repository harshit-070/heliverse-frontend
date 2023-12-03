import { Box, Button, Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useDeleteTeamMutation } from "../../services/Team.api";
import { showToastError, toastSuccess } from "../../utils/toastMessage";

const TeamCard = ({ team }) => {
  const [deleteTeam, deleteTeamResult] = useDeleteTeamMutation();
  const [loading, setLoading] = useState(false);
  const handleDeleteClick = () => {
    deleteTeam(team.id);
  };

  useEffect(() => {
    const { isLoading, isSuccess, isError, error } = deleteTeamResult;
    setLoading(isLoading);
    if (isSuccess) {
      toastSuccess("Team Deleted");
    }

    if (isError) {
      showToastError(error);
    }
  }, [deleteTeamResult]);

  const navigate = useNavigate();

  return (
    <Card
      borderRadius={20}
      size="sm"
      // background={"rgb(248, 248, 251)"}
    >
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{team.name}</Heading>

          <Box>
            <Button
              colorScheme="yellow"
              variant="ghost"
              onClick={() => {
                navigate(routes.editTeam.redirect(team.id));
              }}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              variant="ghost"
              onClick={handleDeleteClick}
              isLoading={loading}
            >
              Delete
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TeamCard;
