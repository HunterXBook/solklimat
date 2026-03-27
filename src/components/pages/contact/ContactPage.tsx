import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Loader2, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(1);
    if (digits.length === 0) return '+7';
    let result = '+7';
    if (digits.length > 0) result += ' (' + digits.slice(0, 3);
    if (digits.length >= 3) result += ') ' + digits.slice(3, 6);
    if (digits.length >= 6) result += '-' + digits.slice(6, 8);
    if (digits.length >= 8) result += '-' + digits.slice(8, 10);
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.phone.length < 16) {
      setError('Введите полный номер телефона');
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('phone', formData.phone);
      body.append('email', formData.email);
      body.append('message', formData.message);

      const response = await fetch('/api/send-form.php', {
        method: 'POST',
        body
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      setError('Ошибка отправки. Позвоните: +7 (963) 600-60-06');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Связаться с нами</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">Заявка отправлена!</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ваше имя</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Иван Иванов"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Телефон *</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: formatPhone(e.target.value)})}
              placeholder="+7 (___) ___-__-__"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="example@mail.ru"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Сообщение</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Опишите ваш вопрос..."
              rows={5}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Отправка...</> : 'Отправить'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-gray-600">Или позвоните нам:</p>
          <a href="tel:+79636006006" className="text-xl font-semibold text-blue-600 hover:underline flex items-center justify-center gap-2 mt-2">
            <Phone className="h-5 w-5" />
            +7 (963) 600-60-06
          </a>
        </div>
      </div>
    </div>
  );
}
