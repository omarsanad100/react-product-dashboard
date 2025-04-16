import React from "react";
import { Link } from "react-router-dom";
import { Container, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { useColorMode } from "../hooks/use-color.js";

// Define gradients theme mode
const gradientDark = "linear-gradient(to right, #141e30, #243b55)";
const gradientLight = "linear-gradient(to right, #ffffff, #f0f0f0)";

// assign and export the style to use it in parent element
export const getBackgroundStyle = (colorMode) => ({
  background: colorMode === "dark" ? gradientDark : gradientLight,
});

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          background={"linear-gradient(to right,#275ac9,#538fc7)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/createPage"}>
            <Button
              style={{
                background: "linear-gradient(to right,#275ac9,#538fc7)",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faSquarePlus} size="lg" />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            <FontAwesomeIcon icon={colorMode === "light" ? faMoon : faSun} />
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
