
import { useState, useEffect } from "react";
import axios from "axios";
import Preview from "./components/Preview";
import Editor from "./components/editor";
import Navbar from "./components/navbar";


function App() {
  const [documents, setDocuments] = useState([]);
  const [markdown, setMarkdown] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/documents')
      .then(response => {
        setDocuments(response.data);
        const document = response.data.find(doc => doc.id === 2);
        if (document) {
          setMarkdown(document.content);
        }
      })
      .catch(error => {
        console.error('Error loading documents:', error);
      });
  }, []);

  const toggleEditorVisibility = () => {
    setIsEditorVisible(!isEditorVisible);
  };

  const generateUniqueName = (baseName) => {
    let name = baseName;
    let counter = 1;
    while (documents.some(doc => doc.name === name)) {
      name = `${baseName} (${counter})`;
      counter++;
    }
    return name;
  };

  const loadNewDocument = () => {
    const newName = generateUniqueName("untitled-document.md");
    const newDocument = {
      id: documents.length + 1,
      createdAt: new Date().toISOString().split('T')[0], // current date in 'YYYY-MM-DD' format
      name: newName,
      content: ""
    };
    setDocuments([...documents, newDocument]);
    setMarkdown(newDocument.content);

    axios.post('http://localhost:3001/documents', newDocument)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error saving new document:', error);
      });
  };

  const loadDocumentContent = (id) => {
    const document = documents.find(doc => doc.id === id);
    if (document) {
      setMarkdown(document.content);
    }
  };

  return (
    <div>
      <Navbar 
        documents={documents} 
        loadNewDocument={loadNewDocument} 
        loadDocumentContent={loadDocumentContent} 
      />
      <main className={`w-screen h-screen ${isEditorVisible ? 'grid grid-cols-2' : 'flex justify-center items-center'} bg-mainblack`}>
        {isEditorVisible && <Editor markdown={markdown} setMarkdown={setMarkdown} />}
        <Preview markdown={markdown} toggleEditorVisibility={toggleEditorVisibility} isEditorVisible={isEditorVisible} />
      </main>
    </div>
  );
}

export default App;
