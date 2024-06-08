import { marked } from 'marked';

/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
function Preview({ markdown }) {
  const parsed = marked(markdown);
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="bg-gray-900 p-3 text-gray-400 uppercase tracking-wider">
        Preview
      </div>
      <div className="flex-grow prose prose-invert overflow-auto p-6" dangerouslySetInnerHTML={{ __html: parsed }} />
    </div>
  );
}

export default Preview;
