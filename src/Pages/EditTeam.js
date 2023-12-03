import {
  Box,
  Button,
  Center,
  CircularProgress,
  Grid,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TeamChip from "../components/Team/TeamChip";
import { User } from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyGetTeamDetailsQuery,
  useUpdateTeamMutation,
} from "../services/Team.api";
import { useParams } from "react-router-dom";
import { showToastError, toastSuccess } from "../utils/toastMessage";
import { setTeamMembers } from "../reducer/Team.reducer";

const EditTeam = () => {
  const { teamMembers } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [getTeamDetails, getTeamDetailsResult] = useLazyGetTeamDetailsQuery();
  const [updateTeam, updateTeamResult] = useUpdateTeamMutation();
  const { id } = useParams();

  useEffect(() => {
    getTeamDetails(id);
  }, [getTeamDetails, id]);

  useEffect(() => {
    const { isLoading, isUninitialized, isSuccess, isError, error, data } =
      getTeamDetailsResult;
    setLoading(isLoading || isUninitialized);
    if (isError) {
      showToastError(error);
    }
    if (isSuccess) {
      dispatch(setTeamMembers(data.data.users));
    }
  }, [dispatch, getTeamDetailsResult]);

  useEffect(() => {
    const { isSuccess, isLoading, isError, error, data } = updateTeamResult;

    if (isSuccess) {
      toastSuccess("Team Updated");
    }
    if (isError) {
      showToastError(error);
    }
  }, [updateTeamResult]);

  const handleSaveClick = () => {
    updateTeam({ id, userId: teamMembers.map((member) => member.id) });
  };

  return (
    <div>
      <Heading>Selected Members</Heading>
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <>
          <Grid
            marginTop={7}
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={5}
          >
            {teamMembers.map((user) => (
              <TeamChip user={user} key={user.id} />
            ))}
          </Grid>
          <Button
            marginTop={5}
            onClick={handleSaveClick}
            isLoading={updateTeamResult.isLoading}
            colorScheme="green"
          >
            Update
          </Button>
        </>
      )}
      <Box marginTop={5}>
        <Heading marginBottom={5}>Select Members </Heading>
        <User isCreatingTeam={true} />
      </Box>
    </div>
  );
};

export default EditTeam;
