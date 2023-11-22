"use client"

import { buildMessage } from "@/util/message"
import { useEffect, useState } from "react"

export default function () {
    const initalMessage = buildMessage('user', '넌 누구야?')
    const [message, setMessage] = useState({})

    useEffect(() => {
        const messages = [initalMessage]
        const body = JSON.stringify(messages)

        fetch('anione-gpt/api', {
            method: 'POST',
            body,
        }).then(res => res.json())
            .then(data => {
                setMessage(data)
            })
    }, [])
    return (
        <>
            <span>질문: {initalMessage.content}</span>
            <br />
            <span>응답: {message.content}</span>
        </>
    )
}