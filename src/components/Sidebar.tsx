import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import { AppData } from '../types';

interface SidebarProps {
  data: AppData;
  categoryOrder: string[];
  selectedCategory: keyof AppData | null;
  selectedTopic: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<keyof AppData | null>>;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSubtopic: React.Dispatch<React.SetStateAction<string | null>>;
}

const Sidebar: React.FC<SidebarProps> = memo(({
  data,
  categoryOrder,
  selectedCategory,
  selectedTopic,
  setSelectedCategory,
  setSelectedTopic,
  setSelectedSubtopic
}) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [selectedSubtopic, setLocalSelectedSubtopic] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Prevent overscroll by handling wheel events
  useEffect(() => {
    const sidebarElement = sidebarRef.current;
    if (!sidebarElement) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = sidebarElement;
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      // Prevent overscroll at top
      if (isScrollingUp && scrollTop === 0) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Prevent overscroll at bottom
      if (isScrollingDown && scrollTop + clientHeight >= scrollHeight) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    sidebarElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      sidebarElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

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
    // Special handling for Revision Sheet
    if (category === "DSA Countdown: Final 15 Days" || category === "ALL DSA Patterns You must know") {
      setSelectedCategory(category);
      setSelectedTopic("problems");
      setSelectedSubtopic(null);
      return;
    }

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

  // Function to safely get subtopics for a category and topic
  const getSubtopics = (category: keyof AppData, topic: string): string[] => {
    if (!category || !topic) return [];
    
    const categoryData = data[category];
    if (!categoryData) return [];
    
    // Type assertion to access properties with string index
    const topicData = (categoryData as any)[topic];
    if (!topicData) return [];
    
    return Object.keys(topicData);
  };

  // Filter out the revision sheet from regular categories
  const regularCategories = categoryOrder.filter(cat => 
    cat !== "DSA Countdown: Final 15 Days" && cat !== "ALL DSA Patterns You must know"
  );

  return (
    <div ref={sidebarRef} className="w-1/4 bg-gray-900 p-4 flex flex-col sidebar-container sidebar-locked" style={{ height: 'calc(100vh - 140px)', overscrollBehavior: 'none', position: 'relative' }} role="navigation">
      {/* Main categories section */}
      <div className="flex-grow">
        <ul className="space-y-2">
          {regularCategories.map((category) => (
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
                  {Object.keys((data[category as keyof AppData] as any)).map((topic) => (
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
                          {getSubtopics(selectedCategory, topic).map((subtopic) => (
                            <li key={subtopic}>
                              <button
                                className={`w-full text-left p-2 rounded-md ${
                                  selectedSubtopic === subtopic ? 'bg-blue-500' : 'hover:bg-gray-800'
                                }`}
                                onClick={() => handleSubtopicClick(subtopic)}
                              >
                                <em>{subtopic}</em>
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
      
      {/* Footer section with revision sheet */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          className={`w-full text-left p-2 rounded-md mb-2 ${
            selectedCategory === "DSA Countdown: Final 15 Days" ? 'bg-blue-700' : 'hover:bg-gray-800'
          }`}
          onClick={() => handleCategoryClick("DSA Countdown: Final 15 Days" as keyof AppData)}
        >
          <span className="font-bold text-yellow-400">DSA Countdown: Final 15 Days</span>
          <span className="float-right">▶</span>
        </button>
        
        <button
          className={`w-full text-left p-2 rounded-md ${
            selectedCategory === "ALL DSA Patterns You must know" ? 'bg-blue-700' : 'hover:bg-gray-800'
          }`}
          onClick={() => handleCategoryClick("ALL DSA Patterns You must know" as keyof AppData)}
        >
          <span className="font-bold text-green-400">ALL DSA Patterns You must know</span>
          <span className="float-right">▶</span>
        </button>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
