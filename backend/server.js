const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

const projectsFilePath = path.join(__dirname, 'projects.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Funções auxiliares para ler/escrever projetos
const readProjects = () => {
    if (fs.existsSync(projectsFilePath)) {
        const data = fs.readFileSync(projectsFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

const writeProjects = (projects) => {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
};

// Chave de autenticação simples (para demonstração)
const ADMIN_KEY = 'jungleoufeed02';

// Middleware de autenticação
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader === `Bearer ${ADMIN_KEY}`) {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado. Chave de autenticação inválida.' });
    }
};

// Rotas públicas (ler projetos)
app.get('/api/projects', (req, res) => {
    let projects = readProjects();
    if (req.query.featured === 'true') {
        projects = projects.filter(p => p.featured === true);
    }
    res.json(projects);
});

// Rotas protegidas (adicionar, atualizar, excluir)
app.post('/api/projects', authenticate, (req, res) => {
    const projects = readProjects();
    const newProject = { id: Date.now(), featured: false, ...req.body }; // Adiciona featured: false por padrão
    projects.push(newProject);
    writeProjects(projects);
    res.status(201).json(newProject);
});

app.put('/api/projects/:id', authenticate, (req, res) => {
    const projects = readProjects();
    const { id } = req.params;
    const updatedProject = req.body;
    const index = projects.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        // Permite atualizar todas as propriedades, incluindo 'featured'
        projects[index] = { ...projects[index], ...updatedProject, id: parseInt(id) };
        writeProjects(projects);
        res.json(projects[index]);
    } else {
        res.status(404).json({ message: 'Projeto não encontrado.' });
    }
});

app.delete('/api/projects/:id', authenticate, (req, res) => {
    let projects = readProjects();
    const { id } = req.params;
    const initialLength = projects.length;
    projects = projects.filter(p => p.id !== parseInt(id));
    if (projects.length < initialLength) {
        writeProjects(projects);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Projeto não encontrado.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
