import React, { useState } from "react";
import './index.css';

import dsaData from './data/dsaData';
import lldData from './data/lldData';
import hldData from './data/hldData';
import machineCodingData from './data/machineCodingData';

const data = {
  DSA: dsaData,
  LLD: lldData,
  HLD: hldData,
  "Machine Coding": machineCodingData,
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [doneStatus, setDoneStatus] = useState({}); // ✅ Added state for checkbox

  const renderSubtopics = (category, topic) => {
    const subtopics = data[category][topic];
    if (!subtopics) return null;
    return (
      <div className="pl-8">
        {Object.keys(subtopics).map((subtopic) => (
          <div
            key={subtopic}
            className={`cursor-pointer py-1 px-2 rounded-md hover:bg-gray-800 ${
              selectedSubtopic === subtopic ? "bg-gray-700 font-semibold" : ""
            }`}
            onClick={() => setSelectedSubtopic(subtopic)}
          >
            <span className="mr-2 text-gray-400 text-sm">&#9679;</span>
            {subtopic}
          </div>
        ))}
      </div>
    );
  };

  const renderTopics = (category) => {
    return (
      <div className="pl-4">
        {Object.keys(data[category]).map((topic) => (
          <div key={topic}>
            <div
              className={`cursor-pointer py-1 px-2 rounded-md hover:bg-gray-800 ${
                selectedTopic === topic ? "bg-gray-700 font-semibold" : ""
              }`}
              onClick={() => {
                setSelectedTopic((prev) => (prev === topic ? null : topic));
                setSelectedSubtopic(null);
              }}
            >
              <span className="mr-2 text-white text-lg">&#9656;</span>
              {topic}
            </div>
            {selectedTopic === topic && renderSubtopics(category, topic)}
          </div>
        ))}
      </div>
    );
  };

  const renderTable = () => {
    if (!selectedCategory || !selectedTopic || !selectedSubtopic) return null;

    const subtopicData = data[selectedCategory][selectedTopic][selectedSubtopic];
    const problems = Object.entries(subtopicData).map(([name, details]) => ({
      name,
      ...details,
    }));

    if (problems.length === 0)
      return <div className="mt-4 text-gray-400">No problems added yet.</div>;

    return (
      <table className="mt-4 w-full border border-gray-600 rounded-lg shadow-sm text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="border border-gray-600 px-4 py-2 text-left">
              Problem Name
            </th>
            <th className="border border-gray-600 px-4 py-2 text-left">
              YouTube Link
            </th>
            <th className="border border-gray-600 px-4 py-2 text-left">
              Practice Platform
            </th>
            <th className="border border-gray-600 px-4 py-2 text-left">GitHub URL</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Done?</th> {/* ✅ New column */}
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, idx) => {
            const problemKey = `${selectedCategory}_${selectedTopic}_${selectedSubtopic}_${problem.name}`;
            return (
              <tr
                key={idx}
                className="even:bg-gray-900 hover:bg-gray-700 transition"
              >
                <td className="border border-gray-600 px-4 py-2">{problem.name}</td>
                <td className="border border-gray-600 px-4 py-2">
                  <a
                    href={problem.youtube}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {problem.platform}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  <a
                    href={problem.github}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={doneStatus[problemKey] || false}
                    onChange={() =>
                      setDoneStatus((prev) => ({
                        ...prev,
                        [problemKey]: !prev[problemKey],
                      }))
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderWelcome = () => {
    if (selectedCategory && !selectedTopic && !selectedSubtopic) {
      return (
        <div className="text-center mt-24 text-gray-300 px-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to {selectedCategory} Tutorials</h2>
          <p>This section contains curated content to help you master {selectedCategory} topics.</p>
        </div>
      );
    }

    if (selectedCategory && selectedTopic && !selectedSubtopic) {
      return (
        <div className="text-center mt-24 text-gray-300 px-8">
          <h2 className="text-2xl font-semibold mb-4">{selectedTopic}</h2>
          <p>This topic covers foundational subtopics in {selectedTopic}. Select one to see more details.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-screen font-sans bg-black text-white flex flex-col">
      <nav className="bg-black text-white py-8 text-center text-4xl font-extrabold select-none">
        Crack Interview with PenAndPaper
      </nav>

      <hr />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-black p-4 overflow-auto border-r border-white">
          {Object.keys(data).map((category) => (
            <div key={category}>
              <div
                className={`mb-1 cursor-pointer text-lg font-semibold px-2 py-1 rounded-md hover:bg-gray-800 flex items-center ${
                  selectedCategory === category ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  setSelectedCategory((prev) => (prev === category ? null : category));
                  setSelectedTopic(null);
                  setSelectedSubtopic(null);
                }}
              >
                <span className="mr-2 text-white text-xl">•</span>
                {category}
              </div>
              {selectedCategory === category && renderTopics(category)}
            </div>
          ))}
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {renderWelcome()}
          {selectedCategory && selectedTopic && selectedSubtopic && (
            <>
              <h1 className="text-2xl font-bold text-white mb-4">
                {selectedCategory} / {selectedTopic} / {selectedSubtopic}
              </h1>
              {renderTable()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
