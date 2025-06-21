import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log("paste ", pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(paste) {
    dispatch(removeFromPastes(paste));
  }

  return (
    <div className="flex flex-col px-2 my-5 w-[90%] items-center">
      <div className="flex gap-2 w-[100%] justify-center">
        <input
          type="search"
          placeholder="Search Here ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shrink grow basis-0 px-5 py-2 rounded-3xl max-w-5xl border-2 transition-all font-semibold"
        />
      </div>
      <div className="flex flex-col gap-4 my-5 w-[100%]">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="flex justify-between px-4 py-4 border-2 rounded-lg"
              >
                <div className="flex flex-col gap-2 w-[50%]">
                  <h1 className="text-2xl font-bold">{paste.title}</h1>
                  <p className="font-normal text-sm">{paste.content}</p>
                </div>
                <div className="flex flex-col gap-3 w-[50%] text-right">
                  <div>
                    <ul className="flex justify-end items-center gap-2">
                      <button
                        data-tooltip-id="editTip"
                        data-tooltip-content="Edit"
                        className="active:border-white w-12 h-12 pl-1 border-2 rounded-lg flex justify-center items-center 
                     hover:text-blue-300 hover:bg-slate-600 transition-colors duration-300"
                      >
                        <NavLink to={`../?pasteId=${paste._id}`}>
                          <i className="fas fa-pen mr-1"></i>
                        </NavLink>
                      </button>
                      <Tooltip id="editTip" place="top" />

                      <button
                        onClick={() => {
                          handleDelete(paste);
                        }}
                        data-tooltip-id="deleteTip"
                        data-tooltip-content="Delete"
                        className="active:border-white w-12 h-12 pl-1 border-2 rounded-lg flex justify-center items-center 
                     hover:text-blue-300 hover:bg-slate-600 transition-colors duration-300"
                      >
                        <i className="fas fa-trash mr-1"></i>
                      </button>
                      <Tooltip id="deleteTip" place="top" />

                      <button
                        onClick={async () => {
                          await navigator
                            .share({
                              title: paste.title,
                              text: `${paste.title}:\n${paste.content}`,
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
                        data-tooltip-id="viewTip"
                        data-tooltip-content="View"
                        className="active:border-white w-12 h-12 pl-1 border-2 rounded-lg flex justify-center items-center 
                     hover:text-blue-300 hover:bg-slate-600 transition-colors duration-300 group"
                      >
                        <NavLink to={`${paste._id}`}>
                          <i className="fas fa-eye mr-1"></i>
                        </NavLink>
                      </button>
                      <Tooltip id="viewTip" place="top" />

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${paste.title}:\n${paste.content}`
                          );
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
                    </ul>
                  </div>
                  <div className="font-mono">
                    {Date(paste.createdAt).substring(4, 21)}
                  </div>
                </div>
              </div>
            );
          })}
        {filteredData.length <= 0 && (
          <div className="flex items-center justify-center text-slate-400 font-medium font-mono text-lg my-10">
            No Pastes Yet ...
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
