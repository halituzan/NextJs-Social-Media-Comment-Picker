import React, { useEffect, useState } from "react";
import {
  AiOutlineSelect,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { en, tr } from "../lang/language";
import {
  dataSelector,
  setComments,
  setNextPageToken,
  setOnlyVideoId,
  setPick,
  setSeconds,
} from "../store/dataSlice";
import axios from "axios";

export default function Winner() {
  const dispatch = useDispatch();
  const [localValue, setLocalValue] = useState("");
  const [filterSameUser, setFilterSameUser] = useState([]);
  const [filterSameUserAndWords, setFilterSameUserAndWords] = useState([]);
  const [filterOnlyWords, setFilterOnlyWords] = useState([]);

  const {
    status,
    reVideoId,
    videoId,
    YTUrl,
    wordFilterStatus,
    wordFilterWord,
    sameFilter,
    comments,
    seconds,
    pick,
    nextPageToken,
  } = useSelector(dataSelector).datas;
  useEffect(() => {
    console.log(comments);

    if (localStorage.getItem("Lang")) {
      setLocalValue(localStorage.getItem("Lang"));
    } else {
      localStorage.setItem("Lang", "English");
      setLocalValue("English");
    }
  }, []);

  const plus = () => {
    if (seconds >= 1 && seconds < 17) {
      dispatch(setSeconds(seconds + 1));
    } else {
      toast.error(localValue === "English" ? en.secondsMax : tr.secondsMax, {
        theme: "dark",
      });
    }
  };

  const minus = () => {
    if (seconds > 1) {
      dispatch(setSeconds(seconds - 1));
    } else {
      toast.error(localValue === "English" ? en.secondsMin : tr.secondsMin, {
        theme: "dark",
      });
    }
  };
  const pickWinner = (arr) => {
    let count = 0;

    const repeat = setInterval(function () {
      if (count < seconds * 10) {
        count = count + 1;
        const randomNumber = () => Math.floor(Math.random() * arr.length);
        const random = randomNumber();
        dispatch(setPick(arr[random]));
      } else {
        clearInterval(repeat);
      }
    }, 100);
  };

  const fetchComments = () => {
    (async () => {
      if (status) {
        const res = await axios(
          YTUrl + `&video_id=${videoId}&key=${process.env.NEXT_PUBLIC_YT_KEY}`
        ).catch((err) => console.log(err));
        const { data } = res;
        if (res.status === 200) {
          toast.success(
            localValue === "English" ? en.dataSuccess : tr.dataSuccess,
            {
              theme: "colored",
            }
          );
        } else {
          toast.error(
            localValue === "English" ? en.serverError : tr.serverError,
            {
              theme: "dark",
            }
          );
        }
        data?.items?.forEach((element) => {
          const { snippet } = element.snippet.topLevelComment;

          dispatch(
            setComments({
              authorDisplayName: snippet.authorDisplayName,
              authorChannelUrl: snippet.authorChannelUrl,
              authorProfileImageUrl: snippet.authorProfileImageUrl,
              textDisplay: snippet.textDisplay,
              textOriginal: snippet.textOriginal,
              updatedAt: snippet.updatedAt,
            })
          );
        });
        dispatch(setNextPageToken(data.nextPageToken));

        while (nextPageToken) {
          const { data } = await axios(
            `${YTUrl}&pageToken=${nextPageToken}&video_id=${videoId}&key=${process.env.NEXT_PUBLIC_YT_KEY}`
          );
          data?.items?.forEach((element) => {
            const { snippet } = element.snippet.topLevelComment;
            dispatch(
              setComments({
                authorDisplayName: snippet.authorDisplayName,
                authorChannelUrl: snippet.authorChannelUrl,
                authorProfileImageUrl: snippet.authorProfileImageUrl,
                textDisplay: snippet.textDisplay,
                textOriginal: snippet.textOriginal,
                updatedAt: snippet.updatedAt,
              })
            );
          });
          dispatch(setNextPageToken(data.nextPageToken));

          if (!nextPageToken) {
            dispatch(setOnlyVideoId());

            break;
          }
          let sameFilterComments = [...comments];

          const FSUser = sameFilterComments?.reduce((unique, o) => {
            // Sadece aynı kullanıcıları filtreliyor
            if (
              !unique.some((obj) => obj.authorChannelUrl === o.authorChannelUrl)
            ) {
              unique.push(o);
            }
            return unique;
          }, []);
          setFilterSameUser(FSUser);

          const FSUserAndWords = filterSameUser.filter(
            // kelimeye ve kullanıcıya göre filtreliyor
            (i) =>
              i.textOriginal
                .toLowerCase()
                .includes(wordFilterWord.toLowerCase()) ||
              i.textOriginal
                .toUpperCase()
                .includes(wordFilterWord.toUpperCase())
          );
          setFilterSameUserAndWords(FSUserAndWords);
          const FOnlyWords = comments.filter(
            // tüm yorumlarda kelimeye göre filtreliyor
            (i) =>
              i.textOriginal
                .toLowerCase()
                .includes(wordFilterWord.toLowerCase()) ||
              i.textOriginal
                .toUpperCase()
                .includes(wordFilterWord.toUpperCase())
          );
          setFilterOnlyWords(FOnlyWords);
        }
      } else {
        toast.error(localValue === "English" ? en.clickError : tr.clickError, {
          theme: "dark",
        });
      }
    })();
  };

  const beforeResult = () => {
    if (!sameFilter && !wordFilterStatus) {
      // Tüm yorumların olduğu bölüm
      return (
        <div className="flex flex-col justify-center align-center">
          {comments.length < 1
            ? ""
            : localValue === "English"
            ? ` There are ${comments.length} comments in total`
            : `Toplamda ${comments.length} yorum var`}
          {comments.length > 0 ? (
            <button
              disabled={comments.length < 1 ? true : false}
              onClick={() => pickWinner(comments)}
              className="mt-12 w-2/4 m-auto p-2 rounded-xl shadow-xl text-white flex justify-center align-center sm:items-stretch bg-green-800"
            >
              <AiOutlineSelect className="text-4xl" />
              <span className="self-center ml-2">
                {localValue === "English" ? en.pickWinner : tr.pickWinner}
              </span>
            </button>
          ) : (
            ""
          )}
          {comments.length > 0 ? (
            <div className="flex flex-col justify-center align-center">
              <div className="flex justify-center mt-2 align-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="text-4xl cursor-pointer"
                />
                <input
                  type="number"
                  placeholder="Seconds"
                  className="w-1/2 mx-2 text-center"
                  value={seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="text-4xl cursor-pointer"
                />
              </div>
              <div className="text-xl font-light pt-4">
                {localValue === "English" ? en.howManyTime : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (sameFilter && !wordFilterStatus) {
      // Aynı kullanıcıların elendiği kelime seçilmemiş durum
      return (
        <div className="flex flex-col justify-center align-center">
          {comments.length < 1
            ? ""
            : localValue === "English"
            ? ` There are ${filterSameUser.length} comments in total`
            : `Toplamda ${filterSameUser.length} yorum var`}
          {filterSameUser.length > 0 ? (
            <button
              disabled={filterSameUser.length < 1 ? true : false}
              onClick={() => pickWinner(filterSameUser)}
              className="mt-12 w-2/4 m-auto p-2 rounded-xl shadow-xl text-white flex justify-center align-center sm:items-stretch bg-green-800"
            >
              <AiOutlineSelect className="text-4xl" />
              <span className="self-center ml-2">
                {localValue === "English" ? en.pickWinner : tr.pickWinner}
              </span>
            </button>
          ) : (
            ""
          )}

          {comments.length > 0 ? (
            <div className="flex flex-col justify-center align-center">
              <div className="flex justify-center mt-2 align-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="text-4xl cursor-pointer"
                />
                <input
                  type="number"
                  placeholder="Seconds"
                  className="w-1/2 mx-2 text-center"
                  value={seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="text-4xl cursor-pointer"
                />
              </div>
              <div className="text-xl font-light pt-4">
                {localValue === "English" ? en.howManyTime : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (!sameFilter && wordFilterStatus) {
      // Bütün kullanıcıların olduğu kelime seçilmiş durum
      return (
        <div className="flex flex-col justify-center align-center">
          {comments.length < 1
            ? ""
            : localValue === "English"
            ? ` There are ${filterOnlyWords.length} comments in total`
            : `Toplamda ${filterOnlyWords.length} yorum var`}
          {filterOnlyWords.length > 0 ? (
            <button
              disabled={filterOnlyWords.length < 1 ? true : false}
              onClick={() => pickWinner(filterOnlyWords)}
              className="mt-12 w-2/4 m-auto p-2 rounded-xl shadow-xl text-white flex justify-center align-center sm:items-stretch bg-green-800"
            >
              <AiOutlineSelect className="text-4xl" />
              <span className="self-center ml-2">
                {localValue === "English" ? en.pickWinner : tr.pickWinner}
              </span>
            </button>
          ) : (
            ""
          )}
          {comments.length > 0 ? (
            <div className="flex flex-col justify-center align-center">
              <div className="flex justify-center mt-2 align-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="text-4xl cursor-pointer"
                />
                <input
                  type="number"
                  placeholder="Seconds"
                  className="w-1/2 mx-2 text-center"
                  value={seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="text-4xl cursor-pointer"
                />
              </div>
              <div className="text-xl font-light pt-4">
                {localValue === "English" ? en.howManyTime : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (sameFilter && wordFilterStatus) {
      // Aynı kullanıcıların elendiği kelime seçilmiş durum
      return (
        <div className="flex flex-col justify-center align-center">
          {filterSameUserAndWords.length < 1
            ? ""
            : localValue === "English"
            ? ` There are ${filterSameUserAndWords.length} comments in total`
            : `Toplamda ${filterSameUserAndWords.length} yorum var`}
          {comments.length > 0 ? (
            <button
              disabled={filterSameUserAndWords.length < 1 ? true : false}
              onClick={() => pickWinner(filterSameUserAndWords)}
              className="mt-12 w-2/4 m-auto p-2 rounded-xl shadow-xl text-white flex justify-center align-center sm:items-stretch bg-green-800"
            >
              <AiOutlineSelect className="text-4xl" />
              <span className="self-center ml-2">
                {localValue === "English" ? en.pickWinner : tr.pickWinner}
              </span>
            </button>
          ) : (
            ""
          )}
          {comments.length > 0 ? (
            <div className="flex flex-col justify-center align-center">
              <div className="flex justify-center mt-2 align-center ">
                <AiOutlineMinusCircle
                  onClick={() => minus()}
                  className="text-4xl cursor-pointer"
                />
                <input
                  type="number"
                  placeholder="Seconds"
                  className="w-1/2 mx-2 text-center"
                  value={seconds}
                  readOnly
                />
                <AiOutlinePlusCircle
                  onClick={() => plus()}
                  className="text-4xl cursor-pointer"
                />
              </div>
              <div className="text-xl font-light pt-4">
                {localValue === "English" ? en.howManyTime : tr.howManyTime}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  };

  return (
    <div
      className={
        status ? "flex flex-col justify-center align-center " : "hidden "
      }
    >
      <div className="flex justify-center">
        <div className="flex flex-col justify-center  py-2 shadow-sm w-3/4 rounded-b-lg bg-gray-500 ">
          {videoId ? (
            <iframe
              className="w-full aspect-video "
              src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
          ) : (
            ""
          )}
          <div className="card-title px-5 py-1 text-center">
            {beforeResult()}
          </div>

          {!comments.length < 1 ? (
            <div className="card-body flex pt-0 flex-col justify-center align-center">
              {pick ? (
                <div className="winner mt-1 flex flex-col justify-center align-center w-full">
                  <p className="winner-text mb-20 self-center">
                    {localValue === "English" ? en.winner : tr.winner}
                  </p>
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = `https://via.placeholder.com/80/BA202E/0000FF?text=${pick?.authorDisplayName[0]}`;
                    }}
                    src={pick?.authorProfileImageUrl}
                    alt="Profile"
                    className="relative winner-img self-center mt-5"
                  />
                  <img
                    src="../assets/tac.png"
                    alt="winner"
                    className="winner-tac self-center"
                  />
                  <div className="flex flex-col justify-center align-center ">
                    <a
                      href={pick?.authorChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-center align-center winner-link self-center"
                    >
                      <h1 className="winner-name">
                        {pick?.authorDisplayName}{" "}
                      </h1>

                      {/* <AiOutlineLink className="fs-2" /> */}
                    </a>
                  </div>
                  <div className="w-1/2 comments text-dark p-2 flex flex-col justify-center align-center mt-2 self-center text-center mb-12">
                    <span className="fw-bold text-decoration-underline">
                      {localValue === "English" ? en.comments : tr.comments}
                    </span>{" "}
                    {pick?.textOriginal}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="card-body">
              <div className="flex flex-col justify-center align-center">
                <h3 className="text-center mt-5 text-white text-4xl">
                  {localValue === "English"
                    ? en.readyComments
                    : tr.readyComments}
                </h3>
                <button
                  onClick={() => fetchComments()}
                  className="my-12 w-2/4 m-auto p-2 rounded-xl shadow-xl text-white flex justify-center align-center sm:items-stretch bg-orange-700 "
                  style={!reVideoId ? { pointerEvents: "none" } : {}}
                  disabled={!videoId ? true : false}
                >
                  {localValue === "English"
                    ? en.fetchComments
                    : tr.fetchComments}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
