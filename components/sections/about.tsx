import { Award, Users, Building2, Lightbulb } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: <Award className="text-archi-accent" size={32} />,
      title: "Excellence",
      description: "Nous nous engageons à délivrer des projets de la plus haute qualité, en respectant les normes les plus strictes."
    },
    {
      icon: <Users className="text-archi-accent" size={32} />,
      title: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins et transformer leurs visions."
    },
    {
      icon: <Building2 className="text-archi-accent" size={32} />,
      title: "Innovation",
      description: "Nous intégrons les dernières technologies et méthodes de conception pour créer des espaces modernes et durables."
    },
    {
      icon: <Lightbulb className="text-archi-accent" size={32} />,
      title: "Créativité",
      description: "Chaque projet est unique. Nous apportons une approche créative et personnalisée à chaque conception."
    }
  ]

  return (
    <section className="py-24 bg-archi-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark">
              Qui sommes-nous ?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Archistudio est un cabinet d'architecture contemporain spécialisé dans la conception de bâtiments résidentiels et commerciaux. Depuis plus de 15 ans, nous transformons les visions de nos clients en espaces fonctionnels et esthétiques.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Notre équipe d'architectes passionnés combine expertise technique et sens artistique pour créer des projets qui dépassent les attentes. De la conception initiale à la livraison finale, nous accompagnons nos clients à chaque étape.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <div className="text-4xl font-bold text-archi-accent">150+</div>
                <div className="text-gray-600">Projets réalisés</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-archi-accent">15+</div>
                <div className="text-gray-600">Années d'expérience</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
              alt="Notre équipe"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-archi-dark text-white p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold text-archi-accent">98%</div>
              <div className="text-sm">Clients satisfaits</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{value.icon}</div>
              <h3 className="font-semibold text-xl mb-3 text-archi-dark">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
