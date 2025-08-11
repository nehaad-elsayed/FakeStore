import {
  VStack,
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import type { Product } from "../../interfaces/productsInterfaces";
import toast from "react-hot-toast";

export default function AddProduct() {
  const queryClient = useQueryClient();
  const addProduct = async (product: Partial<Product>): Promise<Product> => {
    const response = await axios.post(
      "https://fakestoreapi.com/products",
      product
    );
    return response.data;
  };

  const defaultValues: Partial<Product> = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues,
  });

  function onSuccess(data: Partial<Product>) {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    toast.success(`Product "${data.title}" has been added successfully!`);
    reset();
  } // من باب التنظيم بس فصلنا الفانكشن دي// بقوله هنا لو العمليه نجحت حدثلي اليو اي

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess,
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to add product. Please try again.";
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const onSubmit = (data: Partial<Product>) => {
    mutation.mutate(data);
  };

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  return (
    <Container maxW="container.md" py={8}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Add New Product
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Fill in the details below to add a new product to our store
          </Text>
        </Box>

        {mutation.isError && (
          <Box p={4} bg="red.100" color="red.700" borderRadius="md">
            Failed to add product. Please try again.
          </Box>
        )}

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={6} align="stretch">
            <Box>
              <Text as="label" display="block" mb={2} fontWeight="semibold">
                Product Title *
              </Text>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                type="text"
                placeholder="Enter product title"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: errors.title
                    ? "1px solid #e53e3e"
                    : "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              />
              {errors.title && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.title.message}
                </Text>
              )}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontWeight="semibold">
                Price *
              </Text>
              <input
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0.01,
                    message: "Price must be greater than 0",
                  },
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: errors.price
                    ? "1px solid #e53e3e"
                    : "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              />
              {errors.price && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.price.message}
                </Text>
              )}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontWeight="semibold">
                Description *
              </Text>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                placeholder="Enter product description"
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: errors.description
                    ? "1px solid #e53e3e"
                    : "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "16px",
                  resize: "vertical",
                }}
              />
              {errors.description && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.description.message}
                </Text>
              )}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontWeight="semibold">
                Category *
              </Text>
              <select
                {...register("category", {
                  required: "Category is required",
                })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: errors.category
                    ? "1px solid #e53e3e"
                    : "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.category.message}
                </Text>
              )}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontWeight="semibold">
                Image URL *
              </Text>
              <input
                {...register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message:
                      "Please enter a valid URL starting with http:// or https://",
                  },
                })}
                type="url"
                placeholder="https://example.com/image.jpg"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: errors.image
                    ? "1px solid #e53e3e"
                    : "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              />
              {errors.image && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.image.message}
                </Text>
              )}
            </Box>

            <HStack justify="center" pt={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                disabled={isSubmitting || mutation.isPending}
                minW="200px"
              >
                {isSubmitting || mutation.isPending ? (
                  <HStack>
                    <Spinner size="sm" />
                    <Text>Loading...</Text>
                  </HStack>
                ) : (
                  "Add Product"
                )}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
