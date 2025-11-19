import React, { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Ikon dari lucide-react.
 * Didefinisikan sebagai komponen SVG inline agar ringan dan kompatibel.
 */
const ICONS = {
  UploadCloud: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/>
    </svg>
  ),
  History: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>
    </svg>
  ),
  Palette: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.648 0-.926-.746-1.648-1.648-1.648s-1.648.746-1.648 1.648S10.926 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
    </svg>
  ),
  FileText: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
    </svg>
  ),
  Trash2: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M5 6l1.61-1.61a1 1 0 0 1 .7-.39h4.38a1 1 0 0 1 .7.39L19 6"/>
    </svg>
  ),
  Clipboard: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11v4"/><path d="M8 13h8"/>
    </svg>
  ),
  ClipboardCheck: ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>
     </svg>
  ),
  Loader2: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  CheckCircle2: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  XCircle: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
    </svg>
  ),
  AlertTriangle: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  ),
  Wand: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.88 1.12-2.83 2.83-1.42 1.42-2.82 2.83-2.83 2.83-1.42 1.42-2.82 2.83-2.83 2.83a1 1 0 0 0 1.41 1.41l2.83-2.83 2.82-2.83 1.42-1.42 2.83-2.83 2.82-2.83 1.42-1.42 2.83-2.83a1 1 0 0 0-1.41-1.41Z"/><path d="m11 2.17 1.83 1.83m-1.42 8.42 1.83 1.83m-10.25-4.66 1.83 1.83m8.42-1.42 1.83 1.83M3.96 11l1.83 1.83M14.83 3.96l1.83 1.83"/>
    </svg>
  ),
  WandSparkles: ({ className }) => ( 
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/><path d="m19 2-2 2"/><path d="m5 20-2 2"/><path d="m2 5 2 2"/><path d="m20 19 2 2"/><path d="M9 3h6"/><path d="M9 21h6"/><path d="M12 3v18"/><path d="m18 9-2-2"/><path d="m6 17-2-2"/>
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.46 2.05c.48-.48 1.3.14 1.18 1.88-.12 1.74-.02 4.41.93 6.07.96 1.67 2.7 2.52 4.6 2.52 1.88 0 3.63-.85 4.6-2.52.94-1.66 1.05-4.33.93-6.07C21.6.18 22.37.94 22.85 1.42"/><path d="M3.5 13.5c-2 2-2 5.5 0 7.5 2 2 5.5 2 7.5 0"/><path d="M13.5 3.5c2-2 5.5-2 7.5 0 2 2 2 5.5 0 7.5"/><path d="M12 12m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0"/>
    </svg>
  ),
  Bookmark: ({ className, solid }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={solid ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  ),
  Search: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Image: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  ),
};

// Hook kustom untuk mengelola riwayat di localStorage
const useHistoryStorage = (key, initialValue = []) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  };

  return [storedValue, setValue];
};

// Komponen Modal Kustom - DIPERBAIKI UNTUK SCROLL
const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  if (!isOpen) return null;
  const sizeClass = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={onClose}>
      <div className={`relative w-full ${sizeClass} max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between sticky top-0 z-10 bg-white dark:bg-gray-800 pb-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <ICONS.XCircle className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

// Komponen Dropzone
const Dropzone = ({ onFilesAdded, className = '' }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = React.useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
      e.target.value = null;
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors duration-200 ease-in-out hover:border-blue-500 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-400 dark:hover:bg-gray-600 ${
        isDragActive ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : ''
      } ${className}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <ICONS.UploadCloud className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" />
      <p className="mb-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-blue-600 dark:text-blue-400">Klik untuk mengunggah</span> atau seret dan lepas
      </p>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        Bisa juga tempel gambar (Ctrl+V)
      </p>
    </div>
  );
};

// Komponen untuk item dalam antrian
const QueueItem = ({ item, prompt, onVariationRequest, onRefineRequest, onSendToStudio }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin: ', err);
    }
    document.body.removeChild(textArea);
  };
  
  const getStatusDisplay = () => {
    switch (item.status) {
      case 'pending':
        return <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Menunggu...</span>;
      case 'processing':
        return (
          <div className="flex items-center space-x-1">
            <ICONS.Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-xs font-medium text-blue-500">Memproses...</span>
          </div>
        );
      case 'done':
        return <ICONS.CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <ICONS.XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <li className="flex items-start space-x-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <img
        src={item.imageUrl}
        alt={item.file.name}
        className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
        onError={(e) => { e.target.src = 'https://placehold.co/64x64/e2e8f0/94a3b8?text=Img'; }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white" title={item.file.name}>
          {item.file.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {(item.file.size / 1024).toFixed(1)} KB
        </p>
        <div className="mt-2">{getStatusDisplay()}</div>
         {item.status === 'done' && prompt && (
          <div className="mt-2 space-y-2">
            <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
              {prompt}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCopy(prompt)}
                className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                {copied ? <ICONS.ClipboardCheck className="h-3.5 w-3.5" /> : <ICONS.Clipboard className="h-3.5 w-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin'}</span>
              </button>
              <button
                onClick={() => onVariationRequest(prompt)}
                className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <ICONS.WandSparkles className="h-3.5 w-3.5" />
                <span>Variasi</span>
              </button>
              <button
                onClick={() => onRefineRequest(prompt)}
                className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <ICONS.Sparkles className="h-3.5 w-3.5" />
                <span>Sempurnakan</span>
              </button>
              <button
                onClick={() => onSendToStudio(prompt)}
                className="flex items-center space-x-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
              >
                <ICONS.Palette className="h-3.5 w-3.5" />
                <span>Generate Gambar</span>
              </button>
            </div>
          </div>
        )}
        {item.status === 'error' && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            Gagal membuat prompt.
          </p>
        )}
      </div>
    </li>
  );
};

// Komponen untuk Tab Generator
const GeneratorTab = ({ settings, setSettings, imageQueue, onFilesAdded, onVariationRequest, onRefineRequest, onSendToStudio, setModalInfo, urlInput, setUrlInput }) => {
  
  const handleAddFromUrl = () => {
    setModalInfo({
      isOpen: true,
      title: "Fitur Tidak Tersedia",
      message: "Mengunggah dari URL tidak didukung dalam demo ini karena batasan keamanan browser (CORS). Silakan unggah file gambar langsung dari perangkat Anda atau tempel dari clipboard."
    });
  };

  useEffect(() => {
    return () => {
      imageQueue.forEach(item => URL.revokeObjectURL(item.imageUrl));
    };
  }, [imageQueue]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Kolom Kiri: Opsi */}
      <div className="flex flex-col space-y-6 lg:col-span-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Opsi Generator</h2>
        
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Unggah dari URL
          </label>
          <div className="mt-1 flex space-x-2">
            <input
              type="text"
              name="url"
              id="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="https://.../gambar.jpg"
            />
            <button
              onClick={handleAddFromUrl}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tambah
            </button>
          </div>
        </div>
        
        <OptionGroup
          label="Mode Generasi"
          value={settings.generationMode}
          onChange={(value) => setSettings(s => ({ ...s, generationMode: value }))}
          options={[
            { value: 'exact', label: 'Sama Persis' },
            { value: 'similar', label: 'Tema Mirip' },
          ]}
        />
        
        <OptionGroup
          label="Format Output"
          value={settings.outputFormat}
          onChange={(value) => setSettings(s => ({ ...s, outputFormat: value }))}
          options={[
            { value: 'text', label: 'Teks Biasa' },
            { value: 'json', label: 'JSON' },
          ]}
        />
        
        <OptionGroup
          label="Bahasa Output"
          value={settings.outputLanguage}
          onChange={(value) => setSettings(s => ({ ...s, outputLanguage: value }))}
          options={[
            { value: 'en', label: 'Inggris' },
            { value: 'id', label: 'Indonesia' },
          ]}
        />
        
        <div>
          <label htmlFor="positivePrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Positive Prompt (Opsional)
          </label>
          <textarea
            id="positivePrompt"
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Contoh: 4k, detail tinggi, sinematik"
            value={settings.positivePrompt}
            onChange={(e) => setSettings(s => ({ ...s, positivePrompt: e.target.value }))}
          />
        </div>
        
        <div>
          <label htmlFor="negativePrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Negative Prompt (Opsional)
          </label>
          <textarea
            id="negativePrompt"
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Contoh: buram, kualitas rendah, jelek"
            value={settings.negativePrompt}
            onChange={(e) => setSettings(s => ({ ...s, negativePrompt: e.target.value }))}
          />
        </div>
      </div>
      
      {/* Kolom Kanan: Dropzone & Antrian */}
      <div className="flex flex-col space-y-6 lg:col-span-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Unggah Gambar</h2>
          <Dropzone onFilesAdded={onFilesAdded} className="mt-4" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Antrian Proses</h2>
          {imageQueue.length === 0 ? (
            <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Antrian masih kosong. Unggah gambar untuk memulai.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-4 h-[600px] overflow-y-auto pr-2">
              {imageQueue.map(item => (
                <QueueItem 
                  key={item.id} 
                  item={item} 
                  prompt={item.prompt} 
                  onVariationRequest={onVariationRequest}
                  onRefineRequest={onRefineRequest}
                  onSendToStudio={onSendToStudio}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen Grup Opsi
const OptionGroup = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="mt-2 grid grid-cols-2 gap-2">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            value === option.value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

// Komponen untuk Tab Riwayat
const HistoryTab = ({ history, setHistory, favorites, setFavorites, onVariationRequest, onRefineRequest, onSendToStudio }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('all');
  
  const handleCopy = (id, text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Gagal menyalin: ', err);
    }
    document.body.removeChild(textArea);
  };
  
  const exportHistory = () => {
    const content = history
      .map(item => item.prompt.replace(/\n/g, ' ')) 
      .join('\n'); 
      
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompt_history.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const resetHistory = () => {
    setHistory([]);
    setFavorites([]);
  };
  
  const isFavorite = (id) => favorites.some(fav => fav.id === id);
  
  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      setFavorites(prev => prev.filter(fav => fav.id !== item.id));
    } else {
      setFavorites(prev => [item, ...prev]);
    }
  };
  
  const currentList = useMemo(() => {
    return view === 'all' ? history : favorites;
  }, [view, history, favorites]);
  
  const filteredList = useMemo(() => {
    if (!searchQuery) return currentList;
    return currentList.filter(item => 
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentList, searchQuery]);
  
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Riwayat Prompt</h2>
        <div className="flex space-x-3">
          <button
            onClick={exportHistory}
            disabled={history.length === 0}
            className="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <ICONS.FileText className="h-4 w-4" />
            <span>Ekspor (.txt)</span>
          </button>
          <button
            onClick={resetHistory}
            disabled={history.length === 0}
            className="inline-flex items-center space-x-2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ICONS.Trash2 className="h-4 w-4" />
            <span>Reset Riwayat</span>
          </button>
        </div>
      </div>
      
      {/* Kontrol Pencarian dan Filter */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari di riwayat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-gray-300 py-2 pl-10 pr-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <ICONS.Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex-shrink-0">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setView('all')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:ring-gray-600 dark:hover:bg-gray-600 ${
                view === 'all' ? 'bg-blue-600 text-white dark:bg-blue-600' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              Semua ({history.length})
            </button>
            <button
              type="button"
              onClick={() => setView('favorites')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:ring-gray-600 dark:hover:bg-gray-600 ${
                view === 'favorites' ? 'bg-blue-600 text-white dark:bg-blue-600' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <ICONS.Bookmark className="-ml-0.5 mr-1.5 h-5 w-5" solid={view === 'favorites'} />
              Favorit ({favorites.length})
            </button>
          </span>
        </div>
      </div>
      
      {filteredList.length === 0 ? (
        <div className="mt-6 flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? 'Tidak ada hasil ditemukan.' : 'Belum ada riwayat prompt.'}
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {filteredList.map((item) => (
            <li key={item.id} className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
              <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                {item.prompt}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.timestamp).toLocaleString('id-ID')}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCopy(item.id, item.prompt)}
                    className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    {copiedId === item.id ? <ICONS.ClipboardCheck className="h-3.5 w-3.5" /> : <ICONS.Clipboard className="h-3.5 w-3.5" />}
                    <span>{copiedId === item.id ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                  <button
                    onClick={() => onVariationRequest(item.prompt)}
                    className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <ICONS.WandSparkles className="h-3.5 w-3.5" />
                    <span>Variasi</span>
                  </button>
                  <button
                    onClick={() => onRefineRequest(item.prompt)}
                    className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <ICONS.Sparkles className="h-3.5 w-3.5" />
                    <span>Sempurnakan</span>
                  </button>
                  <button
                    onClick={() => onSendToStudio(item.prompt)}
                    className="flex items-center space-x-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
                  >
                    <ICONS.Palette className="h-3.5 w-3.5" />
                    <span>Generate Gambar</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${
                      isFavorite(item.id)
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-100 dark:hover:bg-yellow-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <ICONS.Bookmark className="h-3.5 w-3.5" solid={isFavorite(item.id)} />
                    <span>{isFavorite(item.id) ? 'Favorit' : 'Simpan'}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Komponen untuk Tab Studio
const StudioTab = ({ 
  prompt, setPrompt, 
  negativePrompt, setNegativePrompt, 
  onGenerate, 
  generatedImageUrls,
  isLoading, error,
  aspectRatio, setAspectRatio,
  imageCount, setImageCount
}) => {
  
  const aspectRatioOptions = [
    { value: '1:1', label: '1:1 (Persegi)' },
    { value: '16:9', label: '16:9 (Lanskap)' },
    { value: '9:16', label: '9:16 (Potret)' },
    { value: '3:2', label: '3:2 (Lanskap)' },
    { value: '2:3', label: '2:3 (Potret)' },
    { value: '4:3', label: '4:3 (Lanskap)' },
    { value: '3:4', label: '3:4 (Potret)' },
  ];
  
  const imageCountOptions = [
    { value: 1, label: '1 Gambar' },
    { value: 2, label: '2 Gambar' },
    { value: 4, label: '4 Gambar' },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Studio Generator Gambar</h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Gunakan prompt Anda untuk membuat gambar baru dengan AI.
      </p>
      
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="studioPrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Prompt
          </label>
          <textarea
            id="studioPrompt"
            rows="5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Masukkan prompt di sini..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="studioNegativePrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Negative Prompt (Opsional)
          </label>
          <textarea
            id="studioNegativePrompt"
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Contoh: buram, teks, tanda air, kualitas rendah, tangan jelek"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Aspek Rasio
            </label>
            <select
              id="aspectRatio"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              {aspectRatioOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="imageCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Jumlah Gambar
            </label>
            <select
              id="imageCount"
              value={imageCount}
              onChange={(e) => setImageCount(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              {imageCountOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt}
          className="inline-flex w-full items-center justify-center space-x-2 rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <ICONS.Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ICONS.WandSparkles className="h-5 w-5" />
          )}
          <span>{isLoading ? 'Sedang Membuat...' : `Generate ${imageCount} Gambar`}</span>
        </button>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <div className="flex">
              <div className="flex-shrink-0">
                <ICONS.XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Gagal Membuat Gambar</h3>
                <p className="mt-2 text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hasil Gambar</label>
          <div className="mt-2 w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
            {isLoading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <ICONS.Loader2 className="h-12 w-12 animate-spin" />
                <span className="mt-2">AI sedang menggambar...</span>
              </div>
            )}
            {!isLoading && generatedImageUrls.length > 0 && (
              <div className={`grid grid-cols-1 gap-4 ${generatedImageUrls.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {generatedImageUrls.map((url, index) => (
                  <img 
                    key={index}
                    src={url} 
                    alt={`Generated by AI ${index + 1}`} 
                    className="w-full rounded-lg object-contain"
                  />
                ))}
              </div>
            )}
            {!isLoading && generatedImageUrls.length === 0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <ICONS.Image className="h-12 w-12" />
                <span className="mt-2">Gambar Anda akan muncul di sini</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Komponen Utama Aplikasi
export default function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [settings, setSettings] = useState({
    generationMode: 'exact',
    outputFormat: 'text',
    outputLanguage: 'en',
    positivePrompt: '',
    negativePrompt: '',
  });
  const [urlInput, setUrlInput] = useState('');
  const [imageQueue, setImageQueue] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useHistoryStorage('promptHistory', []);
  const [favorites, setFavorites] = useHistoryStorage('promptFavorites', []);
  const [infoModal, setInfoModal] = useState({ isOpen: false, title: '', message: '' });
  const [variationModal, setVariationModal] = useState({ 
    isOpen: false, 
    variations: [], 
    isLoading: false, 
    originalPrompt: null, 
    error: null,
    copiedIndex: -1
  });
  
  const [promptForStudio, setPromptForStudio] = useState('');
  const [generatedImageUrls, setGeneratedImageUrls] = useState([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageGenerationError, setImageGenerationError] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageCount, setImageCount] = useState(1);
  const [negativePromptForStudio, setNegativePromptForStudio] = useState('');
  
  const [refineModal, setRefineModal] = useState({
    isOpen: false,
    prompt: '',
    isLoading: false,
    error: null,
  });
  
  // Fungsi untuk mengubah file ke Base64
  const fileToB64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Fungsi untuk membuat prompt dari gambar (Image-to-Prompt)
  const generatePromptForImage = async (base64Data, fileType) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const lang = settings.outputLanguage === 'id' ? 'Bahasa Indonesia' : 'English';
    const mode = settings.generationMode === 'exact' 
      ? 'Buat prompt untuk menciptakan ulang gambar ini SEPERTI ASLINYA.' 
      : 'Buat prompt untuk gambar BARU dengan TEMA dan KONTEKS YANG SAMA.';
    const format = settings.outputFormat === 'json'
      ? 'Berikan output dalam format JSON yang terstruktur (contoh: {"subject": "...", "style": "...", "lighting": "...", "colors": "...", "composition": "..."}).'
      : 'Berikan output sebagai SATU PARAGRAF teks biasa yang deskriptif.';
    const positive = settings.positivePrompt ? `WAJIB sertakan konsep ini: ${settings.positivePrompt}` : '';
    const negative = settings.negativePrompt ? `WAJIB HINDARI konsep ini: ${settings.negativePrompt}` : '';
    const userQuery = `Analisis gambar ini dan buatkan prompt AI generatif yang SANGAT LENGKAP. Instruksi: 1. Bahasa: ${lang}. 2. Mode: ${mode} 3. Format: ${format} 4. ${positive} 5. ${negative}.`;
    
    const payload = {
      contents: [{
        role: "user",
        parts: [
          { text: userQuery },
          { inlineData: { mimeType: fileType, data: base64Data } }
        ]
      }],
      systemInstruction: {
        parts: [{ text: "Anda adalah asisten ahli dalam menganalisis gambar dan membuat prompt deskriptif untuk model AI generatif." }]
      }
    };
    
    // Implementasi exponential backoff
    let response;
    let delay = 1000;
    for (let i = 0; i < 3; i++) {
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.status === 429) throw new Error('Rate limit');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        break;
      } catch (error) {
        if (error.message === 'Rate limit' && i < 2) {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    }

    const result = await response.json();
    if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0].text) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error("Respon API tidak valid:", result);
      throw new Error("Gagal mendapatkan prompt dari API.");
    }
  };
  
  // Fungsi untuk membuat variasi prompt
  const generatePromptVariation = async (originalPrompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const lang = settings.outputLanguage === 'id' ? 'Bahasa Indonesia' : 'English';
    const userQuery = `Saya punya prompt ini: "${originalPrompt}"\n\nTolong buatkan 3 variasi baru yang kreatif dan deskriptif dari prompt tersebut. Setiap variasi harus unik. Bahasa output: ${lang}.`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: "Anda adalah asisten ahli penulis prompt. Selalu kembalikan 3 variasi prompt dalam format JSON array berisi string." }]
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: { type: "STRING" }
        }
      }
    };
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) return JSON.parse(text);
    throw new Error("Gagal mendapatkan variasi prompt.");
  };
  
  // Fungsi untuk menyempurnakan prompt (AI-Assisted Editing)
  const refinePrompt = async (promptToRefine, instruction) => {
    setRefineModal(prev => ({ ...prev, isLoading: true, error: null }));
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const userQuery = `
      Terapkan instruksi ini: "${instruction}"
      
      Pada prompt berikut:
      "${promptToRefine}"
      
      KEMBALIKAN HANYA PROMPT YANG SUDAH DIREVISI, tanpa teks tambahan atau tanda kutip.
    `;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: "Anda adalah asisten editor prompt yang ahli. Anda hanya mengembalikan teks prompt yang telah direvisi." }]
      }
    };
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      const refinedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (refinedText) {
        setRefineModal(prev => ({ ...prev, isLoading: false, prompt: refinedText.trim() }));
      } else {
        throw new Error("Gagal mendapatkan teks yang disempurnakan.");
      }
    } catch (error) {
      console.error("Gagal menyempurnakan prompt:", error);
      setRefineModal(prev => ({ ...prev, isLoading: false, error: error.message }));
    }
  };
  
  // Fungsi untuk generate gambar (Prompt-to-Image)
  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    setGeneratedImageUrls([]);
    setImageGenerationError(null);
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
    
    let finalPrompt = promptForStudio;
    if (negativePromptForStudio) {
      finalPrompt += ` \n\n JANGAN SERTAKAN: ${negativePromptForStudio}`;
    }
    
    const payload = {
      contents: [{
        parts: [{ text: finalPrompt }]
      }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        aspectRatio: aspectRatio,
        sampleCount: imageCount
      },
    };
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const imageParts = result?.candidates?.[0]?.content?.parts?.filter(p => p.inlineData && p.inlineData.mimeType.startsWith('image/'));
      
      if (imageParts && imageParts.length > 0) {
        const imageUrls = imageParts.map(part => `data:image/png;base64,${part.inlineData.data}`);
        setGeneratedImageUrls(imageUrls);
      } else {
        throw new Error("Respon API tidak valid atau tidak mengandung gambar.");
      }
      
    } catch (error) {
      console.error("Gagal membuat gambar:", error);
      setImageGenerationError(error.message);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Fungsi untuk menangani permintaan variasi
  const handleVariationRequest = async (prompt) => {
    setVariationModal({ isOpen: true, isLoading: true, variations: [], originalPrompt: prompt, error: null, copiedIndex: -1 });
    try {
      const variations = await generatePromptVariation(prompt);
      setVariationModal(prev => ({ ...prev, isLoading: false, variations: variations }));
    } catch (error) {
      console.error("Gagal membuat variasi:", error);
      setVariationModal(prev => ({ ...prev, isLoading: false, error: error.message }));
    }
  };
  
  // Fungsi untuk menyalin variasi
  const handleCopyVariation = (text, index) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setVariationModal(prev => ({ ...prev, copiedIndex: index }));
      setTimeout(() => setVariationModal(prev => ({ ...prev, copiedIndex: -1 })), 2000);
    } catch (err) {
      console.error('Gagal menyalin: ', err);
    }
    document.body.removeChild(textArea);
  };
  
  // Callback untuk menambah file
  const onFilesAdded = useCallback((files) => {
    const newQueueItems = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      status: 'pending',
      imageUrl: URL.createObjectURL(file),
    }));
    setImageQueue(prev => [...prev, ...newQueueItems]);
  }, [setImageQueue]);

  // Fungsi untuk memproses antrian
  const processQueue = useCallback(async () => {
    if (isProcessing) return; 
    const pendingItem = imageQueue.find(item => item.status === 'pending');
    if (!pendingItem) {
      setIsProcessing(false); 
      return;
    }
    setIsProcessing(true);
    try {
      setImageQueue(prev => prev.map(item => 
        item.id === pendingItem.id ? { ...item, status: 'processing' } : item
      ));
      const base64Data = await fileToB64(pendingItem.file);
      const generatedPrompt = await generatePromptForImage(base64Data, pendingItem.file.type);
      const newItem = { ...pendingItem, status: 'done', prompt: generatedPrompt };
      setImageQueue(prev => prev.map(item => 
        item.id === pendingItem.id ? newItem : item
      ));
      const historyItem = { id: crypto.randomUUID(), prompt: generatedPrompt, timestamp: new Date().toISOString() };
      setHistory(prev => [historyItem, ...prev]);
    } catch (error) {
      console.error("Gagal memproses gambar:", error);
      setImageQueue(prev => prev.map(item => 
        item.id === pendingItem.id ? { ...item, status: 'error' } : item
      ));
    } finally {
      setIsProcessing(false); 
    }
  }, [isProcessing, imageQueue, settings, setHistory, setImageQueue]);

  // Trigger untuk memproses antrian
  useEffect(() => {
    if (!isProcessing && imageQueue.some(item => item.status === 'pending')) {
      processQueue();
    }
  }, [isProcessing, imageQueue, processQueue]);
  
  // Event listener untuk paste clipboard
  useEffect(() => {
    const handlePaste = (event) => {
      const files = event.clipboardData.files;
      if (files.length > 0) {
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (imageFiles.length > 0) {
          event.preventDefault();
          onFilesAdded(imageFiles);
          setActiveTab('generate');
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesAdded]);
  
  const openRefineModal = (prompt) => {
    setRefineModal({
      isOpen: true,
      prompt: prompt,
      isLoading: false,
      error: null,
    });
  };
  
  const handleSendToStudio = (prompt) => {
    setPromptForStudio(prompt);
    setActiveTab('studio');
  };
  
  const TabButton = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter text-gray-900 dark:bg-gray-900 dark:text-white sm:p-8">
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <header className="mx-auto mb-6 max-w-7xl">
        <div className="flex items-center space-x-3">
          <ICONS.Wand className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Image to Prompt
          </h1>
        </div>
        <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
          Studio kreatif lengkap Anda untuk inspirasi visual.
        </p>
      </header>
      
      <main className="mx-auto max-w-7xl rounded-lg bg-white shadow-lg dark:bg-gray-800">
        {/* Navigasi Tab */}
        <nav className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 px-4 sm:px-6">
            <TabButton isActive={activeTab === 'generate'} onClick={() => setActiveTab('generate')}>
              <ICONS.UploadCloud className="h-5 w-5" />
              <span>Generator (Image-to-Prompt)</span>
            </TabButton>
            <TabButton isActive={activeTab === 'studio'} onClick={() => setActiveTab('studio')}>
              <ICONS.Palette className="h-5 w-5" />
              <span>Studio (Prompt-to-Image)</span>
            </TabButton>
            <TabButton isActive={activeTab === 'history'} onClick={() => setActiveTab('history')}>
              <ICONS.History className="h-5 w-5" />
              <span>Riwayat</span>
            </TabButton>
          </div>
        </nav>
        
        {/* Konten Tab */}
        <div className="p-4 sm:p-6">
          {activeTab === 'generate' && (
            <GeneratorTab
              settings={settings}
              setSettings={setSettings}
              imageQueue={imageQueue}
              onFilesAdded={onFilesAdded}
              onVariationRequest={handleVariationRequest}
              onRefineRequest={openRefineModal}
              onSendToStudio={handleSendToStudio}
              setModalInfo={setInfoModal}
              urlInput={urlInput}
              setUrlInput={setUrlInput}
            />
          )}
          {activeTab === 'studio' && (
            <StudioTab
              prompt={promptForStudio}
              setPrompt={setPromptForStudio}
              negativePrompt={negativePromptForStudio}
              setNegativePrompt={setNegativePromptForStudio}
              onGenerate={handleGenerateImage}
              generatedImageUrls={generatedImageUrls}
              isLoading={isGeneratingImage}
              error={imageGenerationError}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              imageCount={imageCount}
              setImageCount={setImageCount}
            />
          )}
          {activeTab === 'history' && (
            <HistoryTab 
              history={history} 
              setHistory={setHistory} 
              favorites={favorites}
              setFavorites={setFavorites}
              onVariationRequest={handleVariationRequest}
              onRefineRequest={openRefineModal}
              onSendToStudio={handleSendToStudio}
            />
          )}
        </div>
      </main>
      
      {/* Modal untuk Info/Error */}
      <Modal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ isOpen: false, title: '', message: '' })}
        title={infoModal.title}
        size="md"
      >
        <div className="flex items-start space-x-3">
          <ICONS.AlertTriangle className="h-6 w-6 flex-shrink-0 text-yellow-500" />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {infoModal.message}
          </p>
        </div>
      </Modal>
      
      {/* Modal untuk Variasi Prompt */}
      <Modal
        isOpen={variationModal.isOpen}
        onClose={() => setVariationModal({ isOpen: false, variations: [], isLoading: false, originalPrompt: null, error: null, copiedIndex: -1 })}
        title="Variasi Prompt"
        size="lg"
      >
        {variationModal.isLoading && (
          <div className="flex h-48 flex-col items-center justify-center">
            <ICONS.Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Membuat variasi...</p>
          </div>
        )}
        {variationModal.error && (
          <div className="flex h-48 flex-col items-center justify-center">
            <ICONS.XCircle className="h-12 w-12 text-red-500" />
            <p className="mt-4 text-red-600 dark:text-red-400">Gagal membuat variasi.</p>
            <p className="text-sm text-gray-500">{variationModal.error}</p>
          </div>
        )}
        {!variationModal.isLoading && variationModal.variations.length > 0 && (
          <div className="space-y-4">
            <div className="rounded-md bg-gray-100 p-3 dark:bg-gray-700">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Prompt Asli:</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">{variationModal.originalPrompt}</p>
            </div>
            <ul className="space-y-3">
              {variationModal.variations.map((variation, index) => (
                <li key={index} className="rounded-md border border-gray-200 p-3 dark:border-gray-600">
                  <p className="mb-2 text-sm text-gray-800 dark:text-gray-200">{variation}</p>
                  <button
                    onClick={() => handleCopyVariation(variation, index)}
                    className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                  >
                    {variationModal.copiedIndex === index ? <ICONS.ClipboardCheck className="h-3.5 w-3.5" /> : <ICONS.Clipboard className="h-3.5 w-3.5" />}
                    <span>{variationModal.copiedIndex === index ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
      
      {/* Modal untuk Penyempurna Prompt */}
      <Modal
        isOpen={refineModal.isOpen}
        onClose={() => setRefineModal({ isOpen: false, prompt: '', isLoading: false, error: null })}
        title="Editor & Penyempurna Prompt"
        size="xl"
      >
        <div className="flex flex-col space-y-4">
          <textarea
            rows="6"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            value={refineModal.prompt}
            onChange={(e) => setRefineModal(prev => ({ ...prev, prompt: e.target.value }))}
            disabled={refineModal.isLoading}
          />
          
          {refineModal.isLoading && (
            <div className="flex items-center justify-center rounded-md bg-gray-100 p-4 dark:bg-gray-700">
              <ICONS.Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <p className="ml-3 text-sm text-gray-700 dark:text-gray-200">AI sedang menyempurnakan...</p>
            </div>
          )}
          {refineModal.error && (
            <p className="text-sm text-red-600 dark:text-red-400">Error: {refineModal.error}</p>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Aksi Cepat AI:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Buat lebih pendek",
                "Buat lebih puitis",
                "Tambahkan detail latar belakang",
                "Fokus pada aksi"
              ].map(action => (
                <button
                  key={action}
                  onClick={() => refinePrompt(refineModal.prompt, action)}
                  disabled={refineModal.isLoading}
                  className="flex items-center space-x-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  <ICONS.Sparkles className="h-3.5 w-3.5" />
                  <span>{action}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-3 border-t border-gray-200 pt-4 dark:border-gray-600">
            <button
              onClick={() => {
                handleSendToStudio(refineModal.prompt);
                setRefineModal({ isOpen: false, prompt: '', isLoading: false, error: null });
              }}
              className="inline-flex items-center space-x-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <ICONS.Palette className="h-4 w-4" />
              <span>Kirim ke Studio</span>
            </button>
          </div>
        </div>
      </Modal>
      
    </div>
  );
}