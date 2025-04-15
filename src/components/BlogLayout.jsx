// src/components/BlogLayout.jsx
import { useState, useEffect } from 'react';
import BlogPostView from './BlogPostView';
import Article from './Article.astro';

export default function BlogLayout({ posts, initialSlug, fallbackPost }) {
    const [currentSlug, setCurrentSlug] = useState(initialSlug || (fallbackPost?.id));

    // Handle post selection
    const handlePostClick = (slug) => {
        setCurrentSlug(slug);
        // Optional: Update URL to reflect selected post
        window.history.pushState({}, '', `/news/${slug}`);
    };

    // Listen for browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const slug = window.location.pathname.split('/').pop();
            if (posts.some(post => post.id === slug)) {
                setCurrentSlug(slug);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [posts]);

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-full">
            <aside className="lg:col-span-1 overflow-y-auto">
                <ul className="space-y-1 pr-4">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <button
                                className={`block w-full text-left pointer-events-auto p-4 rounded-lg hover:bg-lime-100 transition-colors ${currentSlug === post.id
                                        ? "bg-amber-100"
                                        : "bg-amber-50"
                                    }`}
                                style={{ viewTransitionName: `post-${post.id}` }}
                                onClick={() => handlePostClick(post.id)}
                            >
                                <time className="text-sm text-gray-500">
                                    {new Date(post.data.pubDate).toLocaleDateString()}
                                </time>
                                <h3 className="font-bold">{post.data.title}</h3>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="lg:col-span-2 overflow-y-auto">
                    <BlogPostView
                        posts={posts}
                        currentSlug={currentSlug}
                        fallbackPost={fallbackPost}
                    />
            </main>
        </div>
    );
}