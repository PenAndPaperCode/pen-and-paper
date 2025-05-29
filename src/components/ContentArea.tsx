import React, { Suspense, lazy, memo, useEffect } from 'react';
import { AppData, DoneStatusType } from '../types';
import ErrorBoundary from './ErrorBoundary';

const DataTable = lazy(() => import('./DataTable'));
const Welcome = lazy(() => import('./Welcome'));

interface ContentAreaProps {
  selectedCategory: keyof AppData | null;
  selectedTopic: string | null;
  selectedSubtopic: string | null;
  data: AppData;
  doneStatus: DoneStatusType;
  setDoneStatus: React.Dispatch<React.SetStateAction<DoneStatusType>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<keyof AppData | null>>;
}

const ContentArea: React.FC<ContentAreaProps> = memo(({
  selectedCategory,
  selectedTopic,
  selectedSubtopic,
  data,
  doneStatus,
  setDoneStatus,
  setSelectedCategory
}) => {
  // Debug logging
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('ContentArea rendering with:', { selectedCategory, selectedTopic, selectedSubtopic });
  }, [selectedCategory, selectedTopic, selectedSubtopic]);

  // Determine if we should show the data table
  const shouldShowDataTable = () => {
    if (!selectedCategory || !selectedTopic) return false;
    
    // For DSA, we need a subtopic
    if (selectedCategory === 'DSA' && !selectedSubtopic) return false;
    
    // For other categories, we just need a topic
    return true;
  };

  return (
    <div className="flex-1 p-6 overflow-auto" role="main">
      <Suspense fallback={<div className="text-center p-4">Loading content...</div>}>
        {!shouldShowDataTable() && (
          <Welcome 
            category={selectedCategory} 
            topic={selectedTopic} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}
        
        {shouldShowDataTable() && selectedCategory && selectedTopic && (
          <>
            <h1 className="text-2xl font-bold text-white mb-4">
              {selectedCategory} / {selectedTopic} {selectedSubtopic ? `/ ${selectedSubtopic}` : ''}
            </h1>
            <ErrorBoundary fallback={<div className="text-red-500">Error loading data table. Please check the console for details.</div>}>
              <DataTable
                selectedCategory={selectedCategory}
                selectedTopic={selectedTopic}
                selectedSubtopic={selectedSubtopic || ''}
                data={data}
                doneStatus={doneStatus}
                setDoneStatus={setDoneStatus}
              />
            </ErrorBoundary>
          </>
        )}
      </Suspense>
    </div>
  );
});

ContentArea.displayName = 'ContentArea';

export default ContentArea;
