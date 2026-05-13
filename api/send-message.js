export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { answers, contact, total } = req.body;
    
    const MAX_BOT_TOKEN = 'f9LHodD0cOL9_5xlu4YqA_EkNyyXrr1Y6C0oFH7iQMGH5gEHCgpavctDLEzn32HPisUK5WPXkG7aCWqI5MvH';
    const MAX_CHAT_ID = '-74685431444153'; 

    const text = `
🚀 НОВАЯ ЗАЯВКА: КАЗАНСКИЕ ПОТОЛКИ
---------------------------
💰 ПРЕДВАРИТЕЛЬНАЯ ЦЕНА: ${total} ₽
📱 ТЕЛЕФОН: ${contact}

📋 ОТВЕТЫ НА КВИЗ:
${answers.map((a, i) => `${i + 1}. ${a.question}: ${a.answer}`).join('\n')}
---------------------------
    `;

    const response = await fetch('https://platform-api.max.ru/v1/sendMessage', {
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
      return res.status(200).json({ success: true });
    } else {
      console.error('Ошибка MAX API:', result);
      return res.status(500).json({ success: false, error: result });
    }
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return res.status(500).json({ success: false });
  }
}
