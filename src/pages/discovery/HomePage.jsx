import { useState, useMemo } from 'react'
import { SearchHero } from '@/components/discovery/SearchHero'
import { IntentDisplay } from '@/components/discovery/IntentDisplay'
import { RecommendedKit } from '@/components/discovery/RecommendedKit'
import { extractIntent } from '@/lib/intentExtraction'
import { resources } from '@/data/resources'

export default function HomePage() {
  const [intent, setIntent] = useState(null)

  const matchedResources = useMemo(() => {
    if (!intent || intent.needs.length === 0) {
      if (intent && intent.query) {
        return resources.filter((r) =>
          r.name.toLowerCase().includes(intent.query) ||
          r.category.toLowerCase().includes(intent.query) ||
          r.description.toLowerCase().includes(intent.query)
        )
      }
      return []
    }
    return resources.filter((r) => intent.needs.includes(r.category))
  }, [intent])

  function handleSearch(query) {
    const result = extractIntent(query)
    setIntent(result)
  }

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <section className="py-16 sm:py-24 px-4">
        <SearchHero onSearch={handleSearch} />
      </section>

      {intent && (
        <section className="container pb-16 space-y-8">
          <IntentDisplay intent={intent} />
          <RecommendedKit resources={matchedResources} intent={intent} />
        </section>
      )}
    </div>
  )
}
