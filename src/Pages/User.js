import React, { useEffect, useState, useTransition } from "react";
import { useLazyGetUserListQuery } from "../services/User.api";
import { showToastError } from "../utils/toastMessage";
import UserCard from "../components/User/UserCard";
import Search from "../components/User/Search";
import AvailableFilter from "../components/User/AvailableFilter";
import GenderFilter from "../components/User/GenderFilter";
import DomainFilter from "../components/User/DomainFilter";
import {
  Box,
  Center,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import LimitUserList from "../components/User/LimitUserList";
import Pagination from "../components/Navigation/Pagination";
import AddUserButton from "../components/User/AddUserButton";
import UserModal from "../components/User/UserModal";

export const User = ({ isCreatingTeam }) => {
  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(true);

  // Pagination
  const [limit, setLimit] = useState("20");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  // Filter
  const [domain, setDomain] = useState("All");
  const [gender, setGender] = useState("All");
  const [available, setAvailable] = useState("All");
  const [search, setSearch] = useState("");

  const getQuery = () => {
    let query = { page, limit };
    if (domain !== "All") {
      query = { ...query, domain };
    }
    if (gender !== "All") {
      query = { ...query, gender };
    }
    if (available !== "All") {
      query = { ...query, available };
    }
    if (search !== "") {
      query = { ...query, name: search };
    }
    return query;
  };

  // Handling the User List
  const [userList, setUserList] = useState([]);
  const [getUserList, getUserListResult] = useLazyGetUserListQuery();

  useEffect(() => {
    const query = getQuery();
    getUserList(query);
  }, [page, limit, domain, gender, userList, available]);

  useEffect(() => {
    const { isSuccess, isError, isLoading, isFetching, error, data } =
      getUserListResult;
    setLoading(isLoading || isFetching);

    if (isSuccess) {
      setUserList(data.data);
      setHasNextPage(data.data.length === parseInt(limit));
    }

    if (isError) {
      showToastError(error);
    }
  }, [getUserListResult]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (page !== 1) {
      setPage(1);
    }
    startTransition(() => {
      const query = getQuery();
      getUserList({ query, name: e.target.value });
    });
  };

  // User Add or Edit Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Teams

  return (
    <div>
      <UserModal isOpen={isOpen} onClose={onClose} />
      {isCreatingTeam ? <></> : <AddUserButton onOpen={onOpen} />}
      <Grid
        style={{
          padding: "10px 20px",
          background: "#f8f8fb",
          borderRadius: "15px",
        }}
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(4,1fr)",
          lg: "repeat(7, 1fr)",
        }}
        gap={5}
      >
        <GridItem colSpan={{ base: 1, sm: 4, lg: 3 }}>
          <Search search={search} handleSearchChange={handleSearchChange} />
        </GridItem>
        <AvailableFilter available={available} setAvailable={setAvailable} />
        <GenderFilter gender={gender} setGender={setGender} />
        <DomainFilter domain={domain} setDomain={setDomain} />
        <LimitUserList limit={limit} setLimit={setLimit} />
      </Grid>
      <Box margin={"30px 0"}>
        {loading || isPending ? (
          <Center>
            <CircularProgress isIndeterminate color="blue" />
          </Center>
        ) : (
          <Center>
            <Grid
              templateColumns={{ base: "repeat(1,1fr)", md: "repeat(4, 1fr)" }}
              gap={5}
            >
              {userList.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onOpen={onOpen}
                  isCreatingTeam={isCreatingTeam}
                />
              ))}
            </Grid>
          </Center>
        )}
      </Box>
      <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </div>
  );
};
