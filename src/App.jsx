import { useState, useEffect } from "react";
import axios from "axios";
import Preview from "./components/Preview";
import Editor from "./components/editor";
import Navbar from "./components/navbar";

function App() {
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const primary_url = "https://backend-1-wilh.onrender.com"

  useEffect(() => {
    axios.get(`${primary_url}/documents`)
      .then(response => {
        setDocuments(response.data);
        const document = response.data.find(doc => doc.id === 0);
        if (document) {
          setCurrentDocument(document);
          setMarkdown(document.content);
        }
      })
      .catch(error => {
        console.error('Error loading documents:', error);
      });
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsEditorVisible(true);
        setIsPreviewVisible(false);
      } else {
        setIsEditorVisible(true);
        setIsPreviewVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleEditorVisibility = () => {
    setIsEditorVisible(!isEditorVisible);
    if (window.innerWidth <= 768) {
      setIsPreviewVisible(!isPreviewVisible);
    }
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
    setCurrentDocument(newDocument);
    setMarkdown(newDocument.content);

    axios.post(`${primary_url}/documents`, newDocument)
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
      setCurrentDocument(document);
      setMarkdown(document.content);
    }
  };

  const saveDocument = (name) => {
    if (currentDocument) {
      const updatedDocument = { ...currentDocument, content: markdown , name };
      console.log(updatedDocument)
      axios.put(`${primary_url}/documents/${currentDocument.id}`, updatedDocument)
        .then(response => {
          console.log(response.data);
          setDocuments(documents.map(doc => doc.id === currentDocument.id ? updatedDocument : doc));
        })
        .catch(error => {
          console.error('Error updating document:', error);
        });
    }
  };

  const deleteDocument = () => {
    if (currentDocument) {
      axios.delete(`${primary_url}/documents/${currentDocument.id}`)
        .then(response => {
          console.log(response.data);
          const updatedDocuments = documents.filter(doc => doc.id !== currentDocument.id);
          setDocuments(updatedDocuments);

          let newCurrentDocument = null;
          if (updatedDocuments.length > 0) {
            const currentIndex = documents.findIndex(doc => doc.id === currentDocument.id);
            if (currentIndex < updatedDocuments.length) {
              newCurrentDocument = updatedDocuments[(currentIndex)];

            // Next document
            } else {
              newCurrentDocument = updatedDocuments[(currentIndex - 1)]; // Previous document
            }
          }

          if (newCurrentDocument) {
            setCurrentDocument(newCurrentDocument);
            setMarkdown(newCurrentDocument.content);
          } else {
            setCurrentDocument(null);
            setMarkdown('');
          }

          const tempName = currentDocument.name;
          console.log(`Deleted document: ${tempName}`);
        })
        .catch(error => {
          console.error('Error deleting document:', error);
        });
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div>
      <Navbar 
        documents={documents} 
        loadNewDocument={loadNewDocument} 
        loadDocumentContent={loadDocumentContent} 
        saveDocument={saveDocument}
        deleteDocument={deleteDocument}
        toggleTheme={toggleTheme}
        isDarkTheme={isDarkTheme}
      />
      <main className={`w-screen h-screen ${isDarkTheme ? 'bg-mainblack' : 'bg-white'} ${isEditorVisible && isPreviewVisible ? 'grid grid-cols-2' : 'flex justify-center items-center'} flex-col md:flex-row`}>
        {isEditorVisible && <Editor markdown={markdown} setMarkdown={setMarkdown} isDarkTheme={isDarkTheme} toggleEditorVisibility={toggleEditorVisibility} className="w-full h-full" />}
        {isPreviewVisible && <Preview markdown={markdown} toggleEditorVisibility={toggleEditorVisibility} isEditorVisible={isEditorVisible} isDarkTheme={isDarkTheme} className="w-full h-full" />}
      </main>
    </div>
  );
}

export default App;
