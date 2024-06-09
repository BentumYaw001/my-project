
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const newDocBtn = document.getElementById('newDocBtn');
    const saveDocBtn = document.getElementById('saveDocBtn');
    const deleteDocBtn = document.getElementById('deleteDocBtn');
    const docList = document.getElementById('docList');
    const docTitle = document.getElementById('docTitle');
    const docContent = document.getElementById('docContent');
    const themeBtn = document.getElementById('themeBtn');
    const themeToggleIcon = document.getElementById('themeToggleIcon');
    const downloadDocBtn = document.getElementById('downloadDocBtn');

    // openBtn.addEventListener('click', () => {
    //     sidebar.style.width = '250px';
    //     loadDocumentList();
    // });

    // closeBtn.addEventListener('click', () => {
    //     sidebar.style.width = '0';
    // });

    // newDocBtn.addEventListener('click', () => {
    //     docTitle.textContent = 'Untitled Document';
    //     docContent.value = '';
    // });

    saveDocBtn.addEventListener('click', () => {
        const title = prompt('Enter document title:', docTitle.textContent);
        // if (title) {
        //     docTitle.textContent = title;
        //     localStorage.setItem(title, docContent.value);
        //     loadDocumentList();
        //     alert('Document saved.');
        // }
    });

    deleteDocBtn.addEventListener('click', () => {
        const title = docTitle.textContent;
        if (confirm('Are you sure you want to delete this document?')) {
            localStorage.removeItem(title);
            docTitle.textContent = 'Untitled Document';
            docContent.value = '';
            loadDocumentList();
            alert('Document deleted.');
        }
    });

    function loadDocumentList() {
        docList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const p = document.createElement('p');
            p.textContent = key;
            p.addEventListener('click', () => {
                docTitle.textContent = key;
                docContent.value = localStorage.getItem(key);
                sidebar.style.width = '0';  // Close the sidebar when a document is clicked
            });
            docList.appendChild(p);
        }
    }


    downloadDocBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(docContent.value, 10, 10);
        doc.save('document.pdf');
    });

    // Load saved document on page load
    const savedContent = localStorage.getItem('documentContent');
    if (savedContent) {
        editor.value = savedContent;
    }
   
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });

    themeToggleIcon.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });

    // Set default theme
    document.body.classList.add('light-theme');

    loadDocumentList();
});
