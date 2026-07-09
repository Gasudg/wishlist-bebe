# Deploy Wishlist de 🐣 a Vercel

## Paso 1: Crear Proyecto en Supabase

1. Ve a https://supabase.com y crea una cuenta
2. Crea un nuevo proyecto (elige región cercana)
3. Ve a **SQL Editor** en el panel de Supabase
4. Copia todo el contenido de `supabase-init.sql`
5. Pégalo en el editor SQL y ejecuta

### Obtener las Credenciales

En Supabase, ve a **Project Settings** → **API**:
- Copia la **Project URL** (ej: `https://xxxxx.supabase.co`)
- Copia la **anon public** key (empieza con `eyJhbGciOi...`)

## Paso 2: Preparar el Repositorio

```bash
cd wishlist-bebe

# Inicializar Git
git init
git add .
git commit -m "Initial commit: wishlist app"

# Crear repositorio en GitHub
# 1. Ve a https://github.com/new
# 2. Crea un repo llamado "wishlist-bebe"
# 3. Copia el comando para agregar el remote

git remote add origin https://github.com/tu-usuario/wishlist-bebe.git
git branch -M main
git push -u origin main
```

## Paso 3: Conectar a Vercel

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Deploy
vercel
```

Vercel te pedirá:
- Autorizar tu cuenta de GitHub
- Seleccionar el proyecto
- Confirmar la carpeta raíz (`.`)

## Paso 4: Configurar Variables de Entorno en Vercel

Una vez desplegado:

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto `wishlist-bebe`
3. Ve a **Settings** → **Environment Variables**
4. Agrega dos variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOi...
   ```

5. Click en **Save**

## Paso 5: Redeploy

```bash
# Opción A: Desde la CLI
vercel --prod

# Opción B: Automático
# Si configuraste GitHub, haz push y Vercel desplegará automáticamente
git push origin main
```

## Verificar que Funciona

1. Ve a `https://tu-proyecto.vercel.app`
2. Deberías ver el checklist cargado
3. Intenta tildar un ítem
4. Abre el link en otro dispositivo/navegador y verifica que se sincroniza

## Compartir el Link

Una vez funcionando, comparte el URL:
```
https://tu-proyecto.vercel.app
```

Todos verán el mismo checklist compartido sin necesidad de login.

## Actualizar Después

Si hacés cambios locales:

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

Vercel desplegará automáticamente en ~30 segundos.

---

## Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Verifica que las variables estén en Vercel Settings (no en .env.local)
- Espera ~1 minuto y recarga la página

### Error: "Network request failed"
- Verifica que las credenciales de Supabase sean correctas
- Confirma que la tabla `checklist_state` existe en Supabase

### Los datos no persisten
- Verifica que el SQL de `supabase-init.sql` se ejecutó exitosamente
- Intenta ejecutarlo nuevamente en Supabase SQL Editor

### Cambios locales no aparecen en Vercel
- Haz `git push origin main` y espera ~30 segundos
- Ve a Vercel Dashboard y verifica que el deployment sea "Ready"

---

## URLs Importantes

- **Tu Wishlist**: `https://tu-proyecto.vercel.app`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Console**: https://app.supabase.com
- **GitHub Repo**: Configurado automáticamente
