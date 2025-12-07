import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { PlusCircle, Edit, Trash2, LogIn, LogOut, Star } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api/projects';
const ADMIN_KEY_PLACEHOLDER = 'jungleoufeed02'; // Lembre-se de mudar isso no backend/server.js também!

const AdminPanel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProjectData, setNewProjectData] = useState<Omit<Project, 'id'> & { id?: number }>({
    title: '',
    category: '',
    imageUrl: '',
    featured: false,
  });
  const [adminKey, setAdminKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Erro ao buscar projetos: ${response.statusText}`);
      }
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === ADMIN_KEY_PLACEHOLDER) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Chave de administração inválida.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    setProjects([]);
    setEditingProject(null);
    setNewProjectData({ title: '', category: '', imageUrl: '', featured: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectData(prev => ({ ...prev, featured: e.target.checked }));
  };

  const handleAddOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const method = editingProject ? 'PUT' : 'POST';
    const url = editingProject ? `${API_BASE_URL}/${editingProject.id}` : API_BASE_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`,
        },
        body: JSON.stringify(newProjectData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${editingProject ? 'atualizar' : 'adicionar'} projeto: ${response.statusText}`);
      }

      setNewProjectData({ title: '', category: '', imageUrl: '', featured: false });
      setEditingProject(null);
      fetchProjects(); // Recarrega a lista de projetos
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setNewProjectData(project);
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este projeto?')) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir projeto: ${response.statusText}`);
      }

      fetchProjects(); // Recarrega a lista
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ ...project, featured: !project.featured }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${project.featured ? 'remover destaque de' : 'destacar'} projeto: ${response.statusText}`);
      }

      fetchProjects(); // Recarrega a lista
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-surface p-8 rounded-xl shadow-lg border border-white/10 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Painel de Administração</h2>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label htmlFor="adminKey" className="sr-only">Chave de Administração</label>
              <input
                type="password"
                id="adminKey"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                placeholder="Insira a chave de administração"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Gerenciar Projetos</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* Formulário Adicionar/Editar Projeto */}
        <div className="bg-surface p-8 rounded-xl shadow-lg border border-white/10 mb-10">
          <h2 className="text-2xl font-bold mb-6">{editingProject ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>
          <form onSubmit={handleAddOrUpdateProject} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newProjectData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                placeholder="Título do Projeto"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-2">Categoria</label>
              <input
                type="text"
                id="category"
                name="category"
                value={newProjectData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                placeholder="Categoria (ex: E-commerce, Institucional)"
                required
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-400 mb-2">URL da Imagem</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={newProjectData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                placeholder="URL completa da imagem (ex: /path/to/image.jpg)"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={newProjectData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-white bg-black/30 rounded border-white/10 focus:ring-white/40"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-400">Destacar na Página Inicial</label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? 'Processando...' : editingProject ? <><Edit className="w-4 h-4" /> Atualizar Projeto</> : <><PlusCircle className="w-4 h-4" /> Adicionar Projeto</>}
            </button>
            {editingProject && (
              <button
                type="button"
                onClick={() => { setEditingProject(null); setNewProjectData({ title: '', category: '', imageUrl: '', featured: false }); setError(null); }}
                className="w-full bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors mt-2"
              >
                Cancelar Edição
              </button>
            )}
          </form>
        </div>

        {/* Lista de Projetos */}
        <h2 className="text-2xl font-bold mb-6">Projetos Existentes</h2>
        {isLoading && projects.length === 0 ? (
          <p className="text-gray-400">Carregando projetos...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-400">Nenhum projeto encontrado. Adicione um novo!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-surface p-6 rounded-xl border border-white/5 flex flex-col">
                <img src={project.imageUrl} alt={project.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.category}</p>
                <div className="flex gap-2 mt-auto">
                  <button 
                    onClick={() => handleEditClick(project)} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Edit className="w-4 h-4" /> Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id)} 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Excluir
                  </button>
                  <button 
                    onClick={() => handleToggleFeatured(project)}
                    className={`flex-1 ${project.featured ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-600 hover:bg-gray-700'} text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm`}
                  >
                    <Star className="w-4 h-4" /> {project.featured ? 'Destacado' : 'Destacar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
