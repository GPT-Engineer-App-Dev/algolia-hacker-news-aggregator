import { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner, Box, Link, Heading } from "@chakra-ui/react";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("https://hn.algolia.com/api/v1/search?query=react");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.hits);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="2xl" color="red.500">Error: {error.message}</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">Hacker News Aggregator</Heading>
        {articles.map(article => (
          <Box key={article.objectID} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Link href={article.url} isExternal>
              <Text fontSize="xl" fontWeight="bold">{article.title}</Text>
            </Link>
            <Text mt={2}>Author: {article.author}</Text>
            <Text>Points: {article.points}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;