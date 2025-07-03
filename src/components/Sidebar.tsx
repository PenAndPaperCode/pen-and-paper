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

  // Prevent overscroll by handling wheel events on the scrollable content area
  const scrollableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollableElement = scrollableRef.current;
    if (!scrollableElement) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
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

    scrollableElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      scrollableElement.removeEventListener('wheel', handleWheel);
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

  // Color scheme for different categories - Dark backgrounds with colored text
  const getCategoryColors = (category: string) => {
    const colorMap: Record<string, { bg: string, hover: string, selected: string, text: string }> = {
      "DSA": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-purple-400"
      },
      "HLD": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-blue-400"
      },
      "LLD": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-green-400"
      },
      "Machine Coding": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-orange-400"
      },
      "MultiThreading": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-red-400"
      }
    };
    return colorMap[category] || {
      bg: "bg-gray-800",
      hover: "hover:bg-gray-700",
      selected: "bg-gray-700",
      text: "text-gray-400"
    };
  };

  const getTopicColors = (category: string) => {
    const colorMap: Record<string, { bg: string, hover: string, selected: string, text: string }> = {
      "DSA": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-purple-300"
      },
      "HLD": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-blue-300"
      },
      "LLD": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-green-300"
      },
      "Machine Coding": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-orange-300"
      },
      "MultiThreading": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-red-300"
      }
    };
    return colorMap[category] || {
      bg: "bg-gray-800",
      hover: "hover:bg-gray-700",
      selected: "bg-gray-700",
      text: "text-gray-300"
    };
  };

  const getSubtopicColors = (category: string) => {
    const colorMap: Record<string, { bg: string, hover: string, selected: string, text: string }> = {
      "DSA": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-purple-200"
      },
      "HLD": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-blue-200"
      },
      "LLD": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-green-200"
      },
      "Machine Coding": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-orange-200"
      },
      "MultiThreading": {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        selected: "bg-gray-700",
        text: "text-red-200"
      }
    };
    return colorMap[category] || {
      bg: "bg-gray-800",
      hover: "hover:bg-gray-700",
      selected: "bg-gray-700",
      text: "text-gray-200"
    };
  };

  // Filter out the revision sheet from regular categories
  const regularCategories = categoryOrder.filter(cat => 
    cat !== "DSA Countdown: Final 15 Days" && cat !== "ALL DSA Patterns You must know"
  );

  return (
    <div ref={sidebarRef} className="w-1/4 bg-gray-900 p-4 flex flex-col sidebar-container sidebar-locked" style={{ height: 'calc(100vh - 140px)', overscrollBehavior: 'none', position: 'relative' }} role="navigation">
      {/* Main categories section - scrollable */}
      <div ref={scrollableRef} className="flex-1 overflow-y-auto pr-2" style={{ minHeight: 0 }}>
        <ul className="space-y-2">
          {regularCategories.map((category) => {
            const categoryColors = getCategoryColors(category);
            return (
              <li key={category} className="mb-4">
                <button
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedCategory === category 
                      ? `${categoryColors.selected} shadow-lg border border-gray-600` 
                      : `${categoryColors.bg} ${categoryColors.hover} shadow-md`
                  } ${categoryColors.text}`}
                  onClick={() => handleCategoryClick(category as keyof AppData)}
                  aria-expanded={selectedCategory === category}
                  aria-controls={`${category}-topics`}
                >
                  <span className="font-bold text-lg">{category}</span>
                  <span className="float-right text-lg">{selectedCategory === category ? '▼' : '▶'}</span>
                </button>
                
                {selectedCategory === category && (
                  <ul id={`${category}-topics`} className="ml-4 mt-3 space-y-2">
                    {Object.keys((data[category as keyof AppData] as any)).map((topic) => {
                      const topicColors = getTopicColors(category);
                      return (
                        <li key={topic}>
                          <button
                            className={`w-full text-left p-2 rounded-md transition-all duration-150 ${
                              selectedTopic === topic 
                                ? `${topicColors.selected} shadow-md` 
                                : `${topicColors.bg} ${topicColors.hover}`
                            } ${topicColors.text}`}
                            onClick={() => handleTopicClick(topic)}
                            aria-expanded={selectedTopic === topic && expandedTopics[topic]}
                            aria-controls={`${topic}-subtopics`}
                          >
                            <span className="font-medium">{topic}</span>
                            <span className="float-right">{selectedTopic === topic && expandedTopics[topic] ? '▼' : '▶'}</span>
                          </button>
                          
                          {selectedTopic === topic && expandedTopics[topic] && (
                            <ul id={`${topic}-subtopics`} className="ml-4 mt-2 space-y-1">
                              {getSubtopics(selectedCategory, topic).map((subtopic) => {
                                const subtopicColors = getSubtopicColors(category);
                                return (
                                  <li key={subtopic}>
                                    <button
                                      className={`w-full text-left p-2 rounded-md transition-all duration-150 ${
                                        selectedSubtopic === subtopic 
                                          ? `${subtopicColors.selected} shadow-sm` 
                                          : `${subtopicColors.bg} ${subtopicColors.hover}`
                                      } ${subtopicColors.text}`}
                                      onClick={() => handleSubtopicClick(subtopic)}
                                    >
                                      <em className="text-sm">{subtopic}</em>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Footer section with revision sheet - fixed at bottom */}
      <div className="flex-shrink-0 pt-4 border-t border-gray-700">
        <button
          className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 ${
            selectedCategory === "DSA Countdown: Final 15 Days" 
              ? 'bg-gray-700 shadow-lg border border-gray-600' 
              : 'bg-gray-800 hover:bg-gray-700 shadow-md'
          } text-yellow-400 font-semibold`}
          onClick={() => handleCategoryClick("DSA Countdown: Final 15 Days" as keyof AppData)}
        >
          <span className="font-bold">🚀 DSA Countdown: Final 15 Days</span>
          <span className="float-right">▶</span>
        </button>
        
        <button
          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
            selectedCategory === "ALL DSA Patterns You must know" 
              ? 'bg-gray-700 shadow-lg border border-gray-600' 
              : 'bg-gray-800 hover:bg-gray-700 shadow-md'
          } text-emerald-400 font-semibold`}
          onClick={() => handleCategoryClick("ALL DSA Patterns You must know" as keyof AppData)}
        >
          <span className="font-bold">📚 ALL DSA Patterns You must know</span>
          <span className="float-right">▶</span>
        </button>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
