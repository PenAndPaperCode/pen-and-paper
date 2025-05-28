import React, { memo, useCallback, useEffect } from 'react';
import { AppData, DoneStatusType, LearningResource } from '../types';

interface DataTableProps {
  selectedCategory: keyof AppData;
  selectedTopic: string;
  selectedSubtopic: string;
  data: AppData;
  doneStatus: DoneStatusType;
  setDoneStatus: React.Dispatch<React.SetStateAction<DoneStatusType>>;
}

interface ProblemWithName extends LearningResource {
  name: string;
}

const DataTable: React.FC<DataTableProps> = ({
  selectedCategory,
  selectedTopic,
  selectedSubtopic,
  data,
  doneStatus,
  setDoneStatus
}) => {
  // Debug logging to help identify issues
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('DataTable rendering with:', { selectedCategory, selectedTopic, selectedSubtopic });
    // eslint-disable-next-line no-console
    console.log('Data structure:', data[selectedCategory]?.[selectedTopic]);
  }, [selectedCategory, selectedTopic, selectedSubtopic, data]);

  // Get the appropriate data based on category
  const getProblem = (): ProblemWithName | null => {
    try {
      // All categories now have a three-level structure
      if (!data[selectedCategory]?.[selectedTopic]) {
        // eslint-disable-next-line no-console
        console.error(`Topic "${selectedTopic}" not found in ${selectedCategory} data`);
        return null;
      }
      
      // If subtopic is provided, use it
      if (selectedSubtopic) {
        const subtopicData = data[selectedCategory][selectedTopic][selectedSubtopic];
        if (!subtopicData) {
          // eslint-disable-next-line no-console
          console.error(`Subtopic "${selectedSubtopic}" not found in "${selectedTopic}"`);
          return null;
        }
        
        // Get the first problem from the subtopic
        const firstProblemKey = Object.keys(subtopicData)[0];
        if (!firstProblemKey) return null;
        
        return {
          name: firstProblemKey,
          ...(subtopicData[firstProblemKey] as LearningResource)
        };
      } else {
        // If no subtopic, get the first problem from the first subtopic
        const firstSubtopic = Object.keys(data[selectedCategory][selectedTopic])[0];
        if (!firstSubtopic) return null;
        
        const subtopicData = data[selectedCategory][selectedTopic][firstSubtopic];
        const firstProblemKey = Object.keys(subtopicData)[0];
        if (!firstProblemKey) return null;
        
        return {
          name: `${firstSubtopic}: ${firstProblemKey}`,
          ...(subtopicData[firstProblemKey] as LearningResource)
        };
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error accessing data:', error);
      return null;
    }
  };

  const problem = getProblem();

  const handleStatusChange = useCallback((problemKey: string) => {
    setDoneStatus((prev) => ({
      ...prev,
      [problemKey]: !prev[problemKey],
    }));
  }, [setDoneStatus]);

  if (!problem) {
    return (
      <div className="mt-4 text-gray-400">
        No problems found. Please check the console for any errors.
      </div>
    );
  }

  const problemKey = `${selectedCategory}_${selectedTopic}_${selectedSubtopic}_${problem.name}`;
  const isCompleted = doneStatus[problemKey] || false;

  return (
    <div className="overflow-x-auto">
      <table className="mt-4 w-full border border-gray-600 rounded-lg shadow-sm text-white" aria-label={`Problem for ${selectedSubtopic || selectedTopic}`}>
        <thead className="bg-gray-800">
          <tr>
            <th className="border border-gray-600 px-4 py-2 text-left">
              Name
            </th>
            <th className="border border-gray-600 px-4 py-2 text-left">
              YouTube Link
            </th>
            <th className="border border-gray-600 px-4 py-2 text-left">
              Platform
            </th>
            <th className="border border-gray-600 px-4 py-2 text-left">GitHub URL</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Done?</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-700 transition">
            <td className="border border-gray-600 px-4 py-2">{problem.name}</td>
            <td className="border border-gray-600 px-4 py-2">
              {problem.youtube && problem.youtube !== '#' ? (
                <a
                  href={problem.youtube}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`YouTube tutorial for ${problem.name}`}
                >
                  YouTube
                </a>
              ) : (
                <span className="text-gray-500">Not available</span>
              )}
            </td>
            <td className="border border-gray-600 px-4 py-2">
              {problem.platform}
            </td>
            <td className="border border-gray-600 px-4 py-2">
              {problem.github && problem.github !== '#' ? (
                <a
                  href={problem.github}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub code for ${problem.name}`}
                >
                  GitHub
                </a>
              ) : (
                <span className="text-gray-500">Not available</span>
              )}
            </td>
            <td className="border border-gray-600 px-4 py-2 text-center">
              <div className="flex items-center justify-center">
                <input
                  id={`checkbox-${problemKey}`}
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => handleStatusChange(problemKey)}
                  aria-label={`Mark ${problem.name} as ${isCompleted ? 'incomplete' : 'complete'}`}
                  className="w-4 h-4"
                />
                <label htmlFor={`checkbox-${problemKey}`} className="sr-only">
                  Mark as {isCompleted ? 'incomplete' : 'complete'}
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

DataTable.displayName = 'DataTable';

export default memo(DataTable);
