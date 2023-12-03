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
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateUserMutation,
  useEditUserMutation,
} from "../../services/User.api";
import {
  showToastError,
  toastError,
  toastSuccess,
} from "../../utils/toastMessage";
import { resetEditUser } from "../../reducer/User.reducer";

const UserModal = ({ isOpen, onClose }) => {
  const { editUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(editUser);
  const [loading, setLoading] = useState(false);
  const [createUser, createUserResult] = useCreateUserMutation();
  const [updateUser, updateUserResult] = useEditUserMutation();

  const handleChangeField = (e) => {
    setUser((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setUser(editUser);
  }, [editUser]);

  useEffect(() => {
    const { isLoading, isSuccess, isError, error } = createUserResult;
    setLoading(isLoading);
    if (isSuccess) {
      toastSuccess("User Created");
      setUser({});
      onClose();
    }
    if (isError) {
      showToastError(error);
    }
  }, [createUserResult, onClose]);

  useEffect(() => {
    const { isLoading, isSuccess, isError, error } = updateUserResult;
    setLoading(isLoading);

    if (isSuccess) {
      toastSuccess("User Updated");
      dispatch(resetEditUser());
      onClose();
    }
    if (isError) {
      showToastError(error);
    }
  }, [updateUserResult, dispatch, onClose]);

  const handleSaveOrEdit = (e) => {
    e.preventDefault();
    if (user.first_name.trim() === "") {
      toastError("First Name is Required");
      return;
    }
    if (user.last_name.trim() === "") {
      toastError("Last Name is Required");
      return;
    }
    if (user.email.trim() === "") {
      toastError("Email is Required");
      return;
    }
    if (user.avatar.trim() === "") {
      toastError("Email is Required");
      return;
    }

    if (user.id !== "") {
      updateUser(user);
    } else {
      createUser(user);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSaveOrEdit}>
          <ModalContent>
            <ModalHeader>
              {user.id !== "" ? "Update" : "Create"} User
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UserForm user={user} handleChangeField={handleChangeField} />
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
              <Button
                colorScheme={user.id === "" ? "green" : "blue"}
                isLoading={loading}
                type="submit"
              >
                {user.id !== "" ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default UserModal;
