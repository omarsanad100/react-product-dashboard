import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Box, Text, Image, Heading, HStack } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { toast } from "react-toastify";

const ProductCard = ({ product, onEdit }) => {
  if (!product || !product._id) {
    console.error("Invalid product passed to ProductCard:", product);
    return null; // Do not render if product is invalid
  }

  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    try {
      const { success, message } = await deleteProduct(pid);
      if (success) {
        toast.success("Product deleted successfully!");
      } else {
        toast.error(message || "An error occurred while deleting the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      m="3px"
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name || "Unknown Product"}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" mb={4}>
          ${product.price || 0}
        </Text>

        <HStack spacing={2}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={onEdit} // Call the onEdit function passed as a prop
            size="lg"
            cursor="pointer"
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDeleteProduct(product._id)}
            size="lg"
            color="#f07d7d"
            cursor="pointer"
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
