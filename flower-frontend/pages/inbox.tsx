import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/Inbox.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import AuthContext from '../context/AuthContext'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMessages } from "../hooks/useMessages";
import { MessageList } from '../components/inbox/MessageList'

interface FormData {
  recipient: string;
  text: string;
}

export default function Inbox() {
  const { user, jwt } = useContext(AuthContext);

  const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues: { recipient: "", text: "" } });

  const { sendMessage, messages, loading, error } = useMessages(user.walletAddr, jwt);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    sendMessage(data)
  };

  return (
    <Layout>
      <h1>Inbox</h1>
      {user.loggedIn ?
        <>
          <div>
            <h3>Send a message</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-1/2">
                <label>Recipient</label>
                <input {...register("recipient", { required: "A recipient is required." })} className="px-4 py-3 rounded-lg border-2 border-slate-200" />
              </div>
              <div className="flex flex-col w-1/2">
                <label>Message</label>
                <textarea {...register("text", { required: "A message is required." })} className="input px-4 py-3 rounded-lg border-2 border-slate-200 h-[100px]" />
              </div>
              <div>{errors.recipient?.message}</div>
              <div>{errors.text?.message}</div>
              <input type="submit" className="bg-slate-500 text-white p-3 rounded-lg my-3" />
            </form>
          </div>
          {loading && <p>Loading...</p>}
          {!!error && <p>{error}</p>}
          <div className={styles.inbox}>
            {messages?.sent?.length > 0 ?
              <MessageList messageType='Sent' messages={messages.sent} />
              :
              <p>You have no sent messages</p>
            }
            {messages?.received?.length > 0 ?
              <MessageList messageType='Received' messages={messages.received} />
              :
              <p>You have no received messages</p>
            }
          </div>
        </> :
        <>
          <h2>Please log in</h2>
          <p>go <Link href="/login">log in</Link></p>
        </>
      }

    </Layout>
  )
}