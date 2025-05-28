#!/bin/bash

# Rename core React files to .tsx
mv /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/App.test.js /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/App.test.tsx
mv /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/index.js /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/index.tsx

# Rename utility files to .ts
mv /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/reportWebVitals.js /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/reportWebVitals.ts
mv /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/setupTests.js /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/setupTests.ts

# Rename all data files to .ts
for file in $(find /Users/arunpaswan/workspace/PenAndPaper/pen-and-paper/src/data -name "*.js"); do
    mv "$file" "${file%.js}.ts"
done

echo "All JavaScript files have been renamed to TypeScript"

