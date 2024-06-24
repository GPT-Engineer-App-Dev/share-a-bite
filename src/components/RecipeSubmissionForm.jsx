import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast } from "@chakra-ui/react";

const RecipeSubmissionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [rating, setRating] = useState(0);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !imageUrl || !ingredients || !instructions || !rating) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSubmit({ title, imageUrl, ingredients, instructions, rating });
    setTitle("");
    setImageUrl("");
    setIngredients("");
    setInstructions("");
    setRating(0);
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
        <FormControl isRequired>
          <FormLabel>Rating</FormLabel>
          <Input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="Rate from 1 to 5"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">Submit Recipe</Button>
      </VStack>
    </Box>
  );
};

export default RecipeSubmissionForm;