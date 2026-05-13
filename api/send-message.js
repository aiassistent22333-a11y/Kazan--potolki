export default async function handler(req, res) {
    // Разрешаем только POST запросы от вашего квиза
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешен' });
    }

    // ВАШИ ДАННЫЕ ИЗ МЕССЕНДЖЕРА MAX
    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH'; 
    const MAX_CHAT_ID = '74685431444153'; 
    
    const { text } = req.body;

    try {
        const response = await fetch(`https://platform-api.max.ru/v1/sendMessage`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAX_BOT_TOKEN}`
            },
            body: JSON.stringify({
                chat_id: MAX_CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            console.error('MAX API Response Error:', data);
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ error: 'Ошибка сервера при отправке лида' });
    }
}
