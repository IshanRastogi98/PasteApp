import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const { id } = useParams();
  // console.log("id ", index);
  const index = pastes.findIndex((item) => id === item._id);
  useEffect(() => {
    if (index >= 0) {
      setTitle(pastes[index].title);
      setValue(pastes[index].content);
    }
  }, [id]);
  function handleDelete(paste) {
    dispatch(removeFromPastes(paste));
  }

  return (
    <div className="flex flex-col px-2 my-5 w-[90%] items-center">
      <div className="flex gap-5 w-[100%] justify-center">
        <input
          disabled={true}
          type="text"
          placeholder="Enter Title Here ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shrink grow basis-0 px-5 py-2 rounded-3xl max-w-3xl border-2 transition-all font-semibold"
        />

        <div className="flex justify-end items-center gap-2">
          <button
            data-tooltip-id="editTip"
            data-tooltip-content="Edit"
            className="active:border-white w-12 h-12 pl-1 border-2 rounded-lg flex justify-center items-center 
                     hover:text-blue-300 hover:bg-slate-600 transition-colors duration-300"
          >
            <NavLink to={`../?pasteId=${id}`}>
              <i className="fas fa-pen mr-1"></i>
            </NavLink>
          </button>
          <Tooltip id="editTip" place="top" />

          <button
            onClick={() => {
              handleDelete(pastes[index]);
            }}
            data-tooltip-id="deleteTip"
            data-tooltip-content="Delete"
            className="active:border-white w-12 h-12 pl-1 border-2 rounded-lg flex justify-center items-center 
                     hover:text-blue-300 hover:bg-slate-600 transition-colors duration-300"
          >
            <NavLink to={`../`}>
              <i className="fas fa-trash mr-1"></i>
            </NavLink>
          </button>
          <Tooltip id="deleteTip" place="top" />

          <button
            onClick={async () => {
              await navigator
                .share({
                  title: title,
                  text: `${title}:\n${value}`,
                })
                .then(() => toast.success("Shared Successfully!!"))
                .catch("Sharing Not Supported in this Browser");
            }}
            data-tooltip-id="shareTip"
            data-tooltip-content="Share"
            className="active:border-white w-12 h-12 pl-1 border-2 rounded-lg flex justify-center items-center 
                     hover:text-blue-300 hover:bg-slate-600 transition-colors duration-300"
          >
            <i className="fas fa-share-alt mr-1"></i>
          </button>
          <Tooltip id="shareTip" place="top" />

          <button
            onClick={() => {
              navigator.clipboard.writeText(`${title}:\n${value}`);
              toast.success("Copied to Clipboard");
            }}
            data-tooltip-id="copyTip"
            data-tooltip-content="Copy"
            className="active:border-white w-12 h-12 pl-1 border-2 rounded-lg flex justify-center items-center 
                     hover:text-blue-300 hover:bg-slate-600 transition-colors duration-300"
          >
            <i className="fas fa-copy mr-1"></i>
          </button>
          <Tooltip id="copyTip" place="top" />
        </div>
      </div>
      <div className="flex gap-5 w-[100%] justify-center py-2 px-0 my-5 mx-0 h-[70vh]">
        <textarea
          disabled={true}
          className="border-2 rounded-xl px-5 py-5 max-w-5xl grow h-[100%] resize-none transition-all"
          value={value}
          placeholder="Empty ..."
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
