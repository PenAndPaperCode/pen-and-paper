import React, { useState, Suspense, lazy, useMemo, useEffect } from 'react';
import './index.css';
import './components/SocialIcons.css';
import { AppData, DoneStatusType } from './types';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Sidebar = lazy(() => import('./components/Sidebar'));
const ContentArea = lazy(() => import('./components/ContentArea'));

// Social media icons as SVG components
const InstagramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon instagram-icon">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#FCAF45" />
        <stop offset="50%" stopColor="#F77737" />
        <stop offset="75%" stopColor="#F56040" />
        <stop offset="100%" stopColor="#FD1D1D" />
        <stop offset="100%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#833AB4" />
        <stop offset="100%" stopColor="#5851DB" />
        <stop offset="100%" stopColor="#405DE6" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YouTubeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="social-icon youtube-icon">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Import data
import dsaData from './data/dsaData';
import lldData from './data/lldData';
import hldData from './data/hldData';
import machineCodingData from './data/machineCodingData';
import multithreadingData from './data/multithreadingData';
import revisionSheetData from './data/revisionSheetData';
import dsaPatternsData from './data/dsaPatternsData';

// Define the order of categories
const categoryOrder = [
  "DSA",
  "LLD",
  "HLD",
  "Machine Coding",
  "MultiThreading",
  "DSA Countdown: Final 15 Days",
  "ALL DSA Patterns You must know"
];

// Memoize data object
const data: AppData = {
  "DSA": dsaData,
  "LLD": lldData,
  "HLD": hldData,
  "Machine Coding": machineCodingData,
  "MultiThreading": multithreadingData,
  "DSA Countdown: Final 15 Days": revisionSheetData,
  "ALL DSA Patterns You must know": dsaPatternsData
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
      "Machine Coding": Object.keys(data["Machine Coding"]),
      "MultiThreading": Object.keys(data["MultiThreading"]),
      "DSA Countdown: Final 15 Days": Object.keys(data["DSA Countdown: Final 15 Days"]),
      "ALL DSA Patterns You must know": Object.keys(data["ALL DSA Patterns You must know"])
    });
  }, []);

  // Memoize data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, []);

  // Save doneStatus to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('doneStatus', JSON.stringify(doneStatus));
  }, [doneStatus]);

  return (
    <div className="h-screen font-sans bg-black text-white flex flex-col no-overscroll">
      <nav className="bg-black text-white py-6 px-4 md:px-8 relative flex-shrink-0">
        <div className="social-icons-container absolute left-6 top-1/2 transform -translate-y-1/2">
          <a href="https://www.instagram.com/penpaper_interviewprep" target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram">
            <InstagramIcon />
          </a>
          <a href="https://youtube.com/@sikhoaursmjho?sub_confirmation=1" target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube">
            <YouTubeIcon />
          </a>
        </div>
        <div className="text-3xl md:text-4xl font-extrabold select-none text-center mb-4 md:mb-0">
          Crack Interview with PenAndPaper
        </div>
      </nav>

      <hr className="flex-shrink-0" />

      <div className="flex flex-1 min-h-0">
        <ErrorBoundary fallback={<div className="p-4 text-red-500">Something went wrong in the sidebar.</div>}>
          <Suspense fallback={
            <div className="w-1/4 h-full flex items-center justify-center">
              <div className="text-xl text-gray-400">Loading sidebar...</div>
            </div>
          }>
            <Sidebar
              data={memoizedData}
              categoryOrder={categoryOrder}
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
                setSelectedCategory={setSelectedCategory}
              />
            </Suspense>
          </ErrorBoundary>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
