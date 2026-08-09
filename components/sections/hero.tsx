import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <img
          src="/images/hero.png"
          alt="Modern Architecture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
            Nous imaginons les espaces de demain
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Architecture, conception et visualisation 3D pour donner vie à vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/projects">
              <Button size="lg" variant="architect" className="text-lg px-8">
                Découvrir nos projets
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/appointment">
              <Button size="lg" variant="architectOutline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  )
}
