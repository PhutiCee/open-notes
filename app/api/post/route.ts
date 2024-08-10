import { NextRequest, NextResponse } from 'next/server';

interface Post {
    id: number;
    title: string;
    content: string;
}
  
let posts: Post[] = [];

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

const id = posts.length
  const newPost = { id, title, content };
  posts.push(newPost);

  return NextResponse.json({ message: "Post created", post: newPost }, { status: 200 });
}

export async function PUT(req: NextRequest) {
    try {
        const { id, title, content } = await req.json();

        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        posts[postIndex] = { id, title, content };

        return NextResponse.json({ message: "Post updated", post: posts[postIndex] }, { status: 200 });
    } catch (error) {
        console.error("Error in PUT request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams} = new URL(req.url)
    const id = Number(searchParams.get('id'))

    const post = posts.find(post => post.id === id)
    if (!post) {
        return NextResponse.json({message: "Post not found"}, {status: 404})
    }
    return NextResponse.json({post}, {status: 200})
}

export async function DELETE(req:NextRequest) {
    const { searchParams} = new URL(req.url)
    const id = Number(searchParams.get('id'))

    posts = posts.filter(post => post.id !== id)

    return NextResponse.json({message: "Post deleted"}, {status: 200})
}