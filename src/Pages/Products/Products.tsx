import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import type { Product } from "../../interfaces/productsInterfaces";
import LoadingSpinner from "../../Cmponents/LoadingSpinner/LoadingSpinner";

export default function Products() {
  const [sort, setSort] = useState<string>("default");

  const fetchProducts = (sort: string): Promise<Product[]> => {
    return axios
      .get("https://fakestoreapi.com/products", {
        params: {
          sort,
        },
      })
      .then((res) => res.data);
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", sort],
    queryFn: () => fetchProducts(sort),
    refetchInterval: 120000,
    refetchOnWindowFocus: true,
    staleTime: 10000,
    gcTime: 200000,
  });

  const sortedProducts = products
    ? [...products].sort((a, b) => {
        switch (sort) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "name":
            return a.title.localeCompare(b.title);
          case "rating":
            return b.rating.rate - a.rating.rate;
          default:
            return 0;
        }
      })
    : [];

  if (isLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box p={4} bg="red.100" color="red.700" borderRadius="md">
          Error loading products. Please try again later.
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={10} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4} textAlign="center">
            Our Products
          </Heading>
          <Text fontSize="lg" textAlign="center" color="gray.600">
            Discover amazing products from our collection
          </Text>
        </Box>

        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="semibold">
            {sortedProducts.length} products available
          </Text>
          <select
            value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSort(e.target.value)
            }
            style={{
              width: "200px",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              fontSize: "16px",
            }}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} p={4}>
          {sortedProducts.map((product) => (
            <Box
              key={product.id}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p={6}
              shadow="md"
              _hover={{ shadow: "lg" }}
              transition="all 0.2s"
            >
              <VStack gap={4} align="start" p={4}>
                <Box
                  width="100%"
                  height="200px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.50"
                  borderRadius="md"
                  overflow="hidden"
                  p={4}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <VStack p={4} align="start" gap={3} width="100%">
                  <Badge colorScheme="blue" variant="subtle">
                    {product.category}
                  </Badge>
                  <Heading size="md" lineHeight="1.2">
                    {product.title.length > 50
                      ? product.title.substring(0, 50) + "..."
                      : product.title}
                  </Heading>
                  <Text p={4} color="gray.600" lineHeight="1.4">
                    {product.description.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </Text>
                </VStack>

                <VStack align="start" gap={2} width="100%">
                  <HStack justify="space-between" width="100%">
                    <Text fontSize="xl" fontWeight="bold" color="blue.600">
                      ${product.price}
                    </Text>
                    <Badge colorScheme="green" variant="solid">
                      ⭐ {product.rating.rate}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    {product.rating.count} reviews
                  </Text>
                </VStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
