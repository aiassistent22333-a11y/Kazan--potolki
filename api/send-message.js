export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    // В Каналах ID часто передается без минуса или с префиксом, 
    // но сначала попробуем точное число из ссылки.
    const MAX_CHANNEL_ID = "-74685431444153"; 
    
    const { text } = req.body;

    try {
        // Для каналов в некоторых версиях API MAX используется путь /posts или специальный флаг
        // Пробуем универсальный метод, но с корректным именованием для канала
        const response = await fetch('https://platform-api.max.ru/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': MAX_BOT_TOKEN
            },
            body: JSON.stringify({
                // ВНИМАНИЕ: Для каналов часто поле называется channel_id или 
                // объект recipient должен содержать тип чата.
                chat_id: MAX_CHANNEL_ID,
                text: text,
                // Добавляем флаги, которые могут потребоваться для публикации в канал
                is_channel: true,
                broadcast: true
            })
        });

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            data = { message: responseText };
        }

        return res.status(response.status).json(data);
        
    } catch (error) {
        return res.status(500).json({ message: 'Vercel Server Error: ' + error.message });
    }
}
