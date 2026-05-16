import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Copy, Check, RotateCcw } from 'lucide-react';

export default function Scanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Only initialize if we haven't scanned anything yet to avoid overlapping instances
    if (scanResult) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 300, height: 150 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [0] // 0 is for camera scanning, we can remove this to allow file upload
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear().catch(console.error);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [scanResult]);

  const copyToClipboard = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Point your camera at a barcode to scan it automatically.
          </p>
        </div>

        {scanResult ? (
          <div className="glass p-8 rounded-2xl flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Scan Successful!</h3>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl flex items-center gap-4">
                <code className="text-lg text-brand-600 dark:text-brand-400 break-all">{scanResult}</code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button
              onClick={resetScanner}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium transition-transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Scan Another
            </button>
          </div>
        ) : (
          <div className="glass p-4 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-brand-500 opacity-50"></div>
            {/* The div where html5-qrcode mounts */}
            <div id="reader" className="w-full bg-black rounded-xl overflow-hidden"></div>
          </div>
        )}
      </div>

      <style>{`
        /* Overriding html5-qrcode default ugly styles */
        #reader {
          border: none !important;
          border-radius: 0.75rem;
        }
        #reader button {
          background: #8b5cf6 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          margin: 10px !important;
          transition: all 0.2s !important;
        }
        #reader button:hover {
          background: #7c3aed !important;
        }
        #reader select {
          padding: 8px !important;
          border-radius: 8px !important;
          border: 1px solid #e2e8f0 !important;
          margin: 10px !important;
          background: white !important;
          color: #0f172a !important;
        }
        #reader a {
          color: #8b5cf6 !important;
          text-decoration: none !important;
        }
        #reader__dashboard_section_csr span {
          color: inherit !important;
        }
      `}</style>
    </div>
  );
}
