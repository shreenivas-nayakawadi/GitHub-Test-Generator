// import { useState, useEffect } from 'react';
// import { Github, FileText, Code2, Copy, Check, Loader2, Search, Zap, Settings, Link2 } from 'lucide-react';
// import { getFiles, getFileContent, generateTests } from './api';

// function App() {
//   const [owner, setOwner] = useState('');
//   const [repo, setRepo] = useState('');
//   const [githubUrl, setGithubUrl] = useState('');
//   const [files, setFiles] = useState([]);
//   const [selected, setSelected] = useState('');
//   const [code, setCode] = useState('');
//   const [test, setTest] = useState('');
//   const [framework, setFramework] = useState('Jest');
//   const [isLoading, setIsLoading] = useState({
//     files: false,
//     content: false,
//     tests: false,
//     url: false
//   });
//   const [copied, setCopied] = useState(false);

//   // Parse URL on component mount if there's a GitHub URL in query params
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const url = params.get('repo');
//     if (url) {
//       handleUrlInput(url);
//     }
//   }, []);

//   const parseGitHubUrl = (url) => {
//     try {
//       // Handle various GitHub URL formats:
//       // https://github.com/owner/repo
//       // https://github.com/owner/repo/
//       // github.com/owner/repo
//       // owner/repo
//       const cleanedUrl = url.trim().replace(/^https?:\/\//, '').replace(/^github\.com\//, '').replace(/\/$/, '');
//       const parts = cleanedUrl.split('/');
      
//       if (parts.length >= 2) {
//         return {
//           owner: parts[0],
//           repo: parts[1]
//         };
//       }
//     } catch (e) {
//       console.error("Error parsing GitHub URL:", e);
//     }
//     return null;
//   };

//   const handleUrlInput = (url) => {
//     setGithubUrl(url);
//     const parsed = parseGitHubUrl(url);
//     if (parsed) {
//       setOwner(parsed.owner);
//       setRepo(parsed.repo);
//       // Update browser URL without reload
//       window.history.pushState({}, '', `?repo=${encodeURIComponent(url)}`);
//     }
//   };

//   const fetchFiles = async () => {
//     setIsLoading({...isLoading, files: true});
//     try {
//       const res = await getFiles(owner, repo);
//       setFiles(res.data.files);
//     } catch (error) {
//       console.error("Error fetching files:", error);
//     } finally {
//       setIsLoading({...isLoading, files: false});
//     }
//   };

//   const fetchCode = async (path) => {
//     setSelected(path);
//     setIsLoading({...isLoading, content: true});
//     try {
//       const res = await getFileContent(owner, repo, path);
//       setCode(res.data.content);
//       setTest('');
//     } catch (error) {
//       console.error("Error fetching file content:", error);
//     } finally {
//       setIsLoading({...isLoading, content: false});
//     }
//   };

//   const handleGenerate = async () => {
//     setIsLoading({...isLoading, tests: true});
//     try {
//       const res = await generateTests(code, framework);
//       setTest(res.data.testcase);
//     } catch (error) {
//       console.error("Error generating tests:", error);
//     } finally {
//       setIsLoading({...isLoading, tests: false});
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(test);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
//               <Github className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 GitHub Test Generator
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Automatically generate comprehensive test cases for your repository files
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Repository Input Section */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
//           <div className="flex flex-col space-y-4">
//             {/* URL Input */}
//             <div>
//               <label htmlFor="github-url" className="block text-sm font-medium text-gray-700 mb-2">
//                 GitHub Repository URL
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Link2 className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="github-url"
//                   type="text"
//                   placeholder="e.g. https://github.com/facebook/react or facebook/react"
//                   value={githubUrl}
//                   onChange={(e) => handleUrlInput(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//               <p className="mt-1 text-sm text-gray-500">
//                 Or enter the details manually below
//               </p>
//             </div>

//             {/* Manual Input Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-2">
//                   GitHub Owner
//                 </label>
//                 <input
//                   id="owner"
//                   type="text"
//                   placeholder="e.g. facebook"
//                   value={owner}
//                   onChange={(e) => setOwner(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="repo" className="block text-sm font-medium text-gray-700 mb-2">
//                   Repository Name
//                 </label>
//                 <input
//                   id="repo"
//                   type="text"
//                   placeholder="e.g. react"
//                   value={repo}
//                   onChange={(e) => setRepo(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={fetchFiles}
//                 disabled={!owner || !repo || isLoading.files}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 {isLoading.files ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     <span>Loading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Search className="w-5 h-5" />
//                     <span>Browse Files</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Current Repository Info */}
//         {owner && repo && (
//           <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Github className="w-5 h-5 text-blue-600" />
//               <span className="font-medium text-blue-800">
//                 Currently viewing: <span className="font-semibold">{owner}/{repo}</span>
//               </span>
//             </div>
//             <a 
//               href={`https://github.com/${owner}/${repo}`} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
//             >
//               View on GitHub
//               <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
//               </svg>
//             </a>
//           </div>
//         )}

//         {/* Rest of the components remain the same */}
//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Files Section */}
//           {files.length > 0 && (
//             <div className="space-y-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                       <FileText className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">Repository Files</h3>
//                       <p className="text-sm text-gray-600">Select a file to generate tests</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className=" overflow-y-auto max-h-96">
//                   {files.map((file) => (
//                     <button
//                       key={file}
//                       onClick={() => fetchCode(file)}
//                       disabled={isLoading.content}
//                       className={`w-full text-left px-6 py-3 transition-all duration-200 flex items-center justify-between group hover:bg-gray-50 ${
//                         selected === file 
//                           ? 'bg-blue-50 border-r-4 border-blue-500' 
//                           : 'border-b border-gray-50'
//                       } ${isLoading.content ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-2 h-2 rounded-full ${
//                           file.endsWith('.js') || file.endsWith('.ts') ? 'bg-yellow-400' :
//                           file.endsWith('.json') ? 'bg-green-400' :
//                           file.endsWith('.md') ? 'bg-blue-400' : 'bg-gray-400'
//                         }`} />
//                         <span className={`font-medium ${
//                           selected === file ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
//                         }`}>
//                           {file}
//                         </span>
//                       </div>
//                       {selected === file && isLoading.content && (
//                         <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Code and Tests Section */}
//           {code && (
//             <div className={`space-y-6 ${files.length === 0 ? 'lg:col-span-2' : ''}`}>
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <Code2 className="w-5 h-5 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">File Content</h3>
//                       <p className="text-sm text-green-700 font-mono">{selected}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
//                     <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
//                       <div className="flex space-x-2">
//                         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                         <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       </div>
//                       <span className="text-gray-300 text-sm ml-4">{selected}</span>
//                     </div>
//                     <div className="p-4 overflow-x-auto over ">
//                       <pre className="text-sm text-gray-100">
//                         <code>{code}</code>
//                       </pre>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-4 items-end">
//                     <div className="flex-1">
//                       <label htmlFor="framework" className="block text-sm font-medium text-gray-700 mb-2">
//                         Testing Framework
//                       </label>
//                       <div className="relative">
//                         <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <select
//                           id="framework"
//                           value={framework}
//                           onChange={(e) => setFramework(e.target.value)}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
//                         >
//                           <option value="Jest">Jest (JavaScript)</option>
//                           <option value="Mocha">Mocha (JavaScript)</option>
//                           <option value="Pytest">Pytest (Python)</option>
//                           <option value="RSpec">RSpec (Ruby)</option>
//                           <option value="JUnit">JUnit (Java)</option>
//                         </select>
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={handleGenerate}
//                       disabled={isLoading.tests}
//                       className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                     >
//                       {isLoading.tests ? (
//                         <>
//                           <Loader2 className="w-5 h-5 animate-spin" />
//                           <span>Generating...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Zap className="w-5 h-5" />
//                           <span>Generate Tests</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
        

//         {/* Test Results */}
//         {test && (
//           <div className="mt-8">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <Zap className="w-5 h-5 text-purple-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">Generated Test Cases</h3>
//                       <p className="text-sm text-purple-700">Using {framework}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleCopy}
//                     disabled={copied}
//                     className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:bg-green-50 disabled:border-green-200"
//                   >
//                     {copied ? (
//                       <>
//                         <Check className="w-4 h-4 text-green-600" />
//                         <span className="text-sm font-medium text-green-700">Copied!</span>
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="w-4 h-4 text-gray-600" />
//                         <span className="text-sm font-medium text-gray-700">Copy</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="bg-gray-900 rounded-lg overflow-hidden">
//                   <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <div className="flex space-x-2">
//                         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                         <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       </div>
//                       <span className="text-gray-300 text-sm ml-4">test.{framework.toLowerCase()}.js</span>
//                     </div>
//                     <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{framework}</span>
//                   </div>
//                   <div className="p-4 overflow-x-auto max-h-96">
//                     <pre className="text-sm text-gray-100">
//                       <code>{test}</code>
//                     </pre>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {files.length === 0 && !isLoading.files && (
//           <div className="text-center py-16">
//             <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
//               <Github className="w-12 h-12 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate Tests</h3>
//             <p className="text-gray-600 max-w-md mx-auto">
//               Enter a GitHub repository URL or owner/name above to get started. We'll help you generate comprehensive test cases for any file in the repository.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-100 mt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <p className="text-gray-600">
//                Workrik Internship Assignment
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import { Github, FileText, Code2, Copy, Check, Loader2, Search, Zap, Settings, Link2 } from 'lucide-react';
import { getFiles, getFileContent, generateTests } from './api';

function App() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState('');
  const [code, setCode] = useState('');
  const [test, setTest] = useState('');
  const [framework, setFramework] = useState('Jest');
  const [isLoading, setIsLoading] = useState({
    files: false,
    content: false,
    tests: false,
    url: false
  });
  const [copied, setCopied] = useState(false);

  // Parse URL on component mount if there's a GitHub URL in query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get('repo');
    if (url) {
      handleUrlInput(url);
    }
  }, []);

  const parseGitHubUrl = (url) => {
    try {
      // Handle various GitHub URL formats:
      // https://github.com/owner/repo
      // https://github.com/owner/repo/
      // github.com/owner/repo
      // owner/repo
      const cleanedUrl = url.trim().replace(/^https?:\/\//, '').replace(/^github\.com\//, '').replace(/\/$/, '');
      const parts = cleanedUrl.split('/');
      
      if (parts.length >= 2) {
        return {
          owner: parts[0],
          repo: parts[1]
        };
      }
    } catch (e) {
      console.error("Error parsing GitHub URL:", e);
    }
    return null;
  };

  const handleUrlInput = (url) => {
    setGithubUrl(url);
    const parsed = parseGitHubUrl(url);
    if (parsed) {
      setOwner(parsed.owner);
      setRepo(parsed.repo);
      // Update browser URL without reload
      window.history.pushState({}, '', `?repo=${encodeURIComponent(url)}`);
    }
  };

  const fetchFiles = async () => {
    setIsLoading({...isLoading, files: true});
    try {
      const res = await getFiles(owner, repo);
      setFiles(res.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsLoading({...isLoading, files: false});
    }
  };

  const fetchCode = async (path) => {
    setSelected(path);
    setIsLoading({...isLoading, content: true});
    try {
      const res = await getFileContent(owner, repo, path);
      setCode(res.data.content);
      setTest('');
    } catch (error) {
      console.error("Error fetching file content:", error);
    } finally {
      setIsLoading({...isLoading, content: false});
    }
  };

  const handleGenerate = async () => {
    setIsLoading({...isLoading, tests: true});
    try {
      const res = await generateTests(code, framework);
      setTest(res.data.testcase);
    } catch (error) {
      console.error("Error generating tests:", error);
    } finally {
      setIsLoading({...isLoading, tests: false});
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(test);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Github className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                GitHub Test Generator
              </h1>
              <p className="text-gray-600 mt-1">
                Automatically generate comprehensive test cases for your repository files
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Repository Input Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col space-y-4">
            {/* URL Input */}
            <div>
              <label htmlFor="github-url" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Repository URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="github-url"
                  type="text"
                  placeholder="e.g. https://github.com/facebook/react or facebook/react"
                  value={githubUrl}
                  onChange={(e) => handleUrlInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Or enter the details manually below
              </p>
            </div>

            {/* Manual Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Owner
                </label>
                <input
                  id="owner"
                  type="text"
                  placeholder="e.g. facebook"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="repo" className="block text-sm font-medium text-gray-700 mb-2">
                  Repository Name
                </label>
                <input
                  id="repo"
                  type="text"
                  placeholder="e.g. react"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={fetchFiles}
                disabled={!owner || !repo || isLoading.files}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading.files ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Browse Files</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Current Repository Info */}
        {owner && repo && (
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Github className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                Currently viewing: <span className="font-semibold">{owner}/{repo}</span>
              </span>
            </div>
            <a 
              href={`https://github.com/${owner}/${repo}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
            >
              View on GitHub
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        )}

        {/* Rest of the components remain the same */}
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Files Section */}
          {files.length > 0 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Repository Files</h3>
                      <p className="text-sm text-gray-600">Select a file to generate tests</p>
                    </div>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {files.map((file) => (
                    <button
                      key={file}
                      onClick={() => fetchCode(file)}
                      disabled={isLoading.content}
                      className={`w-full text-left px-6 py-3 transition-all duration-200 flex items-center justify-between group hover:bg-gray-50 ${
                        selected === file 
                          ? 'bg-blue-50 border-r-4 border-blue-500' 
                          : 'border-b border-gray-50'
                      } ${isLoading.content ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          file.endsWith('.js') || file.endsWith('.ts') ? 'bg-yellow-400' :
                          file.endsWith('.json') ? 'bg-green-400' :
                          file.endsWith('.md') ? 'bg-blue-400' : 'bg-gray-400'
                        }`} />
                        <span className={`font-medium ${
                          selected === file ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {file}
                        </span>
                      </div>
                      {selected === file && isLoading.content && (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Code and Tests Section */}
          {code && (
            <div className={`space-y-6 ${files.length === 0 ? 'lg:col-span-2' : ''}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Code2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">File Content</h3>
                      <p className="text-sm text-green-700 font-mono">{selected}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
                    <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm ml-4">{selected}</span>
                    </div>
                    <div className="p-4 overflow-x-auto max-h-96">
                      <pre className="text-sm text-gray-100">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <label htmlFor="framework" className="block text-sm font-medium text-gray-700 mb-2">
                        Testing Framework
                      </label>
                      <div className="relative">
                        <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          id="framework"
                          value={framework}
                          onChange={(e) => setFramework(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        >
                          <option value="Jest">Jest (JavaScript)</option>
                          <option value="Mocha">Mocha (JavaScript)</option>
                          <option value="Pytest">Pytest (Python)</option>
                          <option value="RSpec">RSpec (Ruby)</option>
                          <option value="JUnit">JUnit (Java)</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleGenerate}
                      disabled={isLoading.tests}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {isLoading.tests ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Generate Tests</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Test Results */}
        {test && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Generated Test Cases</h3>
                      <p className="text-sm text-purple-700">Using {framework}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    disabled={copied}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:bg-green-50 disabled:border-green-200"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-300 text-sm ml-4">test.{framework.toLowerCase()}.js</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{framework}</span>
                  </div>
                  <div className="p-4 overflow-x-auto max-h-96">
                    <pre className="text-sm text-gray-100">
                      <code>{test}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {files.length === 0 && !isLoading.files && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Github className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate Tests</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a GitHub repository URL or owner/name above to get started. We'll help you generate comprehensive test cases for any file in the repository.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Need help? Check out our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                documentation
              </a>{' '}
              or{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                contact support
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;