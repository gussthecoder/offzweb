import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Entre em Contato</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Vamos conversar sobre seu próximo projeto. Estamos aqui para ajudar a transformar suas ideias em realidade digital.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-surface rounded-xl border border-white/5">
            <div className="p-4 bg-white/5 rounded-full mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-400">gustavo.n.de.miranda@gmail.com</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-surface rounded-xl border border-white/5">
            <div className="p-4 bg-white/5 rounded-full mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-400">+55 (51) 98651-2816</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-surface rounded-xl border border-white/5">
            <div className="p-4 bg-white/5 rounded-full mb-4">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instagram</h3>
            <p className="text-gray-400">@1gussmiranda</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
