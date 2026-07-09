# Wishlist de 🐣 - Setup Guide

## Setup Local

### 1. Supabase Configuration

#### Opción A: Usar Supabase (Recomendado)

1. Ve a [supabase.com](https://supabase.com) y crea una nueva cuenta/proyecto
2. Una vez en tu proyecto, ve a **SQL Editor** → **New Query**
3. Copia el contenido de `supabase-init.sql` y pégalo en el editor
4. Ejecuta la query para crear la tabla `checklist_state`
5. Ve a **Project Settings** → **API** y copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar Localmente

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Deploy a Vercel

### 1. Crear Repositorio Git

```bash
cd wishlist-bebe
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/wishlist-bebe.git
git push -u origin main
```

### 2. Conectar a Vercel

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones interactivas. Vercel te pedirá que autorices tu cuenta de GitHub.

### 3. Configurar Variables de Entorno en Vercel

Una vez desplegado, ve a tu proyecto en [vercel.com](https://vercel.com):

1. **Settings** → **Environment Variables**
2. Agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key de Supabase

### 4. Redeploy

```bash
vercel --prod
```

O simplemente hace push a `main` en GitHub y Vercel desplegará automáticamente.

## URLs Importantes

Una vez desplegado:
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Tu App**: https://tu-proyecto.vercel.app
- **Supabase Project**: https://app.supabase.com

## Troubleshooting

### "Error: Missing Supabase environment variables"

Asegúrate de que:
- Las variables están en `.env.local` (para desarrollo local) o en Vercel settings (para producción)
- Las variables tienen el prefijo `NEXT_PUBLIC_` (visible en el cliente)
- Los valores no tienen espacios ni comillas adicionales

### "Table doesn't exist"

Corre el SQL en `supabase-init.sql` nuevamente desde el SQL Editor de Supabase.

### Los cambios no se sincronizan entre dispositivos

El checklist hace polling cada 5 segundos. Si ves que los cambios no aparecen:
1. Espera ~5 segundos
2. Recarga la página si es necesario
3. Verifica que las variables de entorno estén correctas en Vercel

## Funcionalidades

✅ Checklist compartido en tiempo real  
✅ Tiles numerados para ítems con cantidad >1  
✅ Progreso por sección + progreso general  
✅ Exportar pendientes a PDF  
✅ Reiniciar checklist  
✅ Diseño cálido y prolijo (paleta de bebé niña)  
✅ Mobile-first responsive  

## Notas Importantes

- La app es **sin login**: cualquiera que tenga el link puede ver y editar el checklist
- Los datos se guardan en una **base de datos compartida**, no en localStorage
- El estado se sincroniza cada 5 segundos entre dispositivos
- Los PDFs se generan solo con ítems **pendientes** (no tildados)
