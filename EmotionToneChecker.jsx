import React, { useState } from "react";

function detectEmotionAndTone(text) {
  const lower = text.toLowerCase();
  const emotionScores = { joy: 0, sadness: 0, anger: 0, fear: 0, neutral: 0 };

  const joyWords = ["happy", "love", "great", "awesome", "yay", "excited", "pleased", "fun"];
  const sadWords = ["sad", "unhappy", "depressed", "mourn", "sorrow", "cry"];
  const angerWords = ["angry", "mad", "furious", "hate", "annoyed"];
  const fearWords = ["scared", "afraid", "nervous", "worried", "fear"];

  joyWords.forEach((w) => lower.includes(w) && (emotionScores.joy += 1));
  sadWords.forEach((w) => lower.includes(w) && (emotionScores.sadness += 1));
  angerWords.forEach((w) => lower.includes(w) && (emotionScores.anger += 1));
  fearWords.forEach((w) => lower.includes(w) && (emotionScores.fear += 1));

  const maxEmotion = Object.keys(emotionScores).reduce((a, b) =>
    emotionScores[a] >= emotionScores[b] ? a : b
  );

  let tone = "Neutral";
  if (/[!?]{2,}/.test(text)) tone = "Excited / Strong";
  else if (/[.?!]$/.test(text) && /please|could|would/.test(lower)) tone = "Polite";
  else if (/[a-z]{1,}(:|-)\)/.test(text)) tone = "Playful";

  const isAllZero = Object.values(emotionScores).every((v) => v === 0);
  const detectedEmotion = isAllZero ? "Neutral" : maxEmotion.charAt(0).toUpperCase() + maxEmotion.slice(1);

  return { emotion: detectedEmotion, tone };
}

export default function EmotionToneChecker() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [meta, setMeta] = useState({ emotion: "", tone: "" });

  function handleCheck() {
    if (!input.trim()) return;
    const result = input.trim();
    const mt = detectEmotionAndTone(result);
    setOutput(result);
    setMeta(mt);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setMeta({ emotion: "", tone: "" });
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">G</div>
                <div>
                  <div className="font-semibold text-lg">GrammarChecker</div>
                  <div className="text-xs text-gray-500">Write efficiently and effectively</div>
                </div>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <button className="px-3 py-1 rounded text-sm border border-green-600 text-green-700">History</button>
              <button className="px-3 py-1 rounded bg-green-600 text-white text-sm">Login</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Emotion & Tone Checker</h1>
        <p className="text-sm text-gray-600 mb-6">Type a sentence below and click Check. The sentence will appear in the checked field with a simple emotion & tone readout.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-6 border rounded-lg shadow-sm bg-white">
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">Enter sentence</label>
            <textarea
              id="inputText"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type something..."
              className="w-full h-40 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
            />

            <div className="mt-4 flex gap-3">
              <button onClick={handleCheck} className="px-4 py-2 rounded bg-green-600 text-white">Check</button>
              <button onClick={handleClear} className="px-4 py-2 rounded border">Clear</button>
            </div>
          </section>

          <section className="p-6 border rounded-lg shadow-sm bg-white">
            <label className="block text-sm font-medium text-gray-700 mb-2">Checked sentence</label>
            <textarea
              readOnly
              value={output}
              className="w-full h-40 p-3 border rounded resize-none bg-gray-50"
              placeholder="Checked sentence will appear here"
            />

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Detected emotion</div>
                  <div className="text-lg font-semibold text-green-700">{meta.emotion || '—'}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Detected tone</div>
                  <div className="text-lg font-semibold text-green-700">{meta.tone || '—'}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Emotion meter</div>
                <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
                  <div
                    style={{ width: meta.emotion && meta.emotion !== 'Neutral' ? '60%' : '10%' }}
                    className="h-full bg-green-600"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-8 text-sm text-gray-500">Design: white background with green accents to match the provided screenshot.</footer>
      </main>
    </div>
  );
}
