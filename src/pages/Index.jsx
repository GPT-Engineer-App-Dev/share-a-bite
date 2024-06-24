import React, { useState } from "react";
import { Box, Container, Heading, Text, VStack, Input, Button, SimpleGrid, Image, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaSearch, FaHeart } from "react-icons/fa";
import RecipeSubmissionForm from "../components/RecipeSubmissionForm";

const Index = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Spaghetti Carbonara", image: "https://source.unsplash.com/random/300x200?pasta", likes: 15 },
    { id: 2, title: "Chicken Stir Fry", image: "https://source.unsplash.com/random/300x200?stirfry", likes: 10 },
    { id: 3, title: "Vegetable Curry", image: "https://source.unsplash.com/random/300x200?curry", likes: 8 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = () => {
    // In a real app, this would filter recipes or make an API call
    toast({
      title: "Search functionality",
      description: "This would search for recipes containing: " + searchTerm,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLike = (id) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe
    ));
  };

  const handleRecipeSubmit = (newRecipe) => {
    const id = recipes.length + 1;
    setRecipes([...recipes, { ...newRecipe, id, likes: 0 }]);
    onClose();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">Recipe Sharing</Heading>
        
        <Box>
          <Input 
            placeholder="Search recipes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
          />
          <Button leftIcon={<FaSearch />} colorScheme="teal" size="lg" ml={2} onClick={handleSearch}>
            Search
          </Button>
          <Button colorScheme="green" size="lg" onClick={onOpen} ml={2}>
            Submit Recipe
          </Button>
        </Box>

        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {recipes.map((recipe) => (
            <Box key={recipe.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={recipe.image} alt={recipe.title} />
              <Box p={5}>
                <Heading as="h3" size="md" mb={2}>
                  {recipe.title}
                </Heading>
                <Button 
                  leftIcon={<FaHeart />} 
                  colorScheme="pink" 
                  variant="outline"
                  onClick={() => handleLike(recipe.id)}
                >
                  Like ({recipe.likes})
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a New Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RecipeSubmissionForm onSubmit={handleRecipeSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;