"use client";
import React, { useState } from "react";
import { Note } from "../types/types"; 

const Button: React.FC = () => {
  const [showColors, setShowColors] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const colors = ["#f54242", "#4287f5", "#42f554", "#f5a742"];

  const handleClick = () => {
    setShowColors(!showColors);
  };

  const addNote = (color: string) => {
    setNotes([...notes, { color, inputValue: "", listItem: [] }]);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedNotes = [...notes];
    updatedNotes[index].inputValue = event.target.value;
    setNotes(updatedNotes);
  };

  const handleAddClick = (index: number) => {
    const updatedNotes = [...notes];
    if (updatedNotes[index].inputValue.trim() !== "") {
      updatedNotes[index].listItem.push({
        text: updatedNotes[index].inputValue,
        completed: false,
      });
      updatedNotes[index].inputValue = "";
      setNotes(updatedNotes);
    }
  };

  const toggleComplete = (noteIndex: number, taskIndex: number) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].listItem[taskIndex].completed =
      !updatedNotes[noteIndex].listItem[taskIndex].completed;
    setNotes(updatedNotes);
  };

  const handleDeleteTask = (noteIndex: number, taskIndex: number) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].listItem = updatedNotes[noteIndex].listItem.filter(
      (_, i) => i !== taskIndex
    );
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (noteIndex: number) => {
    const updatedNotes = notes.filter((_, i) => i !== noteIndex);
    setNotes(updatedNotes);
  };

  const handleDownloadNote = (note: Note) => {
    const tasksText = note.listItem
      .map((task) => `${task.completed ? "[x]" : "[ ]"} ${task.text}`)
      .join("\n");
    const blob = new Blob([tasksText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "note.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center flex-col">
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        +
      </button>

      {showColors && (
        <div className="flex flex-col fixed bottom-20 right-[1.3rem] gap-2">
          {colors.map((color, index) => (
            <button
              onClick={() => addNote(color)}
              key={index}
              className="w-10 h-10 rounded-full shadow-lg"
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      )}

      {notes.map((note, noteIndex) => (
        <div
          key={noteIndex}
          className="w-80 rounded-lg shadow-lg m-2 flex flex-col items-center justify-start px-3 py-4 gap-3"
          style={{ backgroundColor: note.color }}
        >
          <div className="flex self-end gap-1">
            <button
              className="text-red-500 bg-white p-2 rounded-full"
              onClick={() => handleDeleteNote(noteIndex)}
            >
              ❌
            </button>
            <button
              className="text-blue-500 bg-white p-2 rounded-full"
              onClick={() => handleDownloadNote(note)}
            >
              📥
            </button>
          </div>

          <div className="flex gap-2">
            <input
              className="bg-white px-2 w-[200px] h-[40px] border rounded pl-2"
              type="text"
              placeholder="Type task"
              value={note.inputValue}
              onChange={(e) => handleInputChange(noteIndex, e)}
            />
            <button
              className="bg-green-600 text-white w-[73px] h-[40px] rounded"
              onClick={() => handleAddClick(noteIndex)}
            >
              Add
            </button>
          </div>

          <ul className="mt-4">
            {note.listItem.map((item, taskIndex) => (
              <li
                key={taskIndex}
                className="border-b p-2 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={item.completed}
                    onChange={() => toggleComplete(noteIndex, taskIndex)}
                  />
                  <span className={item.completed ? "line-through" : ""}>
                    {item.text}
                  </span>
                </div>
                {item.completed && (
                  <button
                    className="text-red-500 bg-white p-1 rounded-full"
                    onClick={() => handleDeleteTask(noteIndex, taskIndex)}
                  >
                    ❌
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Button;
