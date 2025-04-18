import React from 'react';
import { motion } from 'framer-motion';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const TransformerEquation = () => {
  const equation = `\\text{Attention}(Q,K,V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V`;

  const matrices = [
    { name: 'Q', shape: '[batch, d_k]' },
    { name: 'K', shape: '[batch, d_k]' },
    { name: 'V', shape: '[batch, d_v]' },
    { name: 'Attention', shape: '[batch, d_k]' },
    { name: 'Output', shape: '[batch, d_k]' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2>Transformer Self-Attention Equation</h2>
        <BlockMath math={equation} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
        <h3>Matrix Shapes for <b className='bold'>each head</b></h3>
        <ul>
          {matrices.map((matrix, index) => (
            <li key={index}>
              <strong><InlineMath math={matrix.name} />:</strong> {matrix.shape[0] === '[' ? <InlineMath math={matrix.shape} /> : matrix.shape}
            </li>
          ))}
        </ul>
        <div>
            <hr />
            Where,
          <p> <InlineMath math='d_k' /> = dimention of key and query</p>
          <p><InlineMath math='d_v' /> = value vector dimention</p>
          <p>Typically, <InlineMath math="d_k=d_v=d_{model}/heads" />,    where <InlineMath math="d_{model}" /> is lenght of embedding.</p>
          <hr />
          <p className='pt-4'>We have sepererate weight matrices <InlineMath math="W_q" /><InlineMath math='(d_{model},d_k)' />,<InlineMath math="W_k" /><InlineMath math='(d_{model},d_k)' /><InlineMath math="W_v" /><InlineMath math='(d_{model},d_k)' /> for <InlineMath math="Queue" />, <InlineMath math="Key" /> and <InlineMath math="Value" /> which transforms <InlineMath math='Q_{initial}' />, <InlineMath math='K_{initial}' /> and <InlineMath math='V_{initial}' /> from shape <InlineMath math='(batch,d_{model})' /> to shape <InlineMath math='(batch,d_k)' /></p>
            <p className='pt-4'> <InlineMath math='For each head=' /><InlineMath math='{Concatenate}({Attention}(Q_{initial}W_q,K_{initial}W_k,V_{initial}W_v) . . . )W_o' /> </p>
            <p className='pt-4'> The scaled dot-product attention mechanism is used to compute the attention scores between the query and key matrices. The attention scores are then used to compute a weighted sum of the value matrix. </p>
          <p className='pt-4'> The softmax function is applied to the scaled dot-product of the query and key matrices. The resulting attention scores are then used to compute a weighted sum of the value matrix. </p>
            <p className='pt-4'>
            The self-attention mechanism in the Transformer model is used to compute the attention scores between all pairs of words in a sentence. The attention scores are then used to compute a weighted sum of the values <InlineMath math="V" />.
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TransformerEquation;