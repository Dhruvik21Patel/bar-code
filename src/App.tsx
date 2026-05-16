import { useState } from 'react';
import Generator from './components/Generator';
import Scanner from './components/Scanner';
import { Barcode as BarcodeIcon, ScanLine } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-brand-500 selection:text-white transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-400/20 dark:bg-brand-600/20 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-[120px]"></div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12 flex flex-col min-h-screen">
        <header className="text-center space-y-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-brand-500/10 mb-4 ring-1 ring-slate-200 dark:ring-slate-800">
            <BarcodeIcon className="w-10 h-10 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-slate-900 dark:text-white">
              Barcode <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Studio</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Generate custom barcodes instantly or scan existing ones with your camera. Fast, secure, and beautiful.
            </p>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-1.5 rounded-2xl inline-flex mb-12 shadow-sm border border-slate-200/50 dark:border-slate-800/50 animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'generate'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <BarcodeIcon className="w-5 h-5" />
              Generate
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'scan'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <ScanLine className="w-5 h-5" />
              Scan
            </button>
          </div>

          <div className="w-full max-w-2xl">
            {activeTab === 'generate' ? <Generator /> : <Scanner />}
          </div>
        </div>

        <footer className="mt-auto py-8 text-center text-slate-500 dark:text-slate-400 text-sm animate-in fade-in duration-1000 delay-500">
          <p>Powered by <a href="#" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">Vite</a>, <a href="#" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">TailwindCSS</a>, and <a href="#" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">React</a>.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
