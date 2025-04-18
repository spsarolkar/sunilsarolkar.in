import React from 'react';
import { motion } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const SelfAttentionVisualization = () => {
  const sentence = ['The', 'beautiful', 'flower', 'has', 'vibrant', 'colors'];

  const attentionScores = [
    [1.0, 0.2, 0.2, 0.1, 0.2, 0.1],
    [0.2, 1.0, 0.9, 0.1, 0.3, 0.2],
    [0.2, 0.9, 1.0, 0.2, 0.4, 0.3],
    [0.1, 0.1, 0.2, 1.0, 0.2, 0.2],
    [0.2, 0.3, 0.4, 0.2, 1.0, 0.9],
    [0.1, 0.2, 0.3, 0.2, 0.9, 1.0],
  ];

  const maskedScores = attentionScores.map((row, i) =>
    row.map((score, j) => (j > i ? '-' : score.toFixed(2)))
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Self-Attention Mechanism with Masking (Decoder)
      </motion.h2>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
        <strong>Sentence:</strong> "{sentence.join(' ')}"
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
        <h3>Attention Scores (Dot Product) with Masking</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Query \ Key
              </th>
              {sentence.map((word, idx) => (
                <th key={idx} style={{ border: '1px solid black', padding: '8px' }}>{word}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sentence.map((word, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{word}</td>
                {maskedScores[idx].map((score, jdx) => (
                  <td key={jdx} style={{ border: '1px solid black', padding: '8px' }}>
                    {score === '-' ? score : <InlineMath math={score} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} style={{ marginTop: '20px' }}>
        <BlockMath math="\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
      </motion.div>
    </div>
  );
};

export default SelfAttentionVisualization;