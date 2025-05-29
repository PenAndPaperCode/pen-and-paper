import React, { memo, useCallback, useState, useEffect } from 'react';
import { AppData } from '../types';

interface SidebarProps {
  data: AppData;
  selectedCategory: keyof AppData | null;
  selectedTopic: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<keyof AppData | null>>;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSubtopic: React.Dispatch<React.SetStateAction<string | null>>;
}

const Sidebar: React.FC<SidebarProps> = memo(({
  data,
  selectedCategory,
  selectedTopic,
  setSelectedCategory,
  setSelectedTopic,
  setSelectedSubtopic
}) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [selectedSubtopic, setLocalSelectedSubtopic] = useState<string | null>(null);

  // Ensure topic is expanded when selected
  useEffect(() => {
    if (selectedTopic) {
      setExpandedTopics(prev => ({
        ...prev,
        [selectedTopic]: true
      }));
    }
  }, [selectedTopic]);

  const handleCategoryClick = useCallback((category: keyof AppData) => {
    setSelectedCategory(prevCategory => {
      // If clicking the same category, toggle it off
      if (prevCategory === category) {
        setSelectedTopic(null);
        setSelectedSubtopic(null);
        return null;
      }
      // Otherwise, select the new category
      setSelectedTopic(null);
      setSelectedSubtopic(null);
      return category;
    });
  }, [setSelectedCategory, setSelectedTopic, setSelectedSubtopic]);

  const handleTopicClick = useCallback((topic: string) => {
    setSelectedTopic(prevTopic => {
      // If clicking the same topic, toggle it off
      if (prevTopic === topic) {
        setSelectedSubtopic(null);
        return null;
      }
      // Otherwise, select the new topic
      setSelectedSubtopic(null);
      return topic;
    });

    // Always expand the topic when clicked
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: true
    }));
  }, [setSelectedTopic, setSelectedSubtopic]);

  const handleSubtopicClick = useCallback((subtopic: string) => {
    // Always set the subtopic, never toggle it off when clicking the same one
    setSelectedSubtopic(subtopic);
    setLocalSelectedSubtopic(subtopic);
  }, [setSelectedSubtopic]);

  return (
    <div className="w-1/4 bg-gray-900 p-4 overflow-y-auto" role="navigation">
      <ul className="space-y-2">
        {Object.keys(data).map((category) => (
          <li key={category} className="mb-4">
            <button
              className={`w-full text-left p-2 rounded-md ${
                selectedCategory === category ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}
              onClick={() => handleCategoryClick(category as keyof AppData)}
              aria-expanded={selectedCategory === category}
              aria-controls={`${category}-topics`}
            >
              <span className="font-bold">{category}</span>
              <span className="float-right">{selectedCategory === category ? '▼' : '▶'}</span>
            </button>
            
            {selectedCategory === category && (
              <ul id={`${category}-topics`} className="ml-4 mt-2 space-y-1">
                {Object.keys(data[category as keyof AppData]).map((topic) => (
                  <li key={topic}>
                    <button
                      className={`w-full text-left p-2 rounded-md ${
                        selectedTopic === topic ? 'bg-blue-600' : 'hover:bg-gray-800'
                      }`}
                      onClick={() => handleTopicClick(topic)}
                      aria-expanded={selectedTopic === topic && expandedTopics[topic]}
                      aria-controls={`${topic}-subtopics`}
                    >
                      {topic}
                      <span className="float-right">{selectedTopic === topic && expandedTopics[topic] ? '▼' : '▶'}</span>
                    </button>
                    
                    {selectedTopic === topic && expandedTopics[topic] && (
                      <ul id={`${topic}-subtopics`} className="ml-4 mt-1 space-y-1">
                        {Object.keys(data[selectedCategory][topic]).map((subtopic) => (
                          <li key={subtopic}>
                            <button
                              className={`w-full text-left p-2 rounded-md ${
                                selectedSubtopic === subtopic ? 'bg-blue-500' : 'hover:bg-gray-800'
                              }`}
                              onClick={() => handleSubtopicClick(subtopic)}
                            >
                              {subtopic}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
