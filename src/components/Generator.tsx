import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { Download, RefreshCw } from 'lucide-react';

export default function Generator() {
  const [text, setText] = useState('1234567890');
  const barcodeRef = useRef<HTMLDivElement>(null);

  const generateRandom = () => {
    setText(Math.floor(Math.random() * 10000000000).toString());
  };

  const handleDownload = () => {
    if (!barcodeRef.current) return;
    const svg = barcodeRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `barcode-${text}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full max-w-md space-y-4">
        <label htmlFor="barcode-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Enter text or numbers
        </label>
        <div className="flex gap-2">
          <input
            id="barcode-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
            placeholder="e.g. 987654321"
          />
          <button
            onClick={generateRandom}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors group"
            title="Generate Random"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      <div className="p-8 rounded-2xl glass w-full max-w-md flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-purple-500/5 dark:from-brand-500/10 dark:to-purple-500/10 z-0"></div>
        
        <div className="z-10 bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105" ref={barcodeRef}>
          {text ? (
            <Barcode value={text} width={2} height={100} displayValue={true} background="#ffffff" lineColor="#000000" />
          ) : (
            <div className="text-slate-400 text-sm flex items-center justify-center h-[100px]">
              Type something to generate
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={!text}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-medium transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-500/30"
      >
        <Download className="w-4 h-4" />
        Download SVG
      </button>
    </div>
  );
}
