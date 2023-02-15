import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity,SafeAreaView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
 import FishClassification from './lib/FishClassification';

const FishIdentification = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const pickImage = () => {
    const options = {
      title: 'Select Fish Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.uri);
      }
    });
  };

  const identifyFish = async () => {
    if (!image) {
      console.log('Please select an image.');
      return;
    }

    const fishClassification = new FishClassification();
    await fishClassification.loadModel();
    const result = await fishClassification.classifyImage(image);
    setResult(result);
  };

  return (
    <SafeAreaView>
      <View>
        {image && <Image source={{uri: image}} style={{width: '100%', height: 200}} />}
        <TouchableOpacity onPress={pickImage}>
          <Text>Select or Take Photo</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button title="Identify Fish" onPress={identifyFish} />
      </View>
      {result && (
        <View>
          <Text>Fish Name: {result.name}</Text>
          <Text>Fish Family: {result.family}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FishIdentification;
