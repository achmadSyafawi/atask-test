import React, { useEffect } from "react";
import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
  Card,
  Skeleton,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconStarFilled,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { IRepo } from "../redux/type.d";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} 0`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  label: string;
  initiallyOpened?: boolean;
  links?: IRepo[];
  loading: boolean;
}

export function LinksGroup({
  label,
  initiallyOpened,
  links,
  loading,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronDown : IconChevronUp;
  const items = (hasLinks ? links : []).map((link) => (
    <Card
      key={link.name}
      bg={"#d6d7d8"}
      my={10}
      ml={10}
      padding="sm"
      radius="sm"
      withBorder
    >
      <Group position="apart" mb="xs">
        <Text fw={500}>
          {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
        </Text>
        <ThemeIcon size={"md"} variant="default" bg={"#d6d7d86b"}>
          {link.stargazers_count}
          <IconStarFilled />
        </ThemeIcon>
      </Group>
      <Text align="left">{link.description}</Text>
    </Card>
  ));

  console.log("label", label);

  return (
    <>
      <Skeleton visible={loading} mb={5}>
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
          bg={"#d6d7d86b"}
          mb={5}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box ml="md">
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size="1rem"
                stroke={1.5}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === "rtl" ? -180 : 180}deg)`
                    : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
      </Skeleton>
    </>
  );
}

const DropdownNav = () => {
  const [dataUser, setDataUser] = useState([]);
  //   const [showError, setShowError] = useState(false);
  const { postSearchLoading, postSearchData, postSearchError } = useSelector(
    (state: any) => state.searchReducer
  );
  useEffect(() => {
    if (!postSearchLoading && postSearchData) {
      const mutateData = postSearchData.map((item: any) => {
        return {
          label: item.login,
          links: item.links,
        };
      });
      setDataUser(mutateData);
    }
  }, [postSearchLoading]);
  console.log("data redux", postSearchData);
  console.log("data error", postSearchError === false);
  return (
    <Box
      sx={(theme) => ({
        minHeight: rem(220),
        padding: 0,
      })}
    >
      {dataUser.map((item: LinksGroupProps, idx: number) => {
        return <LinksGroup key={idx} {...item} loading={postSearchLoading} />;
      })}
    </Box>
  );
};

export default DropdownNav;
