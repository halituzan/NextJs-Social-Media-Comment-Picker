import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { en, tr } from "../lang/language";
import {
  addLink,
  changeStatus,
  dataSelector,
  sameFilters,
  setComments,
  wordFilters,
  addVideoId,
} from "../store/dataSlice";

const YoutubeUrl = (props) => {
  const [localValue, setLocalValue] = useState("");
  const dispatch = useDispatch();
  const { link, wordFilterStatus, wordFilterWord } =
    useSelector(dataSelector).datas;

  useEffect(() => {
    if (localStorage.getItem("Lang")) {
      setLocalValue(localStorage.getItem("Lang"));
    } else {
      localStorage.setItem("Lang", "English");
      setLocalValue("English");
    }
  }, []);

  const checkLink = (url) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const result = url.match(regex);

    if (result) {
      toast.success(
        localStorage.getItem("Lang") === "English"
          ? en.correctConnection
          : tr.correctConnection,
        { theme: "colored" }
      );
      dispatch(changeStatus(true));
      dispatch(addVideoId(result[1]));

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
      dispatch(changeStatus(false));
      dispatch(addVideoId(""));
      return false;
    }
  };
  console.log(localValue);
  return (
    <div className="flex flex-col justify-center align-center mt-14">
      {/* <div className="logo flex justify-center align-center">
        <div className="flex justify-center">
          <h2 className="">
            <span>Y</span>
            <span>O</span>
            <span>U</span>
            <span>T</span>
            <span>U</span>
            <span>B</span>
            <span>E</span>
          </h2>
          <h2 className="">
            <span>C</span>
            <span>O</span>
            <span>M</span>
            <span>M</span>
            <span>E</span>
            <span>N</span>
            <span>T</span>
          </h2>
          <h2 className="">
            <span>P</span>
            <span>I</span>
            <span>C</span>
            <span>K</span>
            <span>E</span>
            <span>R</span>
          </h2>
        </div>
      </div> */}

      <div className="input-group flex justify-center ">
        <div className="flex flex-col justify-center mt-1 py-2 shadow-sm w-3/4 rounded-t-lg bg-gray-500  ">
          <div className=" flex justify-center mt-1 py-2 w-full">
            <input
              type="text"
              name="price"
              id="price"
              className="pl-2 rounded-l-lg w-9/12"
              placeholder="url"
              value={link}
              onChange={(e) => dispatch(addLink(e.target.value))}
            />

            <button
              className="ms-2 bg-black text-white p-2 rounded-r-lg"
              onClick={() => checkLink(link)}
            >
              {localValue === "English" ? en.selectVideo : tr.selectVideo}
            </button>
          </div>
          <div className="checkbox w-3/4 flex justify-between items-start m-auto mt-1 py-2">
            <div className="checkbox-left checkbox w-3/4 flex flex-col justify-start items-center m-auto mt-1 py-2">
              <div className="sameuser flex justify-center mt-1 py-2 self-start">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                    onChange={(e) => {
                      dispatch(sameFilters(e.target.checked));
                    }}
                  />
                  <span className=" ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {localValue === "English"
                      ? en.filterSameComments
                      : tr.filterSameComments}
                  </span>
                </label>
              </div>
              <div className="sameuser flex justify-center mt-1 py-2 self-start">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                    onChange={(e) => {
                      dispatch(wordFilters(e.target.checked));
                    }}
                  />
                  <span className=" ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {localValue === "English" ? en.filterWords : tr.filterWords}
                  </span>
                </label>
              </div>
            </div>
            {wordFilterStatus ? (
              <div className="sameuser flex justify-center mt-1 py-2 self-start">
                <textarea
                  id="words"
                  name="words"
                  rows="3"
                  cols="50"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  placeholder="Enter Word"
                  value={wordFilterWord}
                  onChange={(e) => dispatch(wordFilters(e.target.value))}
                ></textarea>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeUrl;
