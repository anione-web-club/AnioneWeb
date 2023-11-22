"use client"

import { useEffect } from "react"

export default function () {
    useEffect(() => {
        fetch('anione-gpt/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "role": "user",
                "content": "안녕?"
            })
        }).then(res => res.json())
            .then(data => console.log(data))
    }, [])
    return <></>
}