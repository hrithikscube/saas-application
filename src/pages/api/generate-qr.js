import QRCode from 'qrcode';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST method is allowed' });
    }

    const { url = 'https://profile.scube.africa' } = req.body;

    try {
        const qrDataUrl = await QRCode.toDataURL(url);
        const base64Data = qrDataUrl.split(',')[1]; // Remove data:image/png;base64,

        res.status(200).json({ base64: `data:image/png;base64,${base64Data}` });
    } catch (err) {
        res.status(500).json({ error: 'QR generation failed', details: err.message });
    }
}