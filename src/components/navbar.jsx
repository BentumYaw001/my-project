/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import Modal from 'react-modal'; // Import react-modal
import iconMenu from "../assets/icon-menu.svg"
import iconDocument from "../assets/icon-document.svg"
import iconSave from "../assets/icon-save.svg"
import toggleOff from "../assets/toggle-off.svg"
import toggleOn from "../assets/toggle-on.svg"
import lightMode from "../assets/light-mode.svg"
import iconClose from "../assets/icon-close.svg"
import iconDark from "../assets/dark-mode.svg"



const Navbar = ({ documents, loadNewDocument, loadDocumentContent, saveDocument, deleteDocument, toggleTheme, isDarkTheme }) => {

  const [documentName, setDocumentName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmartphone, setIsSmartphone] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); // State for save confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal

  useEffect(() => {
    axios.get('http://localhost:3001/documents')
      .then(response => {
        setTempName(response.data);
        const document = response.data.find(doc => doc.id === 0);
        if (document) {
          setTempName(document.name);
          setDocumentName(document.name);
          setCurrentDocument(document); // Set current document
        }
      })
      .catch(error => {
        console.error('Error loading documents:', error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmartphone(window.innerWidth <= 640); // Smartphone breakpoint
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 768); // Tablet breakpoint
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    setTempName(e.target.value);
  };

  const updateDocumentName = async (id, newName) => {
    try {
      const response = await fetch(`http://localhost:5000/documents/${id}/name`, {
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
    if (currentDocument) {
      updateDocumentName(currentDocument.id, newName); 
      saveDocument(); 
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

  const handleDelete = () => {
    deleteDocument();
    setIsDeleteModalOpen(false); 
    setCurrentDocument(document);
  };

  const DeleteDocument = () => {
    setIsDeleteModalOpen(true); 
    setCurrentDocument(document);
  };

  return (
    <>
      <nav className="bg-customblack2 flex items-center justify-between">
      
        <div className="flex items-center">
          <div className="flex justify-center font-semibold text-white">
            <button id="openBtn" onClick={handleOpenSidebar}>
              <img
                src={iconMenu}
                className="mr-3 hover:bg-customRed py-5 px-4 bg-customblack3"
                alt="Menu Icon" />
            </button>
            {!isSmartphone && !isTablet && (
              <div className="flex justify-center mt-4"> MARKDOWN</div>
            )}
          </div>
          {!isSmartphone && !isTablet && (
            <span className="border-l border-white mx-4 h-10" />
          )}
          <div className="flex flex-row justify-center ml-5">
            <img
              src={iconDocument}
              alt="Document Icon"
              className="h-5 w-4 my-auto" />
            <div className="text-gray-400 text-lg font-semibold items-center ml-5 flex-col justify-center">
              {!isSmartphone && <p>Document Name</p>}
              {isEditing ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={tempName}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    autoFocus
                    className="bg-transparent text-white focus:outline-none focus:border-b border-white caret-red-500 cursor-pointer" />
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
          {!isSmartphone && (
            <button
              id="saveDocBtn"
              className="ml-2 items-center text-white flex flex-row bg-customRed p-2 rounded-sm mr-4 hover:bg-customredhover"
              onClick={handleSave}
            >
              <img
                src={iconSave}
                className="mr-2"
                alt="Save Icon" />
              {!isSmartphone && 'Save Changes'}
            </button>
          )}
          {isSmartphone && (
            <button
              id="saveDocBtn"
              className="ml-2 items-center text-white flex flex-row bg-customRed p-2 rounded-sm mr-4 hover:bg-customredhover"
              onClick={handleSave}
            >
              <img
                src={iconSave}
                className="mr-2"
                alt="Save Icon" />
            </button>
          )}
        </div>
      </nav>

      {/* Modal for Save Confirmation */}
      <Modal
        isOpen={isSaveModalOpen}
        onRequestClose={() => setIsSaveModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <h2 className="text-center mb-4">Changes saved successfully!</h2>
        <button
          className="bg-customRed text-white py-2 px-4 rounded w-full hover:bg-customredhover"
          onClick={() => setIsSaveModalOpen(false)}
        >
         OK
        </button>
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width:'400px',
            backgroundColor: isDarkTheme ? 'black' : 'white',
            color: isDarkTheme ? 'white' : 'black',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '2rem',
            borderRadius: '0.5rem',
            border: 'none',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <h2 className=" mb-1 font-bold ">Delete this document?
</h2>
<p className="flex p-1 mb-2 font-san">Are you sure you want to delete the <br/>'{tempName}.md' document and its contents?  
<br />This action cannot be reversed.</p>
        <div className="flex justify-center">
          <button
            className="bg-customRed text-white py-2 px-4 rounded mr-1 w-full hover:bg-customredhover"
            onClick={handleDelete}
          >
          Confirm & Delete
          </button>
        </div>
      </Modal>

      <div className={`fixed inset-0 z-50 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-900 bg-opacity-75`}>
        <div className="w-64 bg-mainblack h-full p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-end">
              <button id="closeBtn" onClick={handleCloseSidebar}>
                <img
                  src={iconClose}
                  className=""
                  alt="Close Icon" />
              </button>
            </div>
            <div className="flex flex-row items-center font-semibold text-customgray mb-8">MY DOCUMENTS</div>
            <button
              id="newDocBtn"
              className="text-white flex flex-row items-center font-semibold bg-customRed py-2 px-8 rounded-sm mb-4 ml-2 hover:bg-customredhover"
              onClick={NewDocument}
            >
              + New Document
            </button>
            <ul className="text-white text-between-xs-sm items-center overflow-y-auto">
              {documents.map((document) => (
                <li
                  key={document.id}
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    loadDocumentContent(document.id);
                    setDocumentName(document.name); 
                    setTempName(document.name); 
                    setCurrentDocument(document); 
                    handleCloseSidebar();
                  }}
                >
                  <div className="flex items-center">
                    <img
                      src={iconDocument}
                      className="h-4 w-3 mr-2"
                      alt="New Document Icon" />
                    <div className="flex flex-col">
                      <div className="flex text-customgray">
                        {document.createdAt}
                      </div>
                      <div className="hover:text-customRed">
                        {currentDocument && document.id === currentDocument.id ? tempName : document.name}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleTheme}
              id="themeToggleBtn"
              className="text-white flex items-center p-2 rounded-sm"
            >
              <img src={iconDark} alt="Dark Mode Icon" />
              {isDarkTheme ? (
                <img src={toggleOff} alt="Toggle Off Icon" />
              ) : (
                <img src={toggleOn} alt="Toggle On Icon" />
              )}
              <img src={lightMode} alt="Light Mode Icon" />
            </button>
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
  deleteDocument: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
  tempName:PropTypes.func.isRequired,
};

export default Navbar;
