export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Получаем готовый текст сообщения, который прислал сайт
    const { text } = req.body;
    
    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    const MAX_CHAT_ID = '-74685431444153'; 

    // Отправляем запрос именно на тот адрес, который поддерживает MAX
    const response = await fetch('https://platform-api.max.ru/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAX_BOT_TOKEN}`
      },
      body: JSON.stringify({
        chat_id: MAX_CHAT_ID,
        text: text
      })
    });

    const result = await response.json();

    if (response.ok) {
      // Если MAX принял сообщение — возвращаем успех сайту
      return res.status(200).json({ success: true });
    } else {
      // Если MAX вернул ошибку — выводим её в логи Vercel
      console.error('Ошибка платформы MAX:', result);
      return res.status(response.status).json({ success: false, error: result });
    }
  } catch (error) {
    // Если произошла сетевая ошибка
    console.error('Критическая ошибка сервера:', error);
    return res.status(500).json({ success: false });
  }
}
