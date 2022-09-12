import { toast } from "react-toastify";
import { en, tr } from "../lang/language";

export const checkLink = (video, setVideo, setComments) => {
  const regex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const result = video.link.match(regex);

  if (result) {
    toast.success(
      localStorage.getItem("Lang") === "English"
        ? en.correctConnection
        : tr.correctConnection,
      { theme: "colored" }
    );

    setVideo({
      ...video,
      status: true,
      videoId: result[1],
      reVideoId: result[1],
      pick: null,
    });
    setComments([]);

    return true;
  } else {
    toast.error(
      localStorage.getItem("Lang") === "English"
        ? en.noLinkError
        : tr.noLinkError,
      {
        theme: "dark",
      }
    );
    setVideo({ ...video, status: false, videoId: "" });

    return false;
  }
};
