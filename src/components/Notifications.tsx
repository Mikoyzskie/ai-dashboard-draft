import React from 'react'

interface INotification {
    name: string,
    message: string,
    minutesAgo: number
}

export default function Notifications({ notifications }: { notifications: string }) {

    const { notifications: notif } = JSON.parse(notifications)
    console.log(notif);

    return (
        <div className='flex flex-col gap-2'>
            {
                notif && notif.map((notif: INotification, index: number) => {
                    return (
                        <div key={index} className="p-3 bg-zinc-100 rounded-lg flex flex-row gap-4 justify-between">
                            <div className="">
                                <div className="font-medium text-black">{notif.name}</div>
                                <div className="leading-6 text-zinc-700">
                                    {notif.message}
                                </div>
                            </div>
                            <div className="text-sm text-zinc-500 flex-shrink-0 w-24 text-right">
                                {notif.minutesAgo}m ago
                            </div>
                        </div>
                    )
                })
            }
        </div>


    )
}
