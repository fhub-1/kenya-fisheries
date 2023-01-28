import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

class FishClassification {
    // load the model
    async loadModel() {
        this.model = await mobilenet.load();
    }

    // classify an image
    async classifyImage(image) {
        const predictions = await this.model.classify(image);
        return predictions;
    }
}

export default FishClassification
