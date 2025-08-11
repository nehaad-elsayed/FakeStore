import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="lg" color="gray.600">
          Loading...
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner;
