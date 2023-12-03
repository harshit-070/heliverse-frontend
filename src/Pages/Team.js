import React, { useEffect, useState } from "react";
import CreateTeamButton from "../components/Team/CreateTeamButton";
import TeamModal from "../components/Team/TeamModal";
import {
  Center,
  CircularProgress,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import Pagination from "../components/Navigation/Pagination";
import { useLazyGetTeamListQuery } from "../services/Team.api";
import { showToastError } from "../utils/toastMessage";
import TeamCard from "../components/Team/TeamCard";

const Team = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamList, setTeamList] = useState([]);
  const [loading, setloading] = useState(false);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [getTeamList, getTeamListResult] = useLazyGetTeamListQuery();

  useEffect(() => {
    getTeamList({ page, limit });
  }, [getTeamList, page, limit]);

  useEffect(() => {
    const { isSuccess, isError, error, data, isFetching, isLoading } =
      getTeamListResult;
    setloading(isFetching || isLoading);
    if (isSuccess) {
      setTeamList(data.data);
      setHasNextPage(data.data.length === limit);
    }
    if (isError) {
      showToastError(error);
    }
  }, [getTeamListResult, limit]);

  return (
    <div>
      <TeamModal isOpen={isOpen} onClose={onClose} />
      <CreateTeamButton onOpen={onOpen} />
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
          }}
          gap={5}
        >
          {teamList.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </Grid>
      )}
      <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </div>
  );
};

export default Team;
