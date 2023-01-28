import React, { useState } from 'react';
import { View, Text, Button, ImagePicker, Permissions } from 'react-native';
import FishClassification from "../lib/FishClassification"

const FishClassificationApp = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Function to pick an image
  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  // Function to take a photo
  const takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  // Function to classify the image
  const classify = async () => {
    if (!image) {
      return;
    }

    // Use the FishClassification class from the previous example
    const classifier = new FishClassification();
    await classifier.loadModel();
    const predictions = await classifier.classifyImage(image);
    setPrediction(predictions);
  };

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      {image && (
        <React.Fragment>
          <Text>Selected Image:</Text>
          <Image source={{ uri: image }} />
        </React.Fragment>
      )}
      <Button title="Classify" onPress={classify} />
      {prediction && (
        <Text>
          The model predicted that the fish is of class {prediction[0].className} with a probability of {prediction[0].probability}
        </Text>
      )}
    </View>
  );
};

export default FishClassificationApp;
