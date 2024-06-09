/* eslint-disable no-unused-vars */
import React from 'react';
import "./customScrollbar.css"

// eslint-disable-next-line react/prop-types
function Editor({ markdown, setMarkdown }) {
  return (
    <div className=' border-r-2 border-gray-600'>
      <div className="w-full bg-customblack1 p-3 text-gray-400 uppercase tracking-wider">
        Markdown
      </div>
      <textarea
        className=".custom-scrollbar w-full h-full bg-mainblack text-white outline-none p-6"
        onChange={(e) => setMarkdown(e.target.value)} 
      >
        {markdown}
      </textarea>
    </div>
  );
}

export default Editor;
