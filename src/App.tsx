import React, { useState, Suspense, lazy, useMemo, useEffect } from 'react';
import './index.css';
import { AppData, DoneStatusType } from './types';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Sidebar = lazy(() => import('./components/Sidebar'));
const ContentArea = lazy(() => import('./components/ContentArea'));

// Import data
import dsaData from './data/dsaData';
import lldData from './data/lldData';
import hldData from './data/hldData';
import machineCodingData from './data/machineCodingData';

// Memoize data object
const data: AppData = {
  DSA: dsaData,
  LLD: lldData,
  HLD: hldData,
  "Machine Coding": machineCodingData,
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof AppData | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [doneStatus, setDoneStatus] = useState<DoneStatusType>(() => {
    // Load saved status from localStorage if available
    const savedStatus = localStorage.getItem('doneStatus');
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  // Debug logging
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('App data structure:', {
      DSA: Object.keys(data.DSA),
      LLD: Object.keys(data.LLD),
      HLD: Object.keys(data.HLD),
      "Machine Coding": Object.keys(data["Machine Coding"])
    });
  }, []);

  // Memoize data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, []);

  // Save doneStatus to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('doneStatus', JSON.stringify(doneStatus));
  }, [doneStatus]);

  return (
    <div className="h-screen font-sans bg-black text-white flex flex-col">
      <nav className="bg-black text-white py-8 text-center text-4xl font-extrabold select-none">
        Crack Interview with PenAndPaper
      </nav>

      <hr />

      <div className="flex flex-1 overflow-hidden">
        <ErrorBoundary fallback={<div className="p-4 text-red-500">Something went wrong in the sidebar.</div>}>
          <Suspense fallback={
            <div className="w-1/4 h-full flex items-center justify-center">
              <div className="text-xl text-gray-400">Loading sidebar...</div>
            </div>
          }>
            <Sidebar
              data={memoizedData}
              selectedCategory={selectedCategory}
              selectedTopic={selectedTopic}
              setSelectedCategory={setSelectedCategory}
              setSelectedTopic={setSelectedTopic}
              setSelectedSubtopic={setSelectedSubtopic}
            />
          </Suspense>
          
          <ErrorBoundary fallback={<div className="p-4 text-red-500">Something went wrong in the content area.</div>}>
            <Suspense fallback={
              <div className="flex-1 h-full flex items-center justify-center">
                <div className="text-xl text-gray-400">Loading content...</div>
              </div>
            }>
              <ContentArea
                selectedCategory={selectedCategory}
                selectedTopic={selectedTopic}
                selectedSubtopic={selectedSubtopic}
                data={memoizedData}
                doneStatus={doneStatus}
                setDoneStatus={setDoneStatus}
              />
            </Suspense>
          </ErrorBoundary>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
