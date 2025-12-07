import React from 'react';
import { Layout, ShoppingBag, Globe, Zap, BarChart, Smartphone } from 'lucide-react';
import { Service } from '../types';

const Services: React.FC = () => {
  const services: Service[] = [
    {
      title: "Landing Pages",
      description: "Páginas focadas em conversão. Design persuasivo, copywriting estratégico e velocidade de carregamento instantânea para maximizar seu ROI.",
      icon: <Layout className="w-8 h-8" />
    },
    {
      title: "Sites Institucionais",
      description: "A vitrine digital da sua marca. Transmita autoridade e profissionalismo com um site institucional robusto, elegante e fácil de gerenciar.",
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "E-commerce",
      description: "Lojas virtuais completas. Integrações de pagamento, gestão de estoque e uma experiência de compra fluida para seus clientes.",
      icon: <ShoppingBag className="w-8 h-8" />
    }
  ];

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: "Performance Extrema" },
    { icon: <Smartphone className="w-5 h-5" />, text: "100% Responsivo" },
    { icon: <BarChart className="w-5 h-5" />, text: "SEO Otimizado" },
  ];

  return (
    <section id="services" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Nossas Especialidades</h2>
          <div className="w-20 h-1 bg-white mb-6"></div>
          <p className="text-gray-400 max-w-xl text-lg">
            Combinamos estética e funcionalidade para entregar produtos digitais que superam expectativas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 border border-white/10 rounded-2xl bg-surface hover:border-white/30 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {service.icon}
              </div>
              
              <div className="mb-8 p-4 bg-white/5 rounded-xl w-fit group-hover:bg-white group-hover:text-black transition-colors duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8">{service.description}</p>
              
              <ul className="space-y-3 pt-6 border-t border-white/5">
                {features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-white/40">{feature.icon}</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;