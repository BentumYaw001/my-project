import { useState } from "react";
import Preview from "./components/Preview";
import Editor from "./components/editor";
import { Navbar } from "./components/navbar";


function App() {
    const [markdown, setMarkdown]  = useState("# Bentum");
    return(
        <div>
            <Navbar/>
            
           <main className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 bg-gray-800">
             <Editor markdown={markdown} setMarkdown={setMarkdown}/>
             <Preview markdown={markdown}/>
           </main>
        </div>
        
    )}

export default App;