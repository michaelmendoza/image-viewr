
import Graph from "image-nodes";
import ImageFileStore from './image-file-store.js';

class ImageNodeStore {
	
	createGraph(props) {
		this.graph = new Graph('#image-node', props);
		this.graph.setImageLoader(ImageFileStore);
	}

	addNode(nodeType) {
		this.graph.addNode(nodeType);
	}
}

export default new ImageNodeStore();