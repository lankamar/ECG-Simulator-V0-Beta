'use client';

import { useState } from 'react';
import { arrhythmias } from '@/services/arrhythmiaData';
import type { Arrhythmia } from '@/types';

export default function AprenderPage() {
  const [selectedArrhythmia, setSelectedArrhythmia] = useState<Arrhythmia>(arrhythmias[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          📚 Aprender - Simulador ECG
        </h1>
        
        {/* Arrhythmia Selector */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona una arritmia:
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedArrhythmia.id}
            onChange={(e) => {
              const arrhythmia = arrhythmias.find(a => a.id === e.target.value);
              if (arrhythmia) setSelectedArrhythmia(arrhythmia);
            }}
          >
            {arrhythmias.map((arr) => (
              <option key={arr.id} value={arr.id}>
                {arr.name}
              </option>
            ))}
          </select>
        </div>

        {/* ECG Display Placeholder */}
        <div className="bg-black rounded-lg p-6 mb-4">
          <div className="text-green-400 text-center py-20">
            <div className="text-xl font-mono mb-4">{selectedArrhythmia.name}</div>
            <div className="text-sm opacity-70">ECG Simulator Component - Coming Soon</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg p-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isPlaying ? '⏸ Pausar' : '▶ Reproducir'}
          </button>
        </div>

        {/* Info Panel */}
        <div className="bg-white rounded-lg p-4 mt-4">
          <h2 className="text-xl font-bold mb-2">{selectedArrhythmia.name}</h2>
          <p className="text-gray-700">{selectedArrhythmia.description}</p>
        </div>
      </div>
    </div>
  );
}
