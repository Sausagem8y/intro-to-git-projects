const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// prompt user to select a media stream.
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {}
}

button.addEventListener("click", async () => {
  //    disables button when clicked
  button.disabled = true;
  // start pic in pic
  await videoElement.requestPictureInPicture();
  // reset button
  button.disabled = false;
});
selectMediaStream();
