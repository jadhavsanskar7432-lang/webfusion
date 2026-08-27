import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { examplePrompts } from '@/lib/intentExtraction'
import { cn } from '@/lib/cn'

export function SearchHero({ onSearch, className }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  function handleExampleClick(text) {
    setQuery(text)
    onSearch(text)
  }

  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-moss/10 text-moss text-xs font-medium mb-6">
          <Sparkles size={12} />
          AI-Powered Resource Matching
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1] mb-4">
          Borrow what you need,
          <br />
          <span className="text-moss">from your campus.</span>
        </h1>
        <p className="text-base sm:text-lg text-ink/60 max-w-xl mx-auto">
          Tell us what you&apos;re trying to do, and we&apos;ll find the perfect kit from students around you.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, delay: 0.05 }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mb-6"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" />
            <input
              id="ai-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you trying to do?"
              className="w-full h-12 pl-10 pr-4 rounded-[4px] border border-ink/10 bg-card text-sm font-body text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss transition-colors duration-150"
              autoFocus
            />
          </div>
          <Button type="submit" variant="primary" size="lg" disabled={!query.trim()}>
            Find Kit
          </Button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <span className="text-xs text-ink/40 mr-1">Try:</span>
        {examplePrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(prompt.text)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-ink/10 bg-card text-xs text-ink/60 hover:border-moss/30 hover:text-moss transition-colors duration-150 cursor-pointer"
          >
            <span>{prompt.icon}</span>
            <span className="max-w-[200px] truncate">{prompt.text}</span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}

SearchHero.displayName = 'SearchHero'
