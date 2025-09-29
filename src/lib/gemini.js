import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function analyzeWasteImage(imageBase64) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
    Analisis gambar sampah ini dan berikan respons dalam format JSON dengan struktur berikut:
    {
      "wasteType": "organic|inorganic|hazardous",
      "itemName": "nama spesifik sampah",
      "category": "kategori detail",
      "binColor": "green|yellow|red",
      "disposalTips": "tips pembuangan yang tepat",
      "recyclable": true/false,
      "decompositionTime": "waktu degradasi",
      "confidence": 0.85
    }

    Klasifikasi:
    - organic (green bin): sampah organik seperti sisa makanan, daun, ranting
    - inorganic (yellow bin): plastik, kertas, logam, kaca yang bisa didaur ulang
    - hazardous (red bin): baterai, lampu, obat-obatan, bahan kimia

    Berikan respons dalam bahasa Indonesia dan pastikan JSON valid.
    `;

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: 'image/jpeg'
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Could not parse AI response');
  } catch (error) {
    console.error('Error analyzing waste:', error);
    throw error;
  }
}

export async function getWasteEducationInfo(wasteType) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    Berikan informasi edukatif tentang sampah ${wasteType} dalam format JSON:
    {
      "tips": ["tip 1", "tip 2", "tip 3"],
      "benefits": ["manfaat 1", "manfaat 2"],
      "facts": ["fakta menarik 1", "fakta menarik 2"],
      "impact": "dampak lingkungan jika tidak dikelola dengan baik"
    }

    Berikan respons dalam bahasa Indonesia.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Could not parse AI response');
  } catch (error) {
    console.error('Error getting education info:', error);
    throw error;
  }
}