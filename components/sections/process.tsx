import { CheckCircle2, MessageSquare, Search, DraftingCompass, Box, Eye, FileText, Building, Clock } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      icon: <MessageSquare className="text-archi-accent" size={32} />,
      title: "Premier contact",
      description: "Discussion initiale pour comprendre votre vision et vos besoins."
    },
    {
      icon: <Search className="text-archi-accent" size={32} />,
      title: "Consultation",
      description: "Analyse approfondie du terrain, des contraintes et des opportunités."
    },
    {
      icon: <CheckCircle2 className="text-archi-accent" size={32} />,
      title: "Analyse du besoin",
      description: "Définition précise des objectifs, du budget et du planning."
    },
    {
      icon: <DraftingCompass className="text-archi-accent" size={32} />,
      title: "Conception",
      description: "Création des esquisses et plans conceptuels du projet."
    },
    {
      icon: <Box className="text-archi-accent" size={32} />,
      title: "Modélisation 3D",
      description: "Réalisation de modèles 3D pour visualiser le projet en volume."
    },
    {
      icon: <Eye className="text-archi-accent" size={32} />,
      title: "Validation",
      description: "Présentation et ajustements selon vos retours."
    },
    {
      icon: <FileText className="text-archi-accent" size={32} />,
      title: "Plans techniques",
      description: "Élaboration des plans détaillés pour la construction."
    },
    {
      icon: <Building className="text-archi-accent" size={32} />,
      title: "Suivi du projet",
      description: "Accompagnement tout au long de la réalisation."
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
            Notre processus
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Une méthodologie éprouvée pour garantir le succès de votre projet architectural.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-archi-beige" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={index} className={`relative flex items-start space-x-6 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse lg:space-x-reverse'}`}>
                  {/* Step Number */}
                  <div className={`hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-archi-dark text-white rounded-full items-center justify-center font-bold text-lg z-10 ${isEven ? '-left-6' : '-right-6'}`}>
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`flex items-center space-x-4 mb-4 ${isEven ? 'lg:flex-row-reverse lg:space-x-reverse' : ''}`}>
                      <div className="bg-archi-cream p-4 rounded-lg">
                        {step.icon}
                      </div>
                      <h3 className="font-semibold text-xl text-archi-dark">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden mt-12 space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-archi-dark text-white rounded-full items-center justify-center font-bold text-lg flex">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="bg-archi-cream p-3 rounded-lg">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-archi-dark">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 ml-14">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
