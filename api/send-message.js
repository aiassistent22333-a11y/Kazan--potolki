export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    const MAX_CHAT_ID = '-74685431444153'; 
    const { text } = req.body;

    const url = 'https://platform-api.max.ru/messages';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': MAX_BOT_TOKEN // Прямой токен без слова Bearer согласно саппорту
            },
            body: JSON.stringify({
                chat_id: String(MAX_CHAT_ID), // Принудительно передаем как строку
                text: text
            })
        });

        const result = await response.json();

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            // Возвращаем детальную ошибку от MAX, чтобы она отобразилась на сайте
            return res.status(response.status).json({
                error: result,
                statusText: result.message || 'Bad Request'
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}
