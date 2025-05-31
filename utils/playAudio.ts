export const playAudio = (audio: string) => {
  if (audio === "click") {
    const audioElement = new Audio("/sounds/click.mp3");
    audioElement.play();
  } else if (audio === "success") {
    const audioElement = new Audio("/sounds/success.mp3");
    audioElement.play();
  }
};
