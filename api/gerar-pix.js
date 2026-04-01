export default async function handler(req, res) {
    // Pegamos o valor que o usuário digitou (ex: ?valor=10)
    const { valor } = req.query;

    // COLOQUE SUA CHAVE AQUI (dentro das aspas)
    const TOKEN_DOMINIPAY = "SUA_CHAVE_AQUI"; 

    if (!valor) {
        return res.status(400).json({ error: "Valor não informado" });
    }

    try {
        // Chamada real para a API da Dominipay
        const response = await fetch("https://api.dominipay.com.br/v1/pix/immediate-charge", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN_DOMINIPAY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: parseFloat(valor), // Garante que o valor seja um número
                description: "Doação Causa Única"
            })
        });

        const dados = await response.json();

        if (response.ok) {
            // Enviamos para o seu site o código Copia e Cola
            return res.status(200).json({ 
                payload: dados.pix_code 
            });
        } else {
            return res.status(400).json({ error: "Erro na Dominipay", detalhes: dados });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erro de conexão com o servidor" });
    }
}
