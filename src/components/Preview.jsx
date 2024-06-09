import { marked } from 'marked';

/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
function Preview({ markdown }) {
  const parsed = marked(markdown);
  
  return (
    <div className=" w-full flex flex-col ">
      <div className="bg-customblack1 p-3 text-gray-400 uppercase tracking-wider justify-between">
        Preview

        <button id="deleteDocBtn" className="group flex-col justify-between float-end mr-5 p-1">
  <svg
    width="16"
    height="12"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-current text-gray-500 group-hover:text-customRed"
  >
    <path d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z"/>
  </svg>
</button>

      </div>
      <div className="flex-grow prose prose-invert overflow-auto p-6" dangerouslySetInnerHTML={{ __html: parsed }} />
    </div>
  );
}

export default Preview;
