'use client';

import { useState } from 'react';
import { getNotifications } from './actions';
import Notifications from '@/components/Notifications';

//with streaming
import { generate } from './actions'
import { readStreamableValue } from 'ai/rsc';

export default function Home() {

    const [generation, setGeneration] = useState<string>('')
    const [isReading, setIsReading] = useState(false)

    const [generationStream, setGenerationStream] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className='max-w-[1110px] mx-auto p-5 flex flex-col gap-10'>
            <div className='flex flex-col gap-4'>
                <button
                    className='p-2 bg-zinc-800 text-zinc-50 w-fit rounded-md hover:bg-zinc-900 cursor-pointer'
                    onClick={async () => {

                        setIsReading(true)

                        const { notifications } = await getNotifications(
                            'Messages during finals week.',
                        );
                        setIsReading(false)
                        setGeneration(JSON.stringify(notifications, null, 2));
                    }}
                >
                    View Notifications
                </button>

                {
                    generation && <Notifications notifications={generation} />
                }
                {
                    isReading && <p className='animate-pulse'>Loading...</p>
                }
            </div>
            {/* With streaming */}

            <div className='flex flex-col gap-4'>
                <button
                    className='p-2 bg-zinc-800 text-zinc-50 w-fit rounded-md hover:bg-zinc-900 cursor-pointer'
                    onClick={async () => {
                        setIsLoading(true)
                        const { object } = await generate('Messages during finals week.');

                        for await (const partialObject of readStreamableValue(object)) {
                            if (partialObject) {
                                setIsLoading(false)
                                setGenerationStream(
                                    JSON.stringify(partialObject.notifications, null, 2),
                                );

                            }
                        }

                    }}
                >
                    View Notifications with streaming
                </button>
                <pre>{generationStream}</pre>
                {
                    generationStream && <Notifications notifications={generationStream} />
                }
                {
                    isLoading && <p className='animate-pulse'>Loading...</p>
                }
            </div>
        </div>
    );
}