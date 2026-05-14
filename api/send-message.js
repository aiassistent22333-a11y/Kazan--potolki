export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    const MAX_CHAT_ID = -74735565042361; 
    
    const { text } = req.body;

    try {
        const payload = {
            chat_id: MAX_CHAT_ID,
            text: text
        };

        const response = await fetch('https://platform-api.max.ru/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': MAX_BOT_TOKEN
            },
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            data = { message: responseText };
        }

        // Если это все еще "Unknown recipient", значит сервер MAX требует ID без минуса
        // или в другом поле. Но сначала пробуем этот чистый вариант.
        return res.status(response.status).json(data);
        
    } catch (error) {
        return res.status(500).json({ message: 'Vercel Server Error: ' + error.message });
    }
}
