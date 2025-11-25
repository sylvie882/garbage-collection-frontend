// // hooks/useCopyProtection.ts
// import { useEffect } from 'react';

// export function useCopyProtection() {
//   useEffect(() => {
//     const handleCopy = (e: ClipboardEvent) => {
//       e.preventDefault();
//       alert('Copying content is disabled on this website.');
//     };

//     const handleCut = (e: ClipboardEvent) => {
//       e.preventDefault();
//       alert('Cutting content is disabled on this website.');
//     };

//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//       alert('Right-click is disabled on this website.');
//     };

//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Disable Ctrl+C, Ctrl+X, Ctrl+A
//       if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
//         e.preventDefault();
//         alert('This action is disabled on this website.');
//       }
      
//       // Disable right-click context menu key
//       if (e.key === 'ContextMenu') {
//         e.preventDefault();
//       }
//     };

//     // Disable text selection
//     document.addEventListener('selectstart', (e) => e.preventDefault());
//     document.addEventListener('copy', handleCopy);
//     document.addEventListener('cut', handleCut);
//     document.addEventListener('contextmenu', handleContextMenu);
//     document.addEventListener('keydown', handleKeyDown);

//     // Disable drag and drop of images
//     document.addEventListener('dragstart', (e) => e.preventDefault());

//     return () => {
//       document.removeEventListener('selectstart', (e) => e.preventDefault());
//       document.removeEventListener('copy', handleCopy);
//       document.removeEventListener('cut', handleCut);
//       document.removeEventListener('contextmenu', handleContextMenu);
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('dragstart', (e) => e.preventDefault());
//     };
//   }, []);
// }