import { InputGroup, Input, Select, Stack } from "@chakra-ui/react";
import React from "react";
import { DomainList } from "./DomainFilter";
import { GenderList } from "./GenderFilter";
import { AvailableList } from "./AvailableFilter";

const UserForm = ({ user, handleChangeField }) => {
  return (
    <div>
      <Stack spacing={4}>
        <InputGroup>
          <Input
            type="text"
            placeholder="First Name"
            value={user.first_name}
            name="first_name"
            onChange={handleChangeField}
            required
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            placeholder="Last name"
            value={user.last_name}
            name="last_name"
            onChange={handleChangeField}
            required
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChangeField}
            required
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            placeholder="image_url"
            value={user.avatar}
            name="avatar"
            onChange={handleChangeField}
            required
          />
        </InputGroup>
        <Select
          placeholder="Domain"
          name="domain"
          onChange={handleChangeField}
          value={user.domain}
        >
          {DomainList.map((domain) =>
            domain.label !== "All" ? (
              <option key={domain.label} value={domain.value}>
                {domain.label}
              </option>
            ) : (
              <React.Fragment key={domain.label} />
            )
          )}
        </Select>
        <Select
          placeholder="Gender"
          name="gender"
          onChange={handleChangeField}
          value={user.gender}
        >
          {GenderList.map((domain) =>
            domain.label !== "All" ? (
              <option key={domain.label} value={domain.value}>
                {domain.label}
              </option>
            ) : (
              <React.Fragment key={domain.label} />
            )
          )}
        </Select>
        <Select
          placeholder="Available"
          name="available"
          onChange={handleChangeField}
          value={user.available ? "true" : "false"}
        >
          {AvailableList.map((domain) =>
            domain.label !== "All" ? (
              <option key={domain.label} value={domain.value}>
                {domain.label}
              </option>
            ) : (
              <React.Fragment key={domain.label} />
            )
          )}
        </Select>
      </Stack>
    </div>
  );
};

export default UserForm;
