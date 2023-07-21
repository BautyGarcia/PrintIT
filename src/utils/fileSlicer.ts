import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
const sliceSTL = async (fileUrl: string) => {
    const geometry = await convertToGeometry(fileUrl);
    const dimensions = getGeometryDimensions(geometry);
    const volume = handleFileSlice(geometry) as number;
    return { dimensions, volume };
}

//Takes a URL and converts it into a Geometry to then manipulate it
const convertToGeometry = (fileUrl: string): Promise<THREE.BufferGeometry> => {
    const loader = new STLLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            fileUrl,
            (geometry: THREE.BufferGeometry) => {
                if (!geometry.isBufferGeometry) {
                    console.log("'geometry' must be an indexed or non-indexed buffer geometry");
                    reject("Invalid geometry");
                } else {
                    resolve(geometry);
                }
            },
            undefined, // onProgress callback not needed
            (error: ErrorEvent) => reject(error)
        );
    });
}

//Take a THREE.JS geometry and returns its volume
const handleFileSlice = (geometry: THREE.BufferGeometry): number | THREE.Vector3 => {
    const isIndexed = geometry.index !== null;
    const position = geometry.attributes.position as THREE.BufferAttribute;
    let sum = 0;
    const p1 = new THREE.Vector3(),
        p2 = new THREE.Vector3(),
        p3 = new THREE.Vector3();
    if (!isIndexed) {
        const faces = position.count / 3;
        for (let i = 0; i < faces; i++) {
            p1.fromBufferAttribute(position, i * 3 + 0);
            p2.fromBufferAttribute(position, i * 3 + 1);
            p3.fromBufferAttribute(position, i * 3 + 2);
            sum += signedVolumeOfTriangle(p1, p2, p3);
        }
    } else {
        const index = geometry.index as THREE.BufferAttribute;
        const faces = index.count / 3;
        for (let i = 0; i < faces; i++) {
            p1.fromBufferAttribute(position, index.array[i * 3 + 0] as number);
            p2.fromBufferAttribute(position, index.array[i * 3 + 1] as number);
            p3.fromBufferAttribute(position, index.array[i * 3 + 2] as number);
            sum += signedVolumeOfTriangle(p1, p2, p3);
        }
    }
    const result = Math.ceil(sum / 1000);
    
    return result;
};


//Complementary function for handleFileSlice function
const signedVolumeOfTriangle = (p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) => {
    return p1.dot(p2.cross(p3)) / 6.0;
}

//Takes a geometry and return its dimensions
const getGeometryDimensions = (geometry: THREE.BufferGeometry): { width: number, height: number, depth: number } => {
    const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));

    const width = Number((boundingBox.max.x - boundingBox.min.x).toFixed(2));
    const height = Number((boundingBox.max.y - boundingBox.min.y).toFixed(2));
    const depth = Number((boundingBox.max.z - boundingBox.min.z).toFixed(2));

    return { width, height, depth };
};

export default sliceSTL;