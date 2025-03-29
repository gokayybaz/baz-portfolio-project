import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Generate a unique ID
      const uniqueId = crypto.randomUUID();

      // Submit form data to Supabase
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            id: uniqueId,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            created_at: new Date()
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.'
      });

      // Clear the form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-teal-400 inline-block text-transparent bg-clip-text">
          İletişime Geçin
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Proje fikirleri, işbirliği önerileri veya sadece merhaba demek için aşağıdaki formu doldurarak benimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-xl border border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
              İsim
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full py-3 px-4 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Adınız Soyadınız"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full py-3 px-4 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="ornek@domain.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
              Mesaj
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full py-3 px-4 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Mesajınızı buraya yazın..."
            ></textarea>
          </div>

          {submitStatus && (
            <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-900/60 text-green-200' : 'bg-red-900/60 text-red-200'}`}>
              {submitStatus.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-all
                ${isSubmitting
                  ? 'bg-indigo-700 cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20'}`}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactSection;
