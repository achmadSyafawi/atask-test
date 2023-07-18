import React from "react";
import { useState } from "react";
import DropdownNav from "./DropdownNav";
import { Button, Container, TextInput, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { postSearch } from "../redux/actions/searchActions";
import { Dispatch } from "redux";

const MainContainer = () => {
  const [user, setUser] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  const handleOnSearch = () => {
    setShowPlaceholder(true);
    dispatch(postSearch({ searchValue: user }));
  };
  return (
    <Container size="xs" px="xs" py={15}>
      <TextInput
        py={15}
        placeholder="Enter Username"
        value={user}
        onChange={(e) => {
          e.preventDefault();
          setShowPlaceholder(false);
          setUser(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOnSearch();
          }
        }}
      />
      <Button
        type="button"
        onClick={(e) => {
          handleOnSearch();
        }}
        fullWidth
      >
        Search
      </Button>
      {showPlaceholder ? (
        <Text
          fz="sm"
          color="grey"
          align="left"
        >{`Showing users for "${user}"`}</Text>
      ) : null}
      <DropdownNav />
    </Container>
  );
};

export default MainContainer;
