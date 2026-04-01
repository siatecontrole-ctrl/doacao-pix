export default async function handler(req, res) {
    const { valor } = req.body;

    // Aqui você vai colar a sua chave que pegou no painel da Dominipay
    const TOKEN_DOMINIPAY = "SUA_CHAVE_AQUI"; 

    try {
        const response = await fetch("https://api.dominipay.com.br/v1/pix/pix-dinamico", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN_DOMINIPAY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: valor,
                description: "Doação Causa Única"
            })
        });

        const data = await response.json();
        
        // Devolve o QR Code real para o seu site
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao gerar PIX" });
    }
}
