'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ECGMonitor from '@/components/ECGMonitor';
import Sidebar from '@/components/Sidebar';
import InfoPanel from '@/components/InfoPanel';
import ZoomModal from '@/components/ZoomModal';
import { arrhythmias } from '../../services/arrhythmiaData';
import type { Arrhythmia, ECGPoint } from '../../types';

export default function AprenderPage() {
  // Selected arrhythmia (default to first available)
  const [selectedArrhythmia, setSelectedArrhythmia] = useState<Arrhythmia>(arrhythmias[0]);

  // Playback control
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeedState, setPlaybackSpeedState] = useState<number>(1);

  // Heart rate control (affects playback scaling)
  const [heartRate, setHeartRate] = useState<number>(75);

  // Time window shown in seconds
  const [windowSeconds, setWindowSeconds] = useState<number>(6);

  // Generated ECG data (full buffer)
  const [ecgData, setEcgData] = useState<Record<string, ECGPoint[]>>(() => ({}));

  // Time offset (seconds) used by ECGMonitor domain [timeOffset, timeOffset + windowSeconds]
  const [timeOffset, setTimeOffset] = useState<number>(0);

  // Zoom modal state
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [zoomLead, setZoomLead] = useState<string[]>(['DII']);

  // refs for timing loop
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Base HR mapping for better playback scaling (best-effort)
  const baseHrMap: Record<string, number> = useMemo(() => ({
    nsr: 75,
    sinus_brady: 48,
    sinus_tachy: 120,
  }), []);

  const baseHR = baseHrMap[selectedArrhythmia.id] || 75;

  // Generate ECG data when selected arrhythmia changes
  useEffect(() => {
    // generate a long buffer (e.g., 300s) to allow scrolling
    const duration = 300; // seconds
    try {
      const generated = selectedArrhythmia.generateECGData(duration);
      // ensure arrays are sorted by time
      Object.keys(generated).forEach(k => generated[k].sort((a,b) => a.time - b.time));
      setEcgData(generated);
      setTimeOffset(0);
    } catch (e) {
      console.error('Error generating ECG data', e);
      setEcgData({});
    }
  }, [selectedArrhythmia]);

  // RAF loop to advance timeOffset while playing
  useEffect(() => {
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const deltaMs = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (isPlaying) {
        // scale: playbackSpeed * (desiredHR / baseHR)
        const hrScale = heartRate > 0 ? heartRate / baseHR : 1;
        const deltaSeconds = (deltaMs / 1000) * playbackSpeedState * hrScale;
        setTimeOffset(prev => prev + deltaSeconds);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [isPlaying, playbackSpeedState, heartRate, baseHR]);

  // Handler when user selects a lead to zoom from ECGMonitor
  const handleZoomLead = (leadName: string) => {
    setZoomLead([leadName]);
    setIsZoomOpen(true);
  };

  // Sidebar selection handler wraps arrhythmia selection
  const handleSelectArrhythmia = (arr: Arrhythmia) => {
    setSelectedArrhythmia(arr);
  };

  // Ensure windowSeconds minimum 1 and max 20
  const sanitizedWindow = Math.max(1, Math.min(20, windowSeconds));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      <Sidebar
        arrhythmias={arrhythmias}
        selectedArrhythmia={selectedArrhythmia}
        onSelectArrhythmia={handleSelectArrhythmia}
      />

      <div className="flex-1 flex flex-col gap-4 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ECGMonitor
              data={ecgData}
              heartRate={`${heartRate} L/m`}
              timeOffset={timeOffset}
              windowSeconds={sanitizedWindow}
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeedState}
              setIsPlaying={setIsPlaying}
              setPlaybackSpeed={(s) => setPlaybackSpeedState(s)}
              onZoomLead={handleZoomLead}
            />
          </div>

          <div className="flex flex-col gap-4">
            <InfoPanel arrhythmia={selectedArrhythmia} />

            <div className="bg-slate-800 rounded-lg p-4 shadow">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Controles</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-300">Reproducción</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsPlaying(v => !v)} className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700">{isPlaying ? 'Pausa' : 'Reproducir'}</button>
                    <div className="text-xs text-slate-400">Vel: {playbackSpeedState}x</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-300">Frecuencia cardíaca: <span className="font-mono">{heartRate} L/m</span></label>
                  <input type="range" min={30} max={180} value={heartRate} onChange={(e) => setHeartRate(Number(e.target.value))} className="w-full mt-2" />
                </div>

                <div>
                  <label className="text-sm text-slate-300">Ventana (segundos)</label>
                  <input type="range" min={1} max={12} value={windowSeconds} onChange={(e) => setWindowSeconds(Number(e.target.value))} className="w-full mt-2" />
                </div>

                <div>
                  <label className="text-sm text-slate-300">Velocidad de reproducción</label>
                  <div className="flex items-center gap-2 mt-2">
                    {[0.5, 1, 2].map(s => (
                      <button key={s} onClick={() => setPlaybackSpeedState(s)} className={`px-2 py-1 rounded ${playbackSpeedState === s ? 'bg-brand-600' : 'bg-slate-700 hover:bg-slate-600'}`}>{s}x</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ZoomModal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          allEcgData={ecgData}
          initialLeads={zoomLead}
          timeOffset={timeOffset}
          windowSeconds={sanitizedWindow}
        />
      </div>
    </div>
  );
}