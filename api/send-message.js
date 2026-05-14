export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    // Используем подтвержденный ID. В API MAX для групп ID передается как число.
    const MAX_CHAT_ID = -74685431444153; 
    const { text } = req.body;

    try {
        const response = await fetch('https://platform-api.max.ru/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': MAX_BOT_TOKEN 
            },
            body: JSON.stringify({
                chat_id: MAX_CHAT_ID,
                text: text
            })
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            // Возвращаем ошибку от MAX (например, если еще висит 429)
            return res.status(response.status).json(data);
        }
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}
