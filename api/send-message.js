export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
  const MAX_CHAT_ID = '-74685431444153'; 
  
  const { text } = req.body;

  try {
    // Переносим токен в URL, так как сервер MAX выдал ошибку "No access token" при использовании Headers
    const url = `https://platform-api.max.ru/messages?token=${MAX_BOT_TOKEN}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
      return res.status(response.status).json({ 
        success: false, 
        status: response.status,
        error: result 
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
