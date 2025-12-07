import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import ProjectModal from './ProjectModal';

interface PortfolioProps {

}

const Portfolio: React.FC<PortfolioProps> = ({ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [fetchedProjects, setFetchedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects?featured=true');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Project[] = await response.json();
        setFetchedProjects(data.slice(0, 4)); 
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl(null);
  };

  return (
    <section id="projects" className="py-32 border-t border-white/5 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Projetos Recentes</h2>
            <div className="w-20 h-1 bg-white"></div>
          </div>
          <Link 
            to="/projects"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 pb-2 group"
          >
            Ver todos os projetos 
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <p className="text-gray-400 text-center">Carregando projetos...</p>
        ) : error ? (
          <p className="text-red-400 text-center">Erro ao carregar projetos: {error}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {fetchedProjects.map((project) => (
              <div 
                key={project.id} 
                className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
                onClick={() => handleProjectClick(project.imageUrl)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-sm font-light text-gray-300 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.category}</span>
                  <h3 className="text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ProjectModal 
        isOpen={isModalOpen}
        imageUrl={selectedImageUrl}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Portfolio;