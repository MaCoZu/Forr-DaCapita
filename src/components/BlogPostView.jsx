// src/components/BlogPostView.jsx
import React from 'react';

export default function BlogPostView({ posts, currentSlug, fallbackPost }) {
  // Find the current post based on slug
  const currentPost = posts.find(post => post.id === currentSlug) || fallbackPost;

  if (!currentPost) {
    return <div className="p-6">No post selected</div>;
  }

  return (
    <Article>
    <article className="prose max-w-none p-6">
      <header>
        <h1>{currentPost.data.title}</h1>
          <time className="text-gray-500">
            {new Date(currentPost.data.pubDate).toLocaleDateString()}
          </time>
        <div className="flex items-center gap-4 mb-6">
          {currentPost.data.tags && (
            <div className="flex gap-2">
              {currentPost.data.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: currentPost.compiledContent }} />
        
      </article>
    </Article>

  );
}