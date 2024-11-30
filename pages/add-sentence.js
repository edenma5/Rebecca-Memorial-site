// pages/add-sentence.js

'use client';

import dynamic from 'next/dynamic';

const AddSentence = dynamic(() => import('../components/sentences/AddSentence'), { ssr: false });

const AddSentencePage = () => {
  return (
    <div>
      <AddSentence />
    </div>
  );
};

export default AddSentencePage;