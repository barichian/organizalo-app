# Organizalo.app - Contexto Maestro del Proyecto (Handover)

> **Fecha de Actualización**: 27 de Diciembre, 2025
> **Estado**: En Producción (Landing) / Debug (App)

Este documento contiene **todos** los detalles técnicos, decisiones de diseño, estado de infraestructura y próximos pasos necesarios para retomar el desarrollo desde cualquier entorno.

---

## 1. Resumen del Proyecto

**Organizalo.app** es un fork de [Plane](https://plane.so) (Open Source Project Management) adaptado como SaaS (SaaS-ified) con branding personalizado.

- **Repositorio**: `https://github.com/barichian/organizalo-app.git`
- **Monorepo**: TurboRepo.
- **Paquetes Principales**:
  - `apps/web`: Aplicación principal (Dashboard/Gestión).
  - `apps/landing`: Landing page (Marketing).

---

## 2. Infraestructura y Despliegue (EasyPanel)

### A. Landing Page (`organizalo.app`)

- **Estado**: ✅ **LIVE** - Funcionando correctamente.
- **Configuración**:
  - **Servicio**: `landing` (Standalone Service).
  - **Build**: `pnpm install && pnpm turbo build --filter=landing`.
  - **Start**: `node apps/landing/.next/standalone/server.js`.
  - **Puerto Interno**: `3000` (Next.js default).
  - **Dominio**: `organizalo.app` -> `Puerta 3000`.

### B. Aplicación Principal (`app.organizalo.app`)

- **Estado**: ⚠️ **CONFIGURADO - REQUIERE AJUSTE MANUAL**.
- **Servicio**: `organizalo-v2` (Docker Compose Stack).
- **Problema Detectado**: Diferencia de Puertos.
  - **EasyPanel** está configurado para mapear `app.organizalo.app` al puerto `3000` del servicio `web`.
  - **Logs del Contenedor**: Muestran que el servicio `web` (Nginx interno) está sirviendo en el puerto **`80`**.
- **Solución Pendiente (Manual)**:
  1. Ir a EasyPanel -> `organizalo-v2` -> Dominios.
  2. Editar `app.organizalo.app`.
  3. Cambiar Puerto Destino de `3000` a **`80`**.

### C. DNS

- **Registros A**:
  - `organizalo.app` -> `82.29.184.99` (Propagado).
  - `app.organizalo.app` -> `82.29.184.99` (Propagado).

---

## 3. Branding y Diseño (Fase Actual)

### Identidad Visual

- **Colores**: Tricolor Venezolano (Amarillo, Azul, Rojo) adaptado a UI moderna.
- **Logo**:
  - **Archivo Maestro**: `brand-logo.png` (Transparente, sin fondo gris).
  - **Script de Generación**: `remove_bg.py` (ubicado en raíz).
    - Usa _Connected Component Analysis_ para limpiar artefactos y _Auto-Crop_.
- **Fuente**: 'Outfit' (Google Fonts).

### Cambios de Código Relevantes

#### `apps/landing`

- **Tailwind**: Configuración depurada (`tailwind.config.cjs`).
- **Next.js**: `output: "standalone"` activado en `next.config.ts` para despliegues ligeros.
- **Linting**: Se suprimieron reglas estrictas (`@typescript-eslint/no-require-imports`) para permitir builds rápidos en producción sin refactorizar todo el legacy code.

---

## 4. Estado del Roadmap

### ✅ Completado

1. **Verificación de Webhook WhatsApp**: Recepción de mensajes operativa.
2. **Rebranding Completo**: Logos, favicons, textos UI ("Plane" -> "Organizalo").
3. **Landing Page**: Diseño finalizado, responsive ok, deploy exitoso.
4. **Deploy App**: Configurado en EasyPanel (falta fix puerto).

### 🚧 Pendiente / Siguientes Pasos

1. **Fix Puerto App**: Aplicar cambio 3000 -> 80 en EasyPanel.
2. **Facturación**: Integrar Stripe/Paddle para suscripciones SaaS.
3. **Permisos (RBAC)**: Definir roles de usuario y límites de plan.
4. **Sync WhatsApp**: Lógica para mapear número de teléfono a usuario de Organizalo.

---

## 5. Notas para el Desarrollador (Tú)

Cuando retomes en la otra PC:

1. **Clone**: `git clone https://github.com/barichian/organizalo-app.git`
2. **Instalación**: `pnpm install` (Puede tardar, es un monorepo grande).
3. **Corrección Prioritaria**: Ve directo a EasyPanel y arregla el puerto de `app.organizalo.app`. Esa es la única barrera para que la app esté 100% online.
