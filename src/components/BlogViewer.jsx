// This is a React component defined right here in the page
import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

export default function BlogViewer({ posts, postContents }) {
    const [currentSlug, setCurrentSlug] = useState(posts[0].id);
    const currentPost = posts.find(post => post.id === currentSlug);
    
    const [renderedContent, setRenderedContent] = useState('');
    console.log("Generated HTML:", renderedContent);


    useEffect(() => {
        if (currentPost) {
            const renderMarkdown = async () => {
                const result = await unified()
                    .use(remarkParse) // Parse markdown
                    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
                    .use(rehypeRaw) // Pass raw HTML
                    .use(rehypeStringify) // Convert to HTML string
                    .process(postContents[currentPost.id]);

                setRenderedContent(String(result));
            };

            renderMarkdown();
        }
    }, [currentPost, postContents]);


    return (
        <>
            <aside className="lg:col-span-1 overflow-y-auto ">
                <ul className="space-y-1 pr-4">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <button
                                className={`block w-full font-merri text-left my-1 p-4 rounded-lg hover:bg-amber-100 transition-colors ${currentSlug === post.id
                                    ? "bg-amber-100"
                                    : "bg-amber-50"
                                    }`}
                                onClick={() => setCurrentSlug(post.id)}
                            >
                                <time className="text-sm text-gray-500">
                                    {new Date(post.pubDate).toLocaleDateString('de-DE', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                                <h3 className="font-bold">{post.title}</h3>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="lg:col-span-2 overflow-y-auto">
                {currentPost && (
                    <article className="prose prose-stone font-merri max-w-none p-6">
                        <time className="text-sm text-gray-500">
                            {new Date(currentPost.pubDate).toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <h1 className="
                        prose-stone
                        font-merri
                        font-semibold
                        text-2xl
                        mb-6">
                            {currentPost.title}</h1>
                        
                        <div
                            className="
                            mx-auto my-10 markdown-content
                            prose prose-stone text-lg
                            font-merri font-normal
                            leading-loose tracking-normal
                            dark:prose-invert
                            prose-p:text-pretty
                            prose-img:rounded-xl
                            markdown-content 
                            "
                            dangerouslySetInnerHTML={{ __html: renderedContent }}
                        />
                    </article>
                )}
            </main>

        </>
    );
}