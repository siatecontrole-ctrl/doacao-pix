export default async function handler(req, res) {
    const { valor, checkId } = req.query;
    const TOKEN_DOMINIPAY = "colarseutokenaqui"; // COLOQUE SEU TOKEN AQUI

    // SE O SITE ESTIVER SÓ CONSULTANDO O STATUS
    if (checkId) {
        try {
            const response = await fetch(`https://public-api-prod.dominipay.com.br/api-public/payments/${checkId}`, {
                headers: { "Authorization": `Bearer ${TOKEN_DOMINIPAY}` }
            });
            const status = await response.json();
            return res.status(200).json(status);
        } catch (e) { return res.status(500).json({ error: "Erro na consulta" }); }
    }

    // SE O SITE ESTIVER CRIANDO UM PIX NOVO
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
                observation: "Doacao via Site"
            })
        });

        const dados = await response.json();
        return res.status(response.ok ? 200 : 400).json(dados);

    } catch (error) {
        return res.status(500).json({ error: "Erro de rede" });
    }
}
