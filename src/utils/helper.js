// Вспомогательные функции для проекта блога

// Форматирует дату (например: "1 Октября 2025")
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Ограничивает длину текста (например: превью поста)
export function truncateText(text, maxLength = 100) {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

// Генерация случайного ID (для временных постов)
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}