export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4 text-primary-700">
          ECG Simulator V0 Beta
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Simulador ECG con IA - Mobile-first UX
        </p>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-primary-600">📚 Aprender</h2>
            <p className="text-gray-600">Simulador de arritmias existente</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-primary-600">🎯 Practicar</h2>
            <p className="text-gray-600">Casos clínicos generados con IA</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-primary-600">🔬 Analizar</h2>
            <p className="text-gray-600">Sube y analiza tus propios ECGs</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-primary-600">📊 Progreso</h2>
            <p className="text-gray-600">Dashboard personal de estadísticas</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-primary-600">🏆 Desafíos</h2>
            <p className="text-gray-600">Gamificación y rankings</p>
          </div>
        </div>
      </div>
    </main>
  );
}
