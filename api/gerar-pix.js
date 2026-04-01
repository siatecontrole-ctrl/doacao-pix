export default async function handler(req, res) {
    const { valor } = req.query;

    // Procure a linha abaixo e cole seu código dentro das aspas
    const TOKEN_DOMINIPAY = "62859ded0572f72cbd5f70cc2f85a9f5a89f46f446bc48607883f959f96d6e0d"; 

    if (!valor) {
        return res.status(400).json({ error: "Valor não informado" });
    }

    try {
        const response = await fetch("https://public-api-prod.dominipay.com.br/api-public/payments", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN_DOMINIPAY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: parseFloat(valor),
                email: "doador@contato.com",
                observation: "Doação via Site",
                webhookUrl: "https://seusite.com/api/webhook"
            })
        });

        const dados = await response.json();

        if (response.ok) {
            // A API deles retorna o código PIX no campo 'copyAndPaste'
            return res.status(200).json({ 
                payload: dados.copyAndPaste || dados.qrCode || dados.pixCode 
            });
        } else {
            return res.status(400).json({ error: "Erro na Dominipay", detalhes: dados });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erro de conexão" });
    }
}
