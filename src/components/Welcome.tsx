import React from 'react';
import { AppData } from '../types';

interface WelcomeProps {
  category: keyof AppData | null;
  topic: string | null;
}

const Welcome: React.FC<WelcomeProps> = ({ category, topic }) => {
  // If a category is selected but no topic, show category-specific welcome
  if (category && !topic) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to {category}</h1>
        <p className="text-xl text-gray-300 mb-6">
          Select a topic from the sidebar to get started.
        </p>
        <div className="max-w-2xl mx-auto text-left bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About {category}</h2>
          {category === 'DSA' && (
            <p className="text-gray-300">
              Data Structures and Algorithms are fundamental to computer science and software engineering. 
              This section covers key algorithms and data structures that are commonly asked in technical interviews.
            </p>
          )}
          {category === 'LLD' && (
            <p className="text-gray-300">
              Low Level Design focuses on the detailed design of individual components and classes. 
              This section covers design patterns and principles that help create maintainable and extensible code.
            </p>
          )}
          {category === 'HLD' && (
            <p className="text-gray-300">
              High Level Design deals with system architecture and component interactions. 
              This section covers scalability, reliability, and other aspects of designing large-scale systems.
            </p>
          )}
          {category === 'Machine Coding' && (
            <p className="text-gray-300">
              Machine Coding tests your ability to implement working solutions in a limited time. 
              This section covers common machine coding problems and their implementations.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default welcome screen when no category is selected
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to PenAndPaper</h1>
      <p className="text-xl text-gray-300 mb-8">
        Your comprehensive guide to technical interview preparation
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">DSA</h2>
          <p className="text-gray-300">
            Master data structures and algorithms with our curated collection of problems.
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">LLD</h2>
          <p className="text-gray-300">
            Learn low-level design patterns and principles for writing clean, maintainable code.
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">HLD</h2>
          <p className="text-gray-300">
            Explore high-level system design concepts for building scalable applications.
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Machine Coding</h2>
          <p className="text-gray-300">
            Practice implementing real-world applications with our machine coding challenges.
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-gray-400">
        Select a category from the sidebar to get started.
      </div>
    </div>
  );
};

export default Welcome;
