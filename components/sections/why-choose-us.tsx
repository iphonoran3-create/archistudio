import { Award, Clock, Users, Zap, Shield, Heart } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Award className="text-archi-accent" size={40} />,
      title: "Expertise reconnue",
      description: "Plus de 15 ans d'expérience dans l'architecture et la conception de bâtiments."
    },
    {
      icon: <Zap className="text-archi-accent" size={40} />,
      title: "Créativité innovante",
      description: "Des designs uniques et modernes qui se démarquent par leur originalité."
    },
    {
      icon: <Shield className="text-archi-accent" size={40} />,
      title: "Qualité garantie",
      description: "Des standards de qualité élevés pour chaque projet, sans compromis."
    },
    {
      icon: <Clock className="text-archi-accent" size={40} />,
      title: "Respect des délais",
      description: "Une gestion rigoureuse du planning pour livrer dans les temps."
    },
    {
      icon: <Users className="text-archi-accent" size={40} />,
      title: "Accompagnement personnalisé",
      description: "Un suivi dédié et une communication transparente tout au long du projet."
    },
    {
      icon: <Heart className="text-archi-accent" size={40} />,
      title: "Passion architecturale",
      description: "Une équipe passionnée qui met son cœur dans chaque réalisation."
    }
  ]

  return (
    <section className="py-24 bg-archi-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Les valeurs qui nous distinguent et font de nous votre partenaire de confiance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-colors">
              <div className="mb-6">{reason.icon}</div>
              <h3 className="font-semibold text-xl mb-3">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
