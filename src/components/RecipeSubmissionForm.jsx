import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast } from "@chakra-ui/react";

const RecipeSubmissionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !imageUrl || !ingredients || !instructions) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSubmit({ title, imageUrl, ingredients, instructions });
    setTitle("");
    setImageUrl("");
    setIngredients("");
    setInstructions("");
    toast({
      title: "Recipe submitted",
      description: "Your recipe has been successfully added",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Recipe Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter recipe title" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Image URL</FormLabel>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Enter image URL" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Ingredients</FormLabel>
          <Textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Enter ingredients (one per line)" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Instructions</FormLabel>
          <Textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Enter cooking instructions" />
        </FormControl>
        <Button type="submit" colorScheme="teal">Submit Recipe</Button>
      </VStack>
    </Box>
  );
};

export default RecipeSubmissionForm;