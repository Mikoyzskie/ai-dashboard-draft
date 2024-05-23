'use client';

import { useState } from 'react';
import { getNotifications } from './actions';
import Notifications from '@/components/Notifications';

interface INotification {
    name: string,
    message: string,
    minutesAgo: number
}


export default function Home() {
    const [generation, setGeneration] = useState<string>('')
    return (
        <div>
            <button
                onClick={async () => {
                    const { notifications } = await getNotifications(
                        'Messages during finals week.',
                    );

                    setGeneration(JSON.stringify(notifications, null, 2));
                }}
            >
                View Notifications
            </button>

            {
                generation && <Notifications notifications={generation} />

            }
            {/* <pre>
                {generation}
            </pre> */}
        </div>
    );
}