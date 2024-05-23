'use client';

import { useState } from 'react';
import { getAnswer } from './actions';

//with streaming
import { readStreamableValue } from 'ai/rsc';
import { generate } from './actions';

export default function Home() {
  const [generation, setGeneration] = useState<string>('');

  return (
    <div>

      <button
        onClick={async () => {
          const { output } = await generate('Why is the sky blue?');

          for await (const delta of readStreamableValue(output)) {
            setGeneration(currentGeneration => `${currentGeneration}${delta}`);
          }
        }}
      >
        Ask
      </button>

      {/* without streaming */}

      {/* <button
        onClick={async () => {
          const { text } = await getAnswer('Why is the sky blue?');
          setGeneration(text);
        }}
      >
        Answer
      </button> */}



      <div>{generation}</div>
    </div>
  );
}