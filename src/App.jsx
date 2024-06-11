import { useState, useEffect } from "react";
import Preview from "./components/Preview";
import Editor from "./components/editor";
import { Navbar } from "./components/navbar";
import Records from "./components/data.json"

// JSON data
const data = Records;

function App() {
  const [markdown, setMarkdown] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(true);

  useEffect(() => {
    // Fetch the content for id = 2 and set it as the initial markdown
    const document = data.find(doc => doc.id === 2);
    if (document) {
      setMarkdown(document.content);
    }
  }, []);

  const toggleEditorVisibility = () => {
    setIsEditorVisible(!isEditorVisible);
  };

  return (
    <div>
      <Navbar />
      <main className={`w-screen h-screen ${isEditorVisible ? 'grid grid-cols-2' : 'flex justify-center items-center'} bg-mainblack`}>
        {isEditorVisible && <Editor markdown={markdown} setMarkdown={setMarkdown} />}
        <Preview markdown={markdown} toggleEditorVisibility={toggleEditorVisibility} isEditorVisible={isEditorVisible} />
      </main>
    </div>
  );
}

export default App;
