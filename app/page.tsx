"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [toggleCreate, setToggleCreate] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/post?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && editingPostId !== null) {
        const res = await fetch("/api/post", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPostId, title, content }),
        });
        if (res.ok) {
          setPosts(posts.map((post) =>
            post.id === editingPostId ? { id: editingPostId, title, content } : post
          ));
        }
      } else {
        const res = await fetch("/api/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        if (res.ok) {
          const newId = Date.now();
          setPosts([...posts, { id: newId, title, content }]);
        }
      }

      setTitle("");
      setContent("");
      setToggleCreate(false);
      setIsEditing(false);
      setEditingPostId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setIsEditing(true);
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setToggleCreate(true);
  };

  return (
    <main className="flex flex-col items-center p-5">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold mb-5">OpenNotes</h1>
      </div>
      <button
        onClick={() => setToggleCreate(!toggleCreate)}
        className={`${toggleCreate ? "hidden" : "block"} px-5 p-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition-all`}
      >
        Create
      </button>
      {(toggleCreate || isEditing) && (
        <div className="max-w-5xl w-full">
          <form
            className="w-full md:w-[500px] mx-auto pt-5 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Input your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
            <textarea
              rows={6}
              placeholder="Input your content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
            <button
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
            >
              {loading ? "Loading..." : isEditing ? "Update" : "Submit"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setToggleCreate(false);
                setEditingPostId(null);
                setTitle("");
                setContent("");
              }}
              className="bg-red-400 text-white p-2 rounded-md hover:bg-red-500 transition-all"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
        {posts
          .map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h1>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex justify-end gap-4 text-sm">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
          .sort()
          .reverse()}
      </div>

    </main>
  );
}
