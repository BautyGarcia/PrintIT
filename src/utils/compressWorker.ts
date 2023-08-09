import pako from "pako";

interface WorkerData {
  arrayBuffer: ArrayBuffer;
}

self.onmessage = function (e: MessageEvent<WorkerData>) {
  const fileData: ArrayBuffer = e.data.arrayBuffer;
  const compressedData: Uint8Array = pako.deflate(new Uint8Array(fileData), { level: 9 });
  const compressedSize: number = Math.ceil(compressedData.byteLength / 1024 / 1024);

  if (compressedSize > 6) {
    self.postMessage({ error: "File is too large to compress" });
    return;
  }

  // Convert the Uint8Array back to ArrayBuffer
  const resFileArrayBuffer = compressedData.buffer.slice(
    compressedData.byteOffset,
    compressedData.byteOffset + compressedData.byteLength
  );

  // Create a Blob with the correct content type (application/octet-stream)
  const compressedBlob = new Blob([resFileArrayBuffer], {
    type: "application/octet-stream",
  });

  // Send the Blob object back to the main thread
  self.postMessage({ compressedFile: compressedBlob });
};

export default self;
