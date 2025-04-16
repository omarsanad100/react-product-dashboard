"use client";
import React, { useState } from "react";
import { Container, VStack, Heading, Box, Button } from "@chakra-ui/react";
import { getBackgroundStyle } from "../components/Navbar";
import { useColorMode } from "../hooks/use-color.js";
import { useProductStore } from "../store/product.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { colorMode } = useColorMode();
  const backgroundStyle = getBackgroundStyle(colorMode);
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success("Product added successfully!");
      setNewProduct({ name: "", price: "", image: "" }); // Clear fields
    } else {
      toast.error(`❌ ${message}`);
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} mt={6}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          style={getBackgroundStyle(colorMode)}
          rounded={"lg"}
          shadow={"md"}
          p={4}
        >
          <VStack spacing={4}>
            <input
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              style={{
                ...backgroundStyle,
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "30rem",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              name="price"
              placeholder="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              style={{
                ...backgroundStyle,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "30rem",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            />
            <input
              name="image"
              placeholder="Image Url"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              style={{
                ...backgroundStyle,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "30rem",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            />
            <Button onClick={handleAddProduct}>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
