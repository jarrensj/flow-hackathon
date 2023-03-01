import React, { useEffect, useState } from "react"
import axios from 'axios';

export const useMessages = (walletAddr: string, jwt: string) => {
  const [messages, setMessages] = useState({ sent: [], received: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  type generateConfigArgType = {
    token: string,
    body: { [key: string]: any },
    url: string,
    method: "post" | "get"
  }

  const generateConfig = ({ token, body, url, method }: generateConfigArgType) => {
    return {
      method,
      maxBodyLength: Infinity,
      url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: body,
    }
  }

  const fetchMessages = async () => {
    setLoading(true);
    setError("")
    try {
      const received = await axios(generateConfig({
        token: jwt,
        body: {},
        url: 'http://localhost:8000/api/messages',
        method: "get",
      }));
      const sent = await axios(generateConfig({
        token: jwt,
        body: {},
        url: "http://localhost:8000/api/messages/sent",
        method: "get",
      }))
      setLoading(false);
      setMessages({ sent: sent.data, received: received.data })
    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(`Status: ${err.response?.status} ${err.message}`)
      } else {
        setError("Error fetching messages");
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, walletAddr])

  const sendMessage = async ({ recipient, text }: { recipient: string, text: string }) => {
    setLoading(true);
    setError("")
    try {
      const res = await axios(generateConfig({
        token: jwt,
        body: { recipient, text },
        url: "http://localhost:8000/api/messages",
        method: "post",
      }))
      setLoading(false);
      setMessages({ sent: [], received: [] })
      fetchMessages();
    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(`Status ${err.response?.status}: ${err.message}`)
      } else {
        setError("Error fetching messages");
        setLoading(false);
      }
    }

  }

  return { messages, sendMessage, loading, error };
}