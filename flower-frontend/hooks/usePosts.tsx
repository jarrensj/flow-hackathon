import React, { useEffect, useState } from "react"
import axios from 'axios';

interface Post {
  id: number;
  user: string;
  text: string;
}

interface PostsState {
  posted: Post[];
}

export const usePosts = (walletAddr: string, jwt: string) => {
  const [posts, setPosts] = useState<PostsState>({ posted: [] });
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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const posted = await axios(generateConfig({
          token: jwt,
          body: {},
          url: 'http://localhost:8000/api/posts',
          method: "get",
        }));
        console.log("posted: ", posted.data);
        setLoading(false);
        setPosts({ posted: posted.data})
        console.log(posts)
      }
      catch (err: any) {
        setError(err);
        console.log("Error: ", err)
        setLoading(false);
      }
    }
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, walletAddr])

  const createPost = async ({ text }: { text: string }) => {
    setLoading(true);
    try {
      const res = await axios(generateConfig({
        token: jwt,
        body: { text },
        url: "http://localhost:8000/api/posts",
        method: "post",
      }))
      setLoading(false);
      console.log(res);
    }
    catch (err: any) {
      setError(err);
      console.log("Error: ", err)
      setLoading(false);
    }

  }


  return { posts, createPost, loading, error };
}