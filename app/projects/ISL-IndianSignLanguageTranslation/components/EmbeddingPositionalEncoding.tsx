import React from 'react';
import { motion } from 'framer-motion';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const EmbeddingPositionalEncoding = () => {
  const sentences = [
    ['I', 'love', 'learning', 'Transformers'],
    ['Transformers', 'make', 'learning', 'easy'],
  ];

  const embeddings: Record<string, string> = {
    'I': '[0.2, 0.3, 0.5, ...]',
    'love': '[0.4, 0.7, 0.2, ...]',
    'learning': '[0.6, 0.1, 0.8, ...]',
    'Transformers': '[0.3, 0.7, 0.2, ...]',
    'make': '[0.5, 0.6, 0.3, ...]',
    'easy': '[0.1, 0.4, 0.9, ...]',
  };

  const positionalEncodings = [
    ['[0.0, 0.1, 0.2, ...]', '[0.0, 0.2, 0.4, ...]', '[0.0, 0.3, 0.6, ...]', '[0.0, 0.4, 0.8, ...]'],
    ['[0.0, 0.1, 0.2, ...]', '[0.0, 0.2, 0.4, ...]', '[0.0, 0.3, 0.6, ...]', '[0.0, 0.4, 0.8, ...]'],
  ];

  const highlightWords = ['Transformers', 'learning'];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2>Embedding and Positional Encoding Comparison</h2>
      </motion.div>

      {sentences.map((sentence, sentenceIdx) => (
        <div key={sentenceIdx} style={{ marginTop: '30px' }}>
          <h3>Sentence {sentenceIdx + 1}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {sentence.map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.5 }}
                style={{ textAlign: 'center', backgroundColor: highlightWords.includes(word) ? '#FFFBCC' : 'transparent', padding: '10px', borderRadius: '8px' }}
              >
                <strong>{word}</strong>
                <div style={{ marginTop: '10px' }}>
                  <div><strong>Embedding:</strong></div>
                  <InlineMath math={embeddings[word]} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <div><strong>Position ({index}):</strong></div>
                  <InlineMath math={positionalEncodings[sentenceIdx][index]} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmbeddingPositionalEncoding;