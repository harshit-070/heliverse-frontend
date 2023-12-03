import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Avatar,
  Badge,
} from "@chakra-ui/react";

const UseCard = ({user}) => {
  console.log(user)
  const available=false;
  return (
    <Card style={{ borderRadius: "20px", background: "#f8f8fb",position:'relative',width:'fit-content',padding:'20px 0' }}>
    <div style={{position:'absolute',top:'5px',right:'10px'}}>{available?'🟢':'🔴'}</div>
      <CardBody>
        <Avatar
          size="xl"
          name="Kola Tioluwani"
          src="https://bit.ly/tioluwani-kolawole"
        />{" "}
        <Stack mt="6" spacing="3">
          <div style={{ display: "flex", gap: "5px" }}>
            <Heading size="md">Shivam Kumar</Heading>
            <span>
              <Badge style={{fontSize:'10px'}}>male</Badge>
            </span>
          </div>
          <span>
            <Badge variant="outline" colorScheme="green">
              Default
            </Badge>
          </span>
          <Text color="blue.600" fontSize="sm" style={{cursor:'pointer',color:'#8675eb'}}>
            shivamaakumar@gmail.com
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UseCard;
