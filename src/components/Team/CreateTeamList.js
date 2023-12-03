import React from "react";
import UserCard from "../User/UserCard";
import { useSelector } from "react-redux";
import { Center, Grid } from "@chakra-ui/react";
import TeamName from "./TeamName";
import TeamChip from "./TeamChip";

const CreateTeamList = () => {
  const { isCreatingTeam, teamMembers } = useSelector((state) => state.team);

  if (!isCreatingTeam) {
    return <></>;
  }
  if (teamMembers.length === 0) {
    return <div> No Member is added</div>;
  }
  return (
    <>
      <TeamName />
      <Center>
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3, 1fr)" }}
          gap={5}
        >
          {teamMembers.map((user) => (
            <TeamChip key={user.id} user={user} isTeamCard={true} />
          ))}
        </Grid>
      </Center>
    </>
  );
};

export default CreateTeamList;
