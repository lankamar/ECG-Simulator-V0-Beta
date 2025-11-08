import Link from "next/link";

const modules = [
  { title: "Aprender", href: "/aprender", img: "/images/aprender.jpg", subtitle: "Teoría y ejemplos clínicos" },
  { title: "Practicar", href: "/practicar", img: "/images/practicar.jpg", subtitle: "Ejercicios interactivos" },
  { title: "Analizar", href: "/analizar", img: "/images/analizar.jpg", subtitle: "Sube y evalúa ECGs" },
  { title: "Progreso", href: "/progreso", img: "/images/progreso.jpg", subtitle: "Historial y métricas" },
  { title: "Desafios", href: "/desafios", img: "/images/desafios.jpg", subtitle: "Retos clínicos y rankings" },
];

export default function Home() {
  return (
    <main
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      {/* overlay to ensure contrast */}
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
          {/* Hero */}
          <section className="max-w-3xl mx-auto text-center text-slate-50 mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              ECG Simulator V0 Beta
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200">
              Simulador ECG con IA — herramientas educativas y clínicas
            </p>
            <p className="mt-6 text-sm text-slate-300">
              Plataforma diseñada para profesionales y estudiantes. Aprende, practica y analiza trazados ECG con una interfaz clara y accesible.
            </p>
          </section>

          {/* Modules grid */}
          <section className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((m) => (
                <Link
                  key={m.title}
                  href={m.href}
                  aria-label={`${m.title} — ir a ${m.href}`}
                  className="relative block rounded-xl overflow-hidden shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
                  style={{ minHeight: 180 }}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${m.img}')` }}
                    aria-hidden
                  />

                  {/* Dark overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{m.title}</h3>
                      <p className="mt-1 text-sm text-slate-200">{m.subtitle}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="sr-only">Ir a {m.title}</span>
                      <span className="inline-flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-100">Explorar</span>
                        {/* Touch target sizing: ensure minimum 48-56px */}
                        <span className="inline-flex items-center justify-center bg-white/10 rounded-full p-3 min-h-[48px] min-w-[48px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Small footer note */}
          <div className="mt-10 text-center text-sm text-slate-300">
            <span>Proyecto en fase Beta • Uso académico y clínico complementario</span>
          </div>
        </div>
      </div>
    </main>
  );
}
