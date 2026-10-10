import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI instance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint to generate math problems using Gemini
app.post('/api/generate-math-problem', async (req, res) => {
  try {
    const { prompt, topic, gradeLevel, difficulty } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY_MISSING',
        message: 'Kunci API Gemini belum dikonfigurasi. Silakan gunakan generator template instan yang tersedia.',
      });
    }

    const systemPrompt = `Anda adalah pakar pembuat soal matematika interaktif kurikulum Indonesia (SD, SMP, SMA/SMK, UTBK).
Tugas Anda adalah membuat 1 butir soal matematika yang BERKUALITAS TINGGI, LENGKAP DENGAN DATA VISUAL/DIAGRAM dan PARAMETER SIMULASI INTERAKTIF.

Soal matematika harus:
1. Menggunakan Bahasa Indonesia yang baku, edukatif, dan kontekstual (soal cerita / aplikasi dunia nyata).
2. Memiliki diagram visual pendukung yang jelas.
3. Memiliki tipe simulasi yang relevan (misal: 'pythagoras', 'circle_sector', 'linear_function', 'quadratic_function', 'fraction_pie', 'angle_geometry', 'trigonometry_elevation', 'probability_spinner', 'scale_balance', 'area_perimeter').
4. Memiliki 4 pilihan ganda (A, B, C, D) dengan 1 jawaban yang tepat.
5. Memiliki pembahasan langkah demi langkah (step-by-step solution) dengan rumus matematika yang jelas dan akurat.
6. Angka-angka dalam soal harus logis dan rapi (hindari angka koma desimal panjang kecuali diperlukan).

Berikan data dalam format JSON sesuai schema.`;

    const userPrompt = `Buatlah soal matematika dengan spesifikasi:
- Topik: ${topic || 'Geometri / Aljabar / Aritmatika'}
- Jenjang: ${gradeLevel || 'SMP'}
- Tingkat Kesulitan: ${difficulty || 'Sedang'}
- Instruksi Khusus/Permintaan Guru: ${prompt || 'Buat soal cerita yang menarik dengan simulasi visual.'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Judul topik soal singkat' },
            gradeLevel: { type: Type.STRING, description: 'SD, SMP, atau SMA' },
            topic: { type: Type.STRING, description: 'Nama topik matematika' },
            difficulty: { type: Type.STRING, description: 'Mudah, Sedang, atau Sulit' },
            questionText: { type: Type.STRING, description: 'Teks soal lengkap dengan narasi kontekstual' },
            diagramType: {
              type: Type.STRING,
              description: 'pythagoras, circle_sector, linear_function, quadratic_function, fraction_pie, angle_geometry, trigonometry_elevation, probability_spinner, scale_balance, area_perimeter',
            },
            diagramParams: {
              type: Type.OBJECT,
              description: 'Parameter angka untuk diagram dan simulasi interaktif',
              properties: {
                val1: { type: Type.NUMBER, description: 'Nilai variabel utama 1 (misal alas, jari-jari, m, sudut)' },
                val2: { type: Type.NUMBER, description: 'Nilai variabel utama 2 (misal tinggi, sudut busur, c, jarak)' },
                val3: { type: Type.NUMBER, description: 'Nilai variabel 3 jika ada' },
                unit: { type: Type.STRING, description: 'Satuan ukuran, misal cm, m, derajat, bagian' },
                label1: { type: Type.STRING, description: 'Label untuk variabel 1' },
                label2: { type: Type.STRING, description: 'Label untuk variabel 2' },
                label3: { type: Type.STRING, description: 'Label untuk variabel 3' },
                caption: { type: Type.STRING, description: 'Keterangan diagram' },
              },
              required: ['val1', 'val2', 'unit', 'caption'],
            },
            simulationInstructions: {
              type: Type.STRING,
              description: 'Petunjuk eksplorasi simulasi untuk siswa/guru',
            },
            options: {
              type: Type.ARRAY,
              description: '4 pilihan jawaban [A, B, C, D]',
              items: { type: Type.STRING },
            },
            correctAnswerIndex: {
              type: Type.INTEGER,
              description: 'Indeks jawaban yang benar (0 untuk A, 1 untuk B, 2 untuk C, 3 untuk D)',
            },
            correctAnswerLabel: {
              type: Type.STRING,
              description: 'Huruf opsi yang benar: A, B, C, atau D',
            },
            explanation: {
              type: Type.STRING,
              description: 'Pembahasan lengkap langkah demi langkah beserta rumus matematisnya',
            },
            keyFormula: {
              type: Type.STRING,
              description: 'Rumus kunci utama yang digunakan, misal c^2 = a^2 + b^2 atau L = 1/2 * a * t',
            },
          },
          required: [
            'title',
            'gradeLevel',
            'topic',
            'difficulty',
            'questionText',
            'diagramType',
            'diagramParams',
            'simulationInstructions',
            'options',
            'correctAnswerIndex',
            'correctAnswerLabel',
            'explanation',
            'keyFormula',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, problem: parsed });
  } catch (error: any) {
    console.error('Error in /api/generate-math-problem:', error);
    return res.status(500).json({
      error: 'GENERATION_FAILED',
      message: error?.message || 'Gagal membuat soal dengan AI.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
