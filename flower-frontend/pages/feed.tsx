import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import "../flow/config";
import Layout from '../components/Layout'
import Posts from '../components/Posts'
import CreatePost from '../components/CreatePost'
import { usePosts } from "../hooks/usePosts";
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
  text: string;
}

export default function Feed({message}: {message: string}) {
  const { user, jwt } = useContext(AuthContext);

  const { handleSubmit, register, formState: { errors, isSubmitSuccessful } } = useForm({ defaultValues: { text: "" } });
  const { createPost, posts, loading, error } = usePosts(user.walletAddr, jwt);

  console.log('posts:', posts);
  console.log('loading:', loading);
  console.log('error:', error);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    createPost(data)
  }

  return (
    <>
      <Layout>
        <h1>Community Posts</h1>
        {/* <Posts />
        <CreatePost /> */}
        <div className="flex flex-col w-1/2">
          <h3>Write a post</h3>
          <form className="flex flex-col w-full my-2" onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("text", { required: "Text is required." })} className="input px-4 py-3 rounded-lg border-2 border-slate-200 h-[100px]" />
            {isSubmitSuccessful ? <div>Successfully posted!</div> : (<div className="text-red-600">{errors.text?.message}</div>)}
            <input type="submit" className="bg-slate-500 text-white p-3 rounded-lg my-3" />
          </form>
        </div>
        <h3>Posts</h3>
        {posts.posted.map(post => (
          // console.log(post),
          <div key={post.id} className="border-2 border-slate-500 my-4 p-4 rounded-lg">
            <h3>{post.user}</h3>
            <p>{post.text}</p>
          </div>
        ))}
      </Layout>
    </>
  )
}