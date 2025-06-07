// import type React from "react"

// // import "../../styles/components/VideoLabel.css";
// import { useState, useRef, useEffect } from "react"
// import { useAuth, useChatSocket } from "../../hooks";


// const VideoLabel = ({ label, isLocalStreamIsOn }: { label: string, isLocalStreamIsOn: boolean }) => {

//   const [showMessageBox, setShowMessageBox] = useState(false)
//   const [showEmojis, setShowEmojis] = useState(false)
//   const [message, setMessage] = useState("")
//   const messageInputRef = useRef<HTMLInputElement>(null)
//   const { isAuthenticated } = useAuth();

//   const chatSocket = useChatSocket({ isLocalStreamIsOn, isUserVerify: isAuthenticated });

//   const handleSend = () => {
//     if (message.trim()) {
//       console.log("Message sent:", message)
//       setMessage("")
//       setShowMessageBox(false)
//     }
//   }

//   const handleEmojiClick = (emoji: string) => {
//     console.log("Emoji sent:", emoji)
//     setShowEmojis(false)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSend()
//     }
//   }

//   useEffect(() => {
//     if (showMessageBox && messageInputRef.current) {
//       messageInputRef.current.focus()
//     }
//   }, [showMessageBox])

//   return (
//     <div className="absolute bottom-3 left-3 z-50 font-sans">
//       {/* Label Display */}
//       <div className="inline-block mb-2 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20 shadow-lg">
//         {label}
//       </div>

//       {/* Controls for "You" */}
//       {label === "You" && (
//         <div className="flex items-end gap-2 relative">
//           {/* Message Button */}
//           <button
//             className="group flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-medium rounded-full border border-black/10 shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg transition-all duration-200 ease-out"
//             onClick={() => {
//               setShowMessageBox((prev) => !prev)
//               setShowEmojis(false)
//             }}
//           >
//             <span className="text-base">💬</span>
//             <span className="hidden sm:inline">Message</span>
//           </button>

//           {/* Emoji Button */}
//           <button
//             className="group flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-medium rounded-full border border-black/10 shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg transition-all duration-200 ease-out"
//             onClick={() => {
//               setShowEmojis((prev) => !prev)
//               setShowMessageBox(false)
//             }}
//           >
//             <span className="text-base">😊</span>
//             <span className="hidden sm:inline">React</span>
//           </button>

//           {/* Message Popup */}
//           {showMessageBox && (
//             <div className="absolute bottom-full left-0 mb-2 p-3 bg-white/98 backdrop-blur-xl rounded-2xl border border-black/10 shadow-2xl animate-in slide-in-from-bottom-2 duration-200 min-w-[280px] sm:min-w-[320px]">
//               <div className="flex items-center gap-2">
//                 <input
//                   ref={messageInputRef}
//                   type="text"
//                   className="flex-1 px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                 />
//                 <button
//                   className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 active:translate-y-0 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 shadow-lg hover:shadow-xl"
//                   onClick={handleSend}
//                   disabled={!message.trim()}
//                 >
//                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="m22 2-7 20-4-9-9-4z" />
//                     <path d="M22 2 11 13" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Emoji Popup */}
//           {showEmojis && (
//             <div className="absolute bottom-full left-0 mb-2 p-4 bg-white/98 backdrop-blur-xl rounded-2xl border border-black/10 shadow-2xl animate-in slide-in-from-bottom-2 duration-200 min-w-[240px] sm:min-w-[280px]">
//               <div className="text-xs font-semibold text-gray-700 mb-3">Quick Reactions</div>
//               <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//                 {[
//                   { emoji: "👍", label: "thumbs up" },
//                   { emoji: "👏", label: "clap" },
//                   { emoji: "😀", label: "smile" },
//                   { emoji: "😂", label: "laugh" },
//                   { emoji: "😍", label: "heart eyes" },
//                   { emoji: "😎", label: "cool" },
//                   { emoji: "🤔", label: "thinking" },
//                   { emoji: "👋", label: "wave" },
//                 ].map(({ emoji, label }) => (
//                   <button
//                     key={emoji}
//                     className="aspect-square p-3 text-xl bg-gray-50 hover:bg-blue-50 hover:scale-110 active:scale-95 rounded-xl transition-all duration-200 ease-out hover:shadow-md"
//                     onClick={() => handleEmojiClick(emoji)}
//                     title={label}
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default VideoLabel

