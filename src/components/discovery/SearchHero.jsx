import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const examplePrompts = [
  { emoji: '🎬', text: 'I need to shoot a reel tomorrow' },
  { emoji: '📊', text: 'Preparing for a seminar presentation' },
  { emoji: '🏏', text: 'Cricket match this weekend, need gear' },
  { emoji: '🔧', text: 'Working on an Arduino project for lab' },
]

export function SearchHero({ onSearch }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  function handlePromptClick(prompt) {
    setQuery(prompt)
    onSearch(prompt)
  }

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="font-display text-5xl md:text-7xl text-text-primary tracking-tight leading-[1.05] md:leading-[1.05]">
          Borrow what you need,
          <br />
          <span className="text-accent font-medium">from your campus.</span>
        </h1>
        <p className="text-text-secondary font-body text-lg max-w-xl mx-auto mt-4">
          Tell us what you're trying to do. We'll find the right kit from students around you.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center bg-surface/90 backdrop-blur-sm border border-border-subtle rounded-full max-w-2xl mx-auto mt-10 p-2 pl-6 shadow-lg shadow-black/25 focus-within:ring-2 focus-within:ring-accent/40 transition-shadow duration-150"
      >
        <Search size={20} className="text-text-secondary/60 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you trying to do?"
          className="flex-1 bg-transparent border-none outline-none font-body text-base text-text-primary placeholder:text-text-secondary px-4 min-w-0"
        />
        <button
          type="submit"
          className="shrink-0 bg-accent text-accent-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-accent/90 transition-colors duration-150 flex items-center gap-1.5 cursor-pointer"
        >
          Find Kit
          <ArrowRight size={14} />
        </button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-6 flex overflow-x-auto sm:flex-wrap items-center sm:justify-center gap-2 max-w-2xl mx-auto pb-2 sm:pb-0 scrollbar-hide"
      >
        <span className="text-text-secondary text-sm mr-3 shrink-0 hidden sm:inline-block">Try:</span>
        {examplePrompts.map((prompt) => (
          <button
            key={prompt.text}
            onClick={() => handlePromptClick(prompt.text)}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-subtle bg-surface text-sm font-body text-text-secondary hover:border-accent/60 hover:text-text-primary transition-colors duration-150 cursor-pointer"
          >
            <span>{prompt.emoji}</span>
            <span>{prompt.text}</span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}

SearchHero.displayName = 'SearchHero'
