# FeelTrack - Sistema de Diseño

## Paleta de Colores

### Colores Principales
- **Primary**: `#667eea` - Azul principal
- **Secondary**: `#764ba2` - Púrpura secundario
- **Success**: `#10b981` - Verde para éxito
- **Warning**: `#f59e0b` - Amarillo para advertencias
- **Danger**: `#ef4444` - Rojo para errores
- **Info**: `#3b82f6` - Azul para información

### Gradientes
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Secondary Gradient**: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- **Success Gradient**: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- **Warning Gradient**: `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)`
- **Danger Gradient**: `linear-gradient(135deg, #fa709a 0%, #fee140 100%)`

### Colores de Texto
- **Primary Text**: `#1f2937` - Texto principal
- **Secondary Text**: `#6b7280` - Texto secundario
- **Light Text**: `#9ca3af` - Texto claro
- **White Text**: `#ffffff` - Texto blanco

### Colores de Fondo
- **Primary Background**: `#ffffff` - Fondo principal
- **Secondary Background**: `#f8fafc` - Fondo secundario
- **Tertiary Background**: `#f1f5f9` - Fondo terciario
- **Dark Background**: `#0f172a` - Fondo oscuro

## Tipografía

### Fuentes
- **Primary Font**: `Inter` - Para texto general
- **Heading Font**: `Poppins` - Para títulos y encabezados

### Tamaños de Fuente
- **xs**: `0.75rem` (12px)
- **sm**: `0.875rem` (14px)
- **base**: `1rem` (16px)
- **lg**: `1.125rem` (18px)
- **xl**: `1.25rem` (20px)
- **2xl**: `1.5rem` (24px)
- **3xl**: `1.875rem` (30px)
- **4xl**: `2.25rem` (36px)
- **5xl**: `3rem` (48px)
- **6xl**: `3.75rem` (60px)

## Espaciado

### Variables de Espaciado
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)

## Bordes Redondeados

### Variables de Radio
- **sm**: `0.375rem` (6px)
- **md**: `0.5rem` (8px)
- **lg**: `0.75rem` (12px)
- **xl**: `1rem` (16px)
- **2xl**: `1.5rem` (24px)
- **full**: `9999px` (círculo completo)

## Sombras

### Variables de Sombra
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
- **2xl**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

## Transiciones

### Variables de Transición
- **fast**: `0.15s ease`
- **normal**: `0.3s ease`
- **slow**: `0.5s ease`

## Componentes

### Botones
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md) var(--space-xl);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}
```

### Tarjetas
```css
.card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
}
```

### Contenedores
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.container-narrow {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}
```

## Animaciones

### Keyframes Principales
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

### Clases de Animación
- `.animate-fade-in`
- `.animate-fade-in-up`
- `.animate-fade-in-down`
- `.animate-slide-in-left`
- `.animate-slide-in-right`
- `.animate-pulse`
- `.animate-float`

## Utilidades

### Display
- `.flex`, `.inline-flex`, `.grid`, `.block`, `.inline-block`, `.hidden`

### Flexbox
- `.items-center`, `.items-start`, `.items-end`
- `.justify-center`, `.justify-between`, `.justify-around`
- `.flex-col`, `.flex-row`, `.flex-wrap`, `.flex-1`

### Grid
- `.grid-cols-1`, `.grid-cols-2`, `.grid-cols-3`, `.grid-cols-4`
- `.gap-1`, `.gap-2`, `.gap-3`, `.gap-4`, `.gap-5`, `.gap-6`

### Espaciado
- `.mt-0` a `.mt-6` (margin-top)
- `.mb-0` a `.mb-6` (margin-bottom)
- `.p-0` a `.p-6` (padding)

### Texto
- `.text-center`, `.text-left`, `.text-right`
- `.text-primary`, `.text-secondary`, `.text-success`, `.text-warning`, `.text-danger`, `.text-info`
- `.font-light`, `.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`, `.font-extrabold`

## Responsive Design

### Breakpoints
- **Mobile**: `max-width: 480px`
- **Tablet**: `max-width: 768px`
- **Desktop**: `max-width: 1024px`
- **Large Desktop**: `max-width: 1200px`

### Ejemplo de Media Query
```css
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-md);
  }
  
  h1 { font-size: var(--text-4xl); }
  h2 { font-size: var(--text-3xl); }
  h3 { font-size: var(--text-2xl); }
}
```

## Iconografía

### Emojis para Emociones
- **Alegría**: 😊
- **Tristeza**: 😢
- **Enojo**: 😠
- **Sorpresa**: 😲
- **Miedo**: 😨
- **Neutral**: 😐

### Iconos de Acción
- **Análisis**: 🧠
- **Comenzar**: 🚀
- **Características**: ✨
- **Texto**: 📝
- **Resultados**: 📊
- **Palabras Clave**: 🔑
- **Confianza**: 🎯
- **Error**: ⚠️
- **Limpiar**: 🗑️
- **Procesando**: ⏳

## Estados

### Estados de Botones
- **Normal**: Color de fondo con sombra
- **Hover**: Transformación hacia arriba y sombra más pronunciada
- **Active**: Transformación hacia abajo
- **Disabled**: Opacidad reducida y cursor not-allowed

### Estados de Tarjetas
- **Normal**: Sombra estándar
- **Hover**: Transformación hacia arriba y sombra más pronunciada
- **Active**: Transformación hacia abajo

## Accesibilidad

### Contraste
- Todos los colores cumplen con las pautas WCAG 2.1 AA
- Contraste mínimo de 4.5:1 para texto normal
- Contraste mínimo de 3:1 para texto grande

### Navegación por Teclado
- Todos los elementos interactivos son accesibles por teclado
- Indicadores de foco visibles
- Orden de tabulación lógico

### Lectores de Pantalla
- Textos alternativos para imágenes
- Etiquetas ARIA apropiadas
- Estructura semántica correcta 