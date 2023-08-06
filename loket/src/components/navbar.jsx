"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Input } from "@chakra-ui/react";
import Loket from "../assets/loket.png";
import { Search2Icon } from "@chakra-ui/icons";
import { CalendarIcon } from "@chakra-ui/icons";
import { BasicModal } from "./modal";

export default function Navbar({ setSearch }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box>
      <Flex
        width={{ base: "100%", md: "100%" }}
        bg={useColorModeValue("gray.800")}
        minH={"60px"}
        py={{ base: 2 }}
        borderBottom={1}
        borderStyle={"solid"}
        align={"center"}
      >
        a
        <div
          style={{
            width: "50px",
            height: "50px",
            display: "flex",

            alignItems: "center",
          }}
        >
          <img src={Loket} alt="" />
        </div>
        <InputGroup left={"3"} color={"white"} maxWidth={"55%"}>
          <InputLeftElement pointerEvents="none">
            <Search2Icon />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Cari event seru disini "
            onKeyPress={(e) => {
              if (e.key == "Enter") setSearch(e.target.value);
            }}
          />
        </InputGroup>
        <Stack
          flex={{ base: 1, md: "flex" }}
          justify={"flex-end"}
          direction={"row"}
          marginLeft={"20px"}
          spacing={4}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
            }}
          >
            <CalendarIcon onClick={onOpen} />
            <Stack display={{ base: "none", md: "flex" }}>
              <span
                onClick={onOpen}
                style={{ fontSize: "13px", paddingLeft: "5px" }}
              >
                {" "}
                Create event
              </span>
            </Stack>
          </div>
          <Button
            as={"a"}
            fontWeight={600}
            href={"/login"}
            textDecoration={"none"}
            color={"white"}
            bg={"#0049CC"}
          >
            Masuk
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#0049CC"}
            href={"/register"}
            _hover={{
              bg: "white",
            }}
          >
            Daftar
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
      <BasicModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
    </Box>
  );
}
