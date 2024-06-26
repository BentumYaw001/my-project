/* eslint-disable no-unused-vars */
import React from 'react';
import "./customScrollbar.css";

// eslint-disable-next-line react/prop-types
function Editor({ markdown, setMarkdown, isDarkTheme, toggleEditorVisibility }) {
  return (
    <div className={`custom-md:border-r-2 custom-md:h-full custom-md:items-center ${isDarkTheme ? 'border-gray-600' : 'border-gray-300'}`}>
      <div className={`w-full p-3 uppercase tracking-wider ${isDarkTheme ? 'bg-customblack1 text-gray-400' : 'bg-gray-200 text-gray-800'} flex justify-between`}>
        Markdown
        <button 
          onClick={toggleEditorVisibility} 
          className="md:hidden" // Apply styles to hide this button on medium and larger screens
        >
          {`Toggle Preview`}
        </button>
      </div>
      <textarea
        className={`custom-scrollbar w-full h-full outline-none p-6  ${isDarkTheme ? 'bg-mainblack text-white' : 'bg-white text-black'}`}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
  );
}

export default Editor;
