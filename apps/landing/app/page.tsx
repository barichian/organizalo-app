"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Layout, Bell, Zap, Globe } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans selection:bg-brand-blue/20 selection:text-brand-blue">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-10 h-10 transition-transform transform group-hover:scale-110 duration-300">
                {/* Using the brand logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/organizalo-logo.png" alt="Organizalo Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-brand-blue transition-colors">
                Organizalo.app
              </span>
            </div>
            <div className="hidden md:flex gap-10 text-[15px] font-medium text-slate-600">
              <a href="#features" className="hover:text-brand-blue transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-brand-blue after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Características</a>
              <a href="#pricing" className="hover:text-brand-blue transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-brand-blue after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Precios</a>
              <a href="https://docs.organizalo.app" className="hover:text-brand-blue transition-colors">Docs</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://app.organizalo.app/login" className="text-sm font-semibold text-slate-700 hover:text-brand-blue transition-colors hidden sm:block">Log in</a>
              <a
                href="https://app.organizalo.app"
                className="px-6 py-2.5 rounded-full bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Comenzar Gratis
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob"></div>
          <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-[400px] h-[400px] bg-brand-red/10 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-medium mb-8 hover:border-brand-blue/30 transition-colors cursor-default"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-yellow animate-pulse"></span>
              <span>Gestión de proyectos para equipos</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Organiza tu equipo<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-blue to-brand-red">
                sin el caos.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-12 leading-relaxed font-light">
              La plataforma todo-en-uno que sincroniza tus tareas, documentos y <span className="font-medium text-brand-blue">comunicaciones de WhatsApp</span> en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://app.organizalo.app/register"
                className="px-10 py-4 rounded-full bg-brand-blue text-white font-bold text-lg hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/25 ring-4 ring-brand-blue/10 flex items-center gap-3"
              >
                Empezar Gratis <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="#features"
                className="px-10 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-3"
              >
                <Zap className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
                Ver Demo
              </motion.a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Sin tarjeta de crédito</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Plan gratuito disponible</span>
            </div>
          </motion.div>

          {/* Abstract UI Representation */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="mt-20 relative mx-auto max-w-6xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow via-brand-blue to-brand-red rounded-2xl blur opacity-20"></div>
            <div className="relative rounded-2xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
              <div className="flex items-center px-4 py-3 bg-slate-50 border-b border-slate-100 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                <div className="mx-auto w-1/3 h-5 bg-white rounded-md border border-slate-100 shadow-sm flex items-center justify-center text-[10px] text-slate-400 font-mono">
                  app.organizalo.app
                </div>
              </div>
              <div className="aspect-[16/9] bg-slate-50 flex items-center justify-center text-slate-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/organizalo-logo.png" alt="Organizalo Logo" className="w-32 h-32 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
                <span className="relative z-10 text-xl font-medium tracking-wide">Vista Previa del Dashboard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-3">Características</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Todo lo que necesitas para escalar</h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Más que una lista de tareas. Un sistema operativo completo para tu negocio.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Layout className="w-8 h-8 text-brand-blue" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Vistas Flexibles</h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                Visualiza tu trabajo como quieras. Tableros Kanban para flujo, Cronogramas para planificación y Listas para rapidez.
              </p>
            </motion.div>

            {/* Feature 2: WhatsApp */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-brand-blue text-white shadow-2xl shadow-brand-blue/20 relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transform translate-x-10 -translate-y-10">
                <MessageCircle className="w-48 h-48" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Integración WhatsApp</h4>
              <p className="text-blue-100 leading-relaxed text-lg">
                Único en el mercado. Recibe tareas, actualiza estados y comunica avances directamente desde tu WhatsApp. Sin instalar apps extras.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-red/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Bell className="w-8 h-8 text-brand-red" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Alertas Inteligentes</h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                Olvídate del micromanagement. El sistema te avisa automáticamente cuando algo se retrasa o requiere tu atención urgente.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-3">Precios</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Simple y Transparente</h3>
            <p className="text-xl text-slate-600">Empieza gratis, paga solo cuando crezcas.</p>
          </div>

          <div className="grid md:flex justify-center gap-8 max-w-5xl mx-auto items-center">
            {/* Free Plan */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex-1 bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm relative group"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Gratis</h3>
              <p className="text-slate-500 mb-8 text-sm">Ideal para freelancers y estudiantes.</p>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-slate-900">$0</span>
                <span className="text-xl text-slate-500 ml-2">/mes</span>
              </div>

              <a href="https://app.organizalo.app/register" className="block w-full py-4 rounded-xl bg-slate-100 text-slate-900 font-bold text-center hover:bg-slate-200 transition-colors mb-10 border border-slate-200">
                Comenzar Ahora
              </a>

              <ul className="space-y-5 text-slate-600">
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-green-100"><Check className="w-3.5 h-3.5 text-green-600" /></div> Hasta 5 usuarios</li>
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-green-100"><Check className="w-3.5 h-3.5 text-green-600" /></div> Proyectos ilimitados</li>
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-green-100"><Check className="w-3.5 h-3.5 text-green-600" /></div> Integración WhatsApp (Básico)</li>
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-green-100"><Check className="w-3.5 h-3.5 text-green-600" /></div> 100MB almacenamiento</li>
              </ul>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex-1 bg-white p-10 rounded-[2rem] border-2 border-brand-blue shadow-2xl relative overflow-hidden md:scale-110 z-10"
            >
              <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Más Popular</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
              <p className="text-slate-500 mb-8 text-sm">Para equipos de alto rendimiento.</p>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-slate-900">$12</span>
                <span className="text-xl text-slate-500 ml-2">/mes</span>
              </div>

              <a href="#" className="block w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-blue-700 text-white font-bold text-center hover:shadow-lg hover:shadow-blue-500/25 transition-all mb-10 shadow-md">
                Prueba 14 Días Gratis
              </a>

              <ul className="space-y-5 text-slate-600">
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-blue-100"><Check className="w-3.5 h-3.5 text-brand-blue" /></div> Usuarios ilimitados</li>
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-blue-100"><Check className="w-3.5 h-3.5 text-brand-blue" /></div> WhatsApp Bidireccional</li>
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-blue-100"><Check className="w-3.5 h-3.5 text-brand-blue" /></div> Análisis Avanzados</li>
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-blue-100"><Check className="w-3.5 h-3.5 text-brand-blue" /></div> 10GB almacenamiento</li>
                <li className="flex items-center gap-3 text-sm font-medium"><div className="p-1 rounded-full bg-blue-100"><Check className="w-3.5 h-3.5 text-brand-blue" /></div> Soporte Prioritario</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand-logo.png" alt="Organizalo Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold text-slate-900">Organizalo.app</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Simplificando la gestión de proyectos para equipos venezolanos y del mundo.
              </p>
              <div className="flex gap-4">
                {/* Social Links placeholders */}
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-brand-blue hover:text-white transition-all"><Globe className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Producto</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-blue">Características</a></li>
                <li><a href="#" className="hover:text-brand-blue">Integraciones</a></li>
                <li><a href="#" className="hover:text-brand-blue">Precios</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Compañía</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-blue">Acerca de</a></li>
                <li><a href="#" className="hover:text-brand-blue">Blog</a></li>
                <li><a href="#" className="hover:text-brand-blue">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-blue">Privacidad</a></li>
                <li><a href="#" className="hover:text-brand-blue">Términos</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Organizalo.app. Hecho en Venezuela.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
