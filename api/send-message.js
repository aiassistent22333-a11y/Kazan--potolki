export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    
    // МЫ УБРАЛИ МИНУС. В API многих систем группы идентифицируются просто по номеру.
    // Передаем как СТРОКУ, так как это безопаснее для длинных чисел.
    const MAX_CHAT_ID = "74685431444153"; 
    const { text } = req.body;

    try {
        const response = await fetch('https://platform-api.max.ru/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': MAX_BOT_TOKEN 
            },
            body: JSON.stringify({
                chat_id: MAX_CHAT_ID,
                text: text
            })
        });

        const data = await response.json();

        // Возвращаем результат обратно на фронтенд
        return res.status(response.status).json(data);
        
    } catch (error) {
        return res.status(500).json({ message: 'Vercel Server Error: ' + error.message });
    }
}
