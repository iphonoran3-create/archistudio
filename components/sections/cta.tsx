import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="py-24 bg-archi-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Vous avez un projet architectural ?
          </h2>
          <p className="text-xl text-gray-300">
            Parlons de votre projet et transformons votre idée en réalité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/appointment">
              <Button size="lg" variant="architect" className="bg-white text-archi-dark hover:bg-gray-100 text-lg px-8">
                Prendre rendez-vous
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="architectOutline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
