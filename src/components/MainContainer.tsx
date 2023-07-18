import React, { useEffect } from "react";
import { useState } from "react";
import {
  IconCalendarStats,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import DropdownNav from "./DropdownNav";
import { Button, Container, TextInput, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { postSearch } from "../redux/actions/searchActions";
import { Dispatch } from "redux";

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

const MainContainer = () => {
  const [user, setUser] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const dispatch: Dispatch<any> = useDispatch();

  //   const { postSearchLoading, postSearchData, postSearchError } = useSelector(
  //     (state: any) => state.searchReducer
  //   );
  //   useEffect(() => {
  //     if (!postSearchLoading && postSearchData) {
  //       const mutateData = postSearchData.map((item: any) => {
  //         return {
  //           label: item.login,
  //         };
  //       });
  //       setDataUser(mutateData);
  //     }
  //   }, [postSearchData]);
  return (
    <Container size="xs" px="xs" py={15}>
      <TextInput
        py={15}
        placeholder="Enter Username"
        value={user}
        onChange={(e) => {
          e.preventDefault();
          setUser(e.target.value);
        }}
      />
      <Button
        type="button"
        onClick={(e) => {
          dispatch(postSearch({ searchValue: user }));
        }}
        fullWidth
      >
        Search
      </Button>
      <Text
        fz="sm"
        color="grey"
        align="left"
      >{`Showing users for ${user}`}</Text>
      <DropdownNav />
    </Container>
  );
};

export default MainContainer;
