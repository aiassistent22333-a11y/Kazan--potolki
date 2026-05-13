export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    const MAX_CHAT_ID = '-74685431444153'; 
    const { text } = req.body;

    // Согласно ответу поддержки: токен передается в заголовке Authorization БЕЗ Bearer
    // Передача через URL (?token=) больше не поддерживается
    const url = 'https://platform-api.max.ru/messages';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': MAX_BOT_TOKEN // Чистый токен без префиксов
            },
            body: JSON.stringify({
                chat_id: MAX_CHAT_ID,
                text: text
            })
        });

        const result = await response.json();

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            // Если сервер вернул ошибку (например, 429), пробрасываем её для диагностики
            return res.status(response.status).json(result);
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}
