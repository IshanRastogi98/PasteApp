import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId"); //from url like http://localhost:5173/?pasteId=123
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const index = pastes.findIndex((item) => pasteId === item._id);
      if (index >= 0) {
        setTitle(pastes[index].title);
        setValue(pastes[index].content);
      }
    }
  }, [pasteId]);

  function createPaste() {
    if (title === "") {
      toast.error("The title cannot be Empty!!");
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      // id will retain or new will be from 36(just random) chars of date
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      // Update
      dispatch(updateToPastes(paste));
    } else {
      // Create
      dispatch(addToPastes(paste));
    }
    // after all
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col px-2 my-5 w-[90%] items-center">
      <div className="flex gap-5 w-[100%] justify-center">
        <input
          type="text"
          placeholder="Enter Title Here ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shrink grow basis-0 px-5 py-2 rounded-3xl max-w-5xl border-2 transition-all font-semibold"
        />

        <button
          onClick={createPaste}
          className="border-2 px-5 py-2 active:border-white transition-all rounded-2xl font-semibold"
        >
          <NavLink to="/pastes">
            {pasteId ? "Update Paste" : "Create My Paste"}
          </NavLink>
        </button>
      </div>

      <div className="flex gap-5 w-[100%] justify-center py-2 px-0 my-5 mx-0 h-[70vh]">
        <textarea
          className="border-2 rounded-xl px-5 py-5 max-w-5xl grow h-[100%] resize-none transition-all"
          value={value}
          placeholder="Enter Content Here ..."
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
