import 'outstatic/outstatic.css'
import { Outstatic } from 'outstatic'

export default async function Page({ params }: { params: Promise<{ ost: string[] }> }) {
  const resolvedParams = await params;
  return <Outstatic />
}
