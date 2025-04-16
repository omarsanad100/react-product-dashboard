import React, { useState, useEffect } from "react";
import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import CustomModal from "../components/CustomModal";
import { Input, Button, VStack as ModalVStack } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { fetchProducts, products, updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setUpdatedProduct({});
  };

  const handleUpdateProduct = async () => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const { success, message } = await updateProduct(
        selectedProduct._id,
        updatedProduct
      );
      if (success) {
        toast.success("Product updated successfully please refresh page!");
        handleCloseModal(); // Close the modal after a successful update
      } else {
        toast.error(message || "An error occurred while updating the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        {/* Gradient Title */}
        <Text
          fontSize={{ base: 20, sm: 26 }}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          textAlign={"center"}
          background={"linear-gradient(to right,#275ac9,#538fc7)"}
          bgClip={"text"}
        >
          Current Products 🚀
        </Text>

        {/* Product Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => {
            if (!product || !product._id) {
              return null; // Skip invalid products
            }

            return (
              <Box key={product._id} m="6px">
                <ProductCard
                  product={product}
                  onEdit={() => handleOpenModal(product)}
                />
              </Box>
            );
          })}
        </SimpleGrid>

        {/* Fallback for No Products */}
        {(products.length === 0 || !products) && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢
            <Link to={"/CreatePage"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>

      {/* Modal */}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 style={{ marginBottom: "20px" }}>Update Product</h2>
          <ModalVStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name || ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatedProduct.price || ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image || ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
            />
          </ModalVStack>
          <Button colorScheme="blue" onClick={handleUpdateProduct}>
            Update
          </Button>
        </CustomModal>
      )}
    </Container>
  );
};

export default HomePage;
