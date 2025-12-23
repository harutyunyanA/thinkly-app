// import { CheckCircle } from "lucide-react";

// export function CreateQuizSettings() {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-6 w-full">
//       {/* Header */}
//       <div>
//         <h2 className="text-xl font-semibold text-gray-900">Quiz Settings</h2>
//         <p className="text-sm text-gray-500">Configure how your quiz works</p>
//       </div>

//       {/* Passing Score */}
//       <div className="flex flex-col gap-2">
//         <label className="text-sm font-medium text-gray-700">
//           Passing Score
//         </label>

//         <div className="flex items-center gap-2">
//           <div className="relative flex items-center w-full">
//             <CheckCircle className="w-4 h-4 text-gray-400 absolute left-3" />

//             <input
//               type="number"
//               min={0}
//               max={100}
//               placeholder="70"
//               onChange={(e) => {
//                 const value = Math.max(
//                   0,
//                   Math.min(100, Number(e.target.value))
//                 );
//                 e.target.value = String(value);
//               }}
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>

//           <span className="text-sm text-gray-500">%</span>
//         </div>
//       </div>

//       {/* Switch Row */}
//       <div className="flex flex-col gap-5 pt-4">
//         {/* Randomize Questions */}
//         <div className="flex items-center justify-between">
//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-800">
//               Randomize Questions
//             </span>
//             <span className="text-xs text-gray-500">
//               Show questions in random order
//             </span>
//           </div>

//           <label className="relative inline-flex items-center cursor-pointer">
//             <input type="checkbox" className="sr-only peer" defaultChecked />
//             <div
//               className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer 
//                 peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 
//                 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:h-4 after:w-4 
//                 after:rounded-full after:transition-all"
//             ></div>
//           </label>
//         </div>

//         {/* Immediate Results */}
//         <div className="flex items-center justify-between">
//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-gray-800">
//               Immediate Results
//             </span>
//             <span className="text-xs text-gray-500">
//               Show results for each question
//             </span>
//           </div>

//           <label className="relative inline-flex items-center cursor-pointer">
//             <input type="checkbox" className="sr-only peer" defaultChecked />
//             <div
//               className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer 
//                 peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 
//                 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:h-4 after:w-4 
//                 after:rounded-full after:transition-all"
//             ></div>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }
