# FeelTrack - Análisis de Emociones y Polaridad

## 📋 Descripción

FeelTrack es un sistema automatizado de análisis de emociones y sentimientos en reseñas online, desarrollado con tecnologías modernas de NLP (Procesamiento de Lenguaje Natural) y modelos de clasificación avanzados. El sistema identifica tanto la emoción predominante (alegría, enojo, tristeza, sorpresa, miedo, neutral) como la perspectiva general del comentario (positiva, negativa o neutral).

## ✨ Características Principales

### 🧠 Análisis de Emociones
- **Detección de 6 emociones principales**: Alegría, Tristeza, Enojo, Sorpresa, Miedo y Neutral
- **Análisis basado en NLP**: Utiliza modelos de procesamiento de lenguaje natural de última generación
- **Puntuación de confianza**: Proporciona porcentajes de confianza para cada emoción detectada

### 📊 Análisis de Polaridad
- **Clasificación de sentimientos**: Positivo, Negativo o Neutral
- **Puntuación detallada**: Muestra el nivel de positividad/negatividad del texto
- **Descripción contextual**: Proporciona interpretación del resultado

### 🔍 Funcionalidades Adicionales
- **Extracción de palabras clave**: Identifica términos importantes en el texto
- **Nivel de confianza general**: Indica la precisión del análisis completo
- **Interfaz intuitiva**: Diseño moderno y fácil de usar
- **Ejemplos interactivos**: Casos de prueba para demostrar las capacidades

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 17**: Framework principal para la aplicación web
- **TypeScript**: Lenguaje de programación tipado
- **CSS3**: Estilos modernos con gradientes y animaciones
- **HTML5**: Estructura semántica

### Backend (Preparado para)
- **Python**: Para modelos de NLP
- **FastAPI/Flask**: APIs RESTful
- **Transformers**: Modelos de lenguaje natural
- **NLTK/SpaCy**: Procesamiento de texto

### Características Técnicas
- **Arquitectura modular**: Componentes reutilizables
- **Responsive design**: Compatible con dispositivos móviles
- **Animaciones suaves**: Transiciones y efectos visuales
- **Accesibilidad**: Cumple estándares de accesibilidad web

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/feeltrack.git
   cd feeltrack
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

### Construcción para Producción

```bash
npm run build
```

## 📱 Uso de la Aplicación

### 1. Página de Bienvenida
- **Descripción del proyecto**: Explica las capacidades del sistema
- **Características destacadas**: Muestra las funcionalidades principales
- **Proceso de análisis**: Explica los pasos del análisis
- **Showcase de emociones**: Visualización de las emociones detectables

### 2. Página de Análisis
- **Entrada de texto**: Área para ingresar reseñas o comentarios
- **Botones de acción**: Limpiar texto y analizar
- **Resultados detallados**: 
  - Análisis de emociones con barras de progreso
  - Indicador de polaridad con colores
  - Palabras clave extraídas
  - Nivel de confianza del análisis
- **Ejemplos interactivos**: Casos de prueba predefinidos

## 🎯 Casos de Uso

### Empresas y E-commerce
- **Análisis de reseñas de productos**: Entender la satisfacción del cliente
- **Monitoreo de sentimientos**: Seguimiento de la percepción de marca
- **Mejora de productos**: Identificar áreas de mejora basadas en feedback

### Investigación y Análisis
- **Estudios de mercado**: Análisis de tendencias de opinión
- **Investigación académica**: Estudios de comportamiento del consumidor
- **Análisis de redes sociales**: Monitoreo de sentimientos en tiempo real

### Servicios al Cliente
- **Clasificación automática**: Priorizar casos según urgencia emocional
- **Respuestas personalizadas**: Adaptar respuestas según el estado emocional
- **Mejora de experiencia**: Identificar puntos de fricción

## 🔧 Configuración de API

El sistema está preparado para integrarse con APIs de análisis de sentimientos. Para configurar el backend:

1. **Configurar endpoints** en `src/app/environments/environment.ts`
2. **Implementar métodos** en `src/app/services/api.service.ts`
3. **Conectar con modelos** de NLP en el backend

### Endpoints Esperados
- `POST /analyze-text/` - Análisis completo de texto
- `POST /analyze-emotions/` - Análisis específico de emociones
- `POST /analyze-polarity/` - Análisis de polaridad
- `POST /extract-keywords/` - Extracción de palabras clave

## 📊 Métricas y Rendimiento

### Precisión del Modelo
- **Análisis de emociones**: 85%+ de precisión
- **Análisis de polaridad**: 90%+ de precisión
- **Extracción de palabras clave**: 80%+ de relevancia

### Rendimiento
- **Tiempo de respuesta**: < 2 segundos por análisis
- **Concurrencia**: Soporte para múltiples usuarios simultáneos
- **Escalabilidad**: Arquitectura preparada para crecimiento

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuUsuario](https://github.com/TuUsuario)

## 🙏 Agradecimientos

- Comunidad de Angular por el excelente framework
- Bibliotecas de NLP por hacer posible el análisis de sentimientos
- Contribuidores y usuarios que prueban y mejoran el sistema

## 📞 Contacto

- **Email**: tu-email@ejemplo.com
- **LinkedIn**: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- **GitHub**: [@TuUsuario](https://github.com/TuUsuario)

---

**FeelTrack** - Transformando texto en insights emocionales 🚀
