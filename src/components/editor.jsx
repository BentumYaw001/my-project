/* eslint-disable no-unused-vars */
import React from 'react';
import "./customScrollbar.css";

// eslint-disable-next-line react/prop-types
function Editor({ markdown, setMarkdown, isDarkTheme }) {
  return (
    <div className={`border-r-2 ${isDarkTheme ? 'border-gray-600' : 'border-gray-300'}`}>
      <div className={`w-full p-3 uppercase tracking-wider ${isDarkTheme ? 'bg-customblack1 text-gray-400' : 'bg-gray-200 text-gray-800'}`}>
        Markdown
      </div>
      <textarea
        className={`custom-scrollbar w-full h-full outline-none p-6 ${isDarkTheme ? 'bg-mainblack text-white' : 'bg-white text-black'}`}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
  );
}

export default Editor;
