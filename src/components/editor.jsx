/* eslint-disable no-unused-vars */
import React from 'react';
import "./customScrollbar.css";

// eslint-disable-next-line react/prop-types
function Editor({ markdown, setMarkdown, isDarkTheme, toggleEditorVisibility }) {
  return (
    <div className={`custom-md:border-r-2 flex flex-col w-full h-full ${toggleEditorVisibility ? '' : 'h-full items-center w-full'} ${isDarkTheme ? 'border-gray-600' : 'border-gray-300'}`}>
      <div className={`w-full flex items-center p-3 uppercase tracking-wider ${isDarkTheme ? 'bg-customblack1 text-gray-400' : 'bg-gray-200 text-gray-800'} flex justify-between`}>
        Markdown
        <button 
          onClick={toggleEditorVisibility} 
          className="group md:hidden px-3" // Apply styles to hide this button on medium and larger screens
        >
          {<svg
  width="16"
  height="12"
  xmlns="http://www.w3.org/2000/svg"
  className="fill-current group-hover:text-customRed"
>
  <path
    className={`transition-colors duration-300 ${isDarkTheme ? 'text-gray-500 group-hover:text-customRed' : 'text-gray-700 group-hover:text-customRed'}`}
    d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z"
  />
</svg>



}
        </button>
      </div>
      <textarea
        className={`custom-scrollbar p-3 w-full h-full outline-none ${isDarkTheme ? 'bg-mainblack text-white' : 'bg-white text-black'}`}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
  );
}

export default Editor;
