import { useState } from "react";
import PropTypes from 'prop-types';

const Navbar = ({ documents, loadNewDocument, loadDocumentContent, saveDocument, deleteDocument }) => {
  const [documentName, setDocumentName] = useState("welcome.md");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(documentName);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleInputChange = (e) => {
    setTempName(e.target.value);
  };

  const updateDocumentName = async (id, newName) => {
    try {
      const response = await fetch(`http://localhost:3001/documents/${id}/name`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update document name');
      }
      console.log('Document name updated successfully');
    } catch (error) {
      console.error('Error updating document name:', error);
    }
  };
  

  const handleSave = () => {
    let newName = tempName;
    if (!newName.endsWith(".md")) {
      newName += ".md";
    }
    setDocumentName(newName);
    setIsEditing(false);
    const currentDocument = documents.find(doc => doc.name === documentName);
    if (currentDocument) {
      updateDocumentName(currentDocument.id, newName); // Update the document name in the data.json file
    }
  };
  

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const NewDocument = () => {
    loadNewDocument();
  };

  const SaveDocument = () => {
    saveDocument();
    alert('Document saved.');
  };

  const DeleteDocument = () => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      deleteDocument();
    }
  };

  return (
    <>
      <nav className="bg-customblack2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex justify-center font-semibold  text-white">
            <button id="openBtn" onClick={handleOpenSidebar}>
              <img
                src="/src/assets/icon-menu.svg"
                className="mr-3 hover:bg-customRed py-5 px-4 bg-customblack3"
                alt="Menu Icon" />
            </button>
            <div className="flex justify-center mt-4"> MARKDOWN</div>
          </div>
          <span className="border-l border-white mx-4 h-10" />
          <div className="flex flex-row justify-center ml-5">
            <img
              src="/src/assets/icon-document.svg"
              alt="Document Icon"
              className="h-5 w-4 my-auto" />
            <div className="text-gray-400 text-lg font-semibold items-center ml-5 flex-col justify-center">
              <p>Document Name</p>
              {isEditing ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={tempName}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    autoFocus
                    className=" bg-transparent text-white focus:outline-none focus:border-b border-white caret-red-500 cursor-pointer" />
                </div>
              ) : (
                <p
                  className="text-white cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  {documentName}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button
            onClick={DeleteDocument}
            id="deleteDocBtn"
            className="group" >
            <svg
              width="18"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-gray-500 group-hover:text-customRed"
            >
              <path d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" />
            </svg>
          </button>
          <button
            onClick={SaveDocument}
            id="saveDocBtn"
            className="ml-2 items-center text-white flex flex-row bg-customRed p-2 rounded-sm mr-4 hover:bg-customredhover"
          >
            <img
              src="/src/assets/icon-save.svg"
              className="mr-2"
              alt="Save Icon" />
            Save Changes
          </button>
        </div>
      </nav>
      <div className={`fixed inset-0 z-50 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-900 bg-opacity-75`}>
        <div className="w-64 bg-mainblack h-full p-4">
          <div className="flex justify-end">
            <button id="closeBtn" onClick={handleCloseSidebar}>
              <img
                src="/src/assets/icon-close.svg"
                className=""
                alt="Close Icon" />
            </button>
          </div>
          <div>
            <div className="flew flex-row items-center font-semibold text-customgray mb-8">MY DOCUMENTS
            </div>
            <button
              id="newDocBtn"
              className="text-white flex flex-row items-center font-semibold bg-customRed py-2 px-8 rounded-sm mb-4 ml-2 hover:bg-customredhover"
              onClick={NewDocument}
            >
              
             + New Document
            </button>

            <ul className="text-white text-between-xs-sm items-center">
              {documents.map((document) => (
                <li
                  key={document.id}
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    loadDocumentContent(document.id);
                    setDocumentName(document.name); // Update the document name when loaded
                    setTempName(document.name); // Ensure tempName is also updated
                    handleCloseSidebar();
                  }}
                >
                  <div className="flex flew-col items-center overflow-y-auto">
                  <img
                src="/src/assets/icon-document.svg"
                className="h-4 w-3 mr-2"
                alt="New Document Icon" />
                <div className="flex flex-col justify-between">
                  <div className="flex text-customgray">
                  {document.createdAt}
                  </div>
                
                <div className=" hover:text-customRed">
                {document.name}  
                </div>
               
                </div>
                
                  </div>
                
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  documents: PropTypes.array.isRequired,
  loadNewDocument: PropTypes.func.isRequired,
  loadDocumentContent: PropTypes.func.isRequired,
  saveDocument: PropTypes.func.isRequired,
  updateDocumentName: PropTypes.func.isRequired, 
  deleteDocument: PropTypes.func.isRequired, 
};

export default Navbar;
