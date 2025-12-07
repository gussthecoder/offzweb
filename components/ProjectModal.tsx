import React from 'react';
import { X } from 'lucide-react';

interface ProjectModalProps {
  imageUrl: string | null;
  onClose: () => void;
  isOpen: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ imageUrl, onClose, isOpen }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[99] flex items-center justify-center p-4"
      onClick={onClose} // Fecha o modal ao clicar fora da imagem
    >
      <div 
        className="relative bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche o modal
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        <img 
          src={imageUrl} 
          alt="Project Demo" 
          className="w-full object-contain object-top"
        />
      </div>
    </div>
  );
};

export default ProjectModal;
