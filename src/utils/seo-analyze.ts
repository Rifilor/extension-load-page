interface ISeoItem {
  title: string
  description: string
  recomendation: string
}
export const getAnalyzeSeo = (): ISeoItem[] => {
  const results: ISeoItem[] = []

  // Title
  results.push(getTitleAnalyze())

  // Meta Description
  results.push(getMetaDescriptionAnalyze())

  // Canonical
  results.push(getCanonicalAnalyze())

  // Robots meta
  results.push(getRobotsMetaAnalyze())

  // Favicon
  results.push(getFaviconAnalyze())

  // Language tag
  results.push(getLanguageTagAnalyze())

  // Structured Data (Schema.org)
  results.push(getStructuredDataAnalyze())

  // Viewport
  results.push(getViewportAnalyze())

  return results
}
const getTitleAnalyze = (): ISeoItem => {
  const title = document.title
  return {
    title: 'Title',
    description: title && title.length <= 60 ? 'Успішно' : 'Проблема з Title',
    recomendation:
      title && title.length <= 60
        ? 'Ваш заголовок сторінки відповідає вимогам. Переконайтесь, що він передає суть контенту сторінки та містить ключові слова. Рекомендовано не перевищувати 60 символів.'
        : 'Додайте тег <title> до HTML-документа, довжина має бути до 60 символів. Наприклад: <title>Ваш заголовок</title>',
  }
}

const getMetaDescriptionAnalyze = (): ISeoItem => {
  const description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null

  return {
    title: 'Meta Description',
    description:
      description && description.content.length > 0
        ? 'Успішно'
        : 'Не вказано або порожня meta description',
    recomendation:
      description && description.content.length > 0
        ? 'Meta description присутня. Переконайтесь, що вона коротко описує зміст сторінки (до 160 символів) і містить ключові слова.'
        : 'Додайте тег: <meta name="description" content="Короткий опис сторінки.">',
  }
}

const getCanonicalAnalyze = (): ISeoItem => {
  const canonical = document.querySelector('link[rel="canonical"]')
  return {
    title: 'Canonical URL',
    description: canonical ? 'Успішно' : 'Canonical URL відсутній',
    recomendation: canonical
      ? 'Canonical URL встановлено правильно. Переконайтесь, що він вказує на оригінальну версію сторінки.'
      : 'Додайте тег: <link rel="canonical" href="https://example.com/"> у <head>',
  }
}

const getRobotsMetaAnalyze = (): ISeoItem => {
  const robots = document.querySelector('meta[name="robots"]')
  return {
    title: 'Robots Meta Tag',
    description: robots ? 'Успішно' : 'Robots тег відсутній',
    recomendation: robots
      ? 'Тег robots присутній. Переконайтесь, що він не блокує важливі сторінки (наприклад: "index, follow").'
      : 'Додайте тег: <meta name="robots" content="index, follow">',
  }
}

const getFaviconAnalyze = (): ISeoItem => {
  const favicon = document.querySelector('link[rel="icon"]')
  return {
    title: 'Favicon',
    description: favicon ? 'Успішно' : 'Favicon не знайдено',
    recomendation: favicon
      ? 'Favicon встановлений. Переконайтесь, що він відображається у браузері та відповідає бренду.'
      : 'Додайте тег: <link rel="icon" href="/favicon.ico">',
  }
}

const getLanguageTagAnalyze = (): ISeoItem => {
  const lang = document.documentElement.lang
  return {
    title: 'Language Attribute',
    description: lang ? 'Успішно' : 'Атрибут lang відсутній',
    recomendation: lang
      ? 'Атрибут lang присутній. Це важливо для SEO та доступності.'
      : 'Додайте lang до тегу <html>, наприклад: <html lang="uk">',
  }
}

const getStructuredDataAnalyze = (): ISeoItem => {
  const hasSchema = document.querySelector('[type="application/ld+json"]')
  return {
    title: 'Structured Data (Schema.org)',
    description: hasSchema ? 'Успішно' : 'Структуровані дані відсутні',
    recomendation: hasSchema
      ? 'Структуровані дані присутні. Використовуйте https://validator.schema.org/ для перевірки.'
      : 'Додайте JSON-LD блок для структурованих даних. Наприклад: <script type="application/ld+json">{ "@context": "https://schema.org", "@type": "Organization", "name": "Назва" }</script>',
  }
}

const getViewportAnalyze = (): ISeoItem => {
  const viewport = document.querySelector('meta[name="viewport"]')
  return {
    title: 'Viewport Meta Tag',
    description: viewport ? 'Успішно' : 'Viewport тег відсутній',
    recomendation: viewport
      ? 'Viewport тег присутній. Це важливо для адаптивності.'
      : 'Додайте тег: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
  }
}
