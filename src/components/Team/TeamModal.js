import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { showToastError, toastSuccess } from "../../utils/toastMessage";
import TeamName from "./TeamName";
import { useCreateTeamMutation } from "../../services/Team.api";

const TeamModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [createTeam, createTeamResult] = useCreateTeamMutation();
  const [name, setName] = useState("");

  useEffect(() => {
    const { isLoading, isSuccess, isError, error } = createTeamResult;
    setLoading(isLoading);
    if (isSuccess) {
      toastSuccess("Team Created");
      onClose();
    }
    if (isError) {
      showToastError(error);
    }
  }, [createTeamResult, onClose]);

  const handleCreateTeam = (e) => {
    e.preventDefault();
    createTeam({ name });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateTeam}>
          <ModalContent>
            <ModalHeader>Create Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TeamName name={name} setName={setName} />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                variant="ghost"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button colorScheme="green" isLoading={loading} type="submit">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default TeamModal;
