import React, { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import ProjectModal from './ProjectModal';

interface AllProjectsProps {

}

const AllProjects: React.FC<AllProjectsProps> = ({ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [allFetchedProjects, setAllFetchedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleProjectClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl(null);
  };

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Project[] = await response.json();
        setAllFetchedProjects(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProjects();
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header da Página */}
        <div className="mb-12">
          <Link 
            to="/"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Voltar para Início
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">Portfólio Completo</h1>
          <div className="w-24 h-1 bg-white mb-6"></div>
          <p className="text-gray-400 max-w-2xl text-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Explore nossa coleção de trabalhos. Cada projeto é uma combinação única de estratégia, design e tecnologia.
          </p>
        </div>

        {/* Grid de Projetos */}
        {isLoading ? (
          <p className="text-gray-400 text-center">Carregando projetos...</p>
        ) : error ? (
          <p className="text-red-400 text-center">Erro ao carregar projetos: {error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {allFetchedProjects.map((project) => (
              <div 
                key={project.id} 
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer bg-surface border border-white/5"
                onClick={() => handleProjectClick(project.imageUrl)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-sm font-light text-gray-300 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.category}</span>
                  <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action Footer */}
        <div className="mt-20 text-center p-12 bg-white/5 rounded-3xl border border-white/5">
          <h3 className="text-2xl font-bold mb-4">Gostou do que viu?</h3>
          <p className="text-gray-400 mb-8">Vamos criar o próximo case de sucesso juntos.</p>
          <a 
            href="http://wa.me/5551986512816"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
      <ProjectModal 
        isOpen={isModalOpen}
        imageUrl={selectedImageUrl}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default AllProjects;