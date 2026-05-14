export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    // Используем подтвержденный ID как число (integer), как требует документация MAX
    const MAX_CHAT_ID = -74685431444153; 
    const { text } = req.body;

    try {
        const response = await fetch('https://platform-api.max.ru/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Именно этот формат потребовала поддержка: чистый токен в Authorization
                'Authorization': MAX_BOT_TOKEN 
            },
            body: JSON.stringify({
                chat_id: MAX_CHAT_ID,
                text: text
            })
        });

        const data = await response.json();

        // Пробрасываем статус и данные от MAX напрямую на фронтенд
        return res.status(response.status).json(data);
        
    } catch (error) {
        // Ошибка самого сервера Vercel (например, таймаут)
        return res.status(500).json({ message: 'Vercel Server Error: ' + error.message });
    }
}
