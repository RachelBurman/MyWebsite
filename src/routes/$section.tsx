import { createFileRoute, redirect } from '@tanstack/react-router'
import { ContentPage } from '../components/content-page'

const VALID = new Set(['writing', 'work', 'photography', 'now', 'about', 'reading', 'uses'])

export const Route = createFileRoute('/$section')({
  beforeLoad: ({ params }) => {
    if (!VALID.has(params.section)) throw redirect({ to: '/' })
  },
  component: SectionPage,
})

function SectionPage() {
  const { section } = Route.useParams()
  return <ContentPage id={section} />
}
