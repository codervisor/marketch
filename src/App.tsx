import { useState } from 'react'

const defaultCode = `# Page Title
> Card (padding: large)
  > Row (justify: between)
    * [Text] "Dashboard" (size: lg)
    * [Button] "Logout"
  * [Input] "Search..."`;

function App() {
  const [code, setCode] = useState(defaultCode)

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Panel - Editor */}
      <div className="w-1/2 border-r-2 border-black flex flex-col">
        <div className="bg-gray-100 border-b-2 border-black p-4">
          <h2 className="text-lg font-bold">Marketch Editor</h2>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none"
          placeholder="Enter Marketch code here..."
        />
      </div>

      {/* Right Panel - Preview */}
      <div className="w-1/2 flex flex-col">
        <div className="bg-gray-100 border-b-2 border-black p-4">
          <h2 className="text-lg font-bold">Preview</h2>
        </div>
        <div className="flex-1 p-4 bg-white overflow-auto">
          <div className="text-gray-500 text-center mt-8">
            Preview will render here...
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
