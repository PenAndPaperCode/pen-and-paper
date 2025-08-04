import React, { memo, useCallback, useEffect } from 'react';
import { DoneStatusType, LearningResource } from '../types';

interface DataTableProps {
  selectedCategory: string;
  selectedTopic: string;
  selectedSubtopic: string;
  data: any;
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
    console.log('Data structure:', selectedCategory ? data[selectedCategory] : null);
    // eslint-disable-next-line no-console
    console.log('Available topics in data:', selectedCategory && data[selectedCategory] ? Object.keys(data[selectedCategory]) : 'none');
  }, [selectedCategory, selectedTopic, selectedSubtopic, data]);

  // Get all problems for the selected category, topic, and subtopic
  const getProblems = (): ProblemWithName[] => {
    try {
      if (!selectedCategory) return [];
      
      // Special handling for Revision Sheet which has a different structure
      if (selectedCategory === "DSA Countdown: Final 15 Days" || selectedCategory === "ALL DSA Patterns You must know") {
        const revisionData = data[selectedCategory];
        if (!revisionData || !selectedTopic) return [];
        
        // Use the selectedTopic as the key (e.g., "Must Do DSA Problems" or "Must Know DSA Patterns")
        const problemsData = revisionData[selectedTopic];
        if (!problemsData) {
          console.error(`Topic "${selectedTopic}" not found in ${selectedCategory} data`);
          return [];
        }
        
        return Object.keys(problemsData).map(problemKey => ({
          name: problemKey,
          ...(problemsData[problemKey] as LearningResource)
        }));
      }
      
      // All other categories have a three-level structure
      const categoryData = data[selectedCategory];
      if (!categoryData || !selectedTopic || !(selectedTopic in categoryData)) {
        // eslint-disable-next-line no-console
        console.error(`Topic "${selectedTopic}" not found in ${selectedCategory} data`);
        return [];
      }
      
      // If subtopic is provided, use it
      if (selectedSubtopic) {
        const topicData = categoryData[selectedTopic as keyof typeof categoryData];
        if (!topicData || !(selectedSubtopic in topicData)) {
          // eslint-disable-next-line no-console
          console.error(`Subtopic "${selectedSubtopic}" not found in "${selectedTopic}"`);
          return [];
        }
        
        const subtopicData = topicData[selectedSubtopic as keyof typeof topicData];
        
        // Get all problems from the subtopic
        return Object.keys(subtopicData).map(problemKey => ({
          name: problemKey,
          ...(subtopicData[problemKey] as unknown as LearningResource)
        }));
      } else {
        // If no subtopic, get the first problem from the first subtopic
        const topicData = categoryData[selectedTopic as keyof typeof categoryData];
        const firstSubtopic = Object.keys(topicData)[0];
        if (!firstSubtopic) return [];
        
        const subtopicData = topicData[firstSubtopic as keyof typeof topicData];
        return Object.keys(subtopicData).map(problemKey => ({
          name: `${firstSubtopic}: ${problemKey}`,
          ...(subtopicData[problemKey] as unknown as LearningResource)
        }));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error accessing data:', error);
      return [];
    }
  };

  const problems = getProblems();

  const handleStatusChange = useCallback((problemKey: string) => {
    setDoneStatus((prev) => ({
      ...prev,
      [problemKey]: !prev[problemKey],
    }));
  }, [setDoneStatus]);

  if (problems.length === 0) {
    return (
      <div className="mt-4 text-gray-400">
        No problems found. Please check the console for any errors.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="mt-4 w-full border border-gray-600 rounded-lg shadow-sm text-white" aria-label={`Problems for ${selectedSubtopic || selectedTopic}`}>
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
            <th className="border border-gray-600 px-4 py-2 text-left">Done ?</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => {
            const problemKey = `${selectedCategory}_${selectedTopic}_${selectedSubtopic}_${problem.name}`;
            const isCompleted = doneStatus[problemKey] || false;
            
            return (
              <tr key={problemKey} className="hover:bg-gray-700 transition">
                <td className="border border-gray-600 px-4 py-2">{problem.name}</td>
                <td className="border border-gray-600 px-4 py-2">
                  {problem.youtube && problem.youtube !== 'NA' && problem.youtube.startsWith('http') ? (
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
                    <span className="text-gray-500">{problem.youtube}</span>
                  )}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {problem.platform && problem.platform !== 'NA' && problem.platform.startsWith('http') ? (
                    <a
                      href={problem.platform}
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Platform link for ${problem.name}`}
                    >
                      {'Practice'}
                    </a>
                  ) : (
                    problem.platform
                  )}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {problem.github && problem.github !== 'NA' && problem.github.startsWith('http') ? (
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
                    <span className="text-gray-500">{problem.github}</span>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

DataTable.displayName = 'DataTable';

export default memo(DataTable);
