import React, { useEffect, useState } from 'react';
import { fetchAds, createAd } from './services/api';

function App() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: 'دمشق',
    category: 'سيارات'
  });

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    try {
      const data = await fetchAds();
      setAds(data);
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAd(form);
      alert('تم نشر إعلانك بنجاح على منصة مزاد!');
      setForm({ title: '', description: '', price: '', city: 'دمشق', category: 'سيارات' });
      loadAds();
    } catch (error) {
      alert('حدث خطأ أثناء نشر الإعلان، يرجى المحاولة لاحقاً');
    }
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', padding: '20px' }}>
      
      {/* الهيدر والعنوان الرئيسي */}
      <header style={{ textAlign: 'center', marginBottom: '30px', padding: '20px', backgroundColor: '#1e293b', color: '#fff', borderRadius: '12px' }}>
        <h1 style={{ margin: '0 0 10px 0' }}>منصة مزاد - سوريا 🇸🇾</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>سوقك الإلكتروني الأول للبيع والشراء في جميع المحافظات</p>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* قسم إضافة إعلان جديد */}
        <div style={{ flex: '1 1 350px', backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>أضف إعلاناً جديداً</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>عنوان الإعلان:</label>
              <input type="text" placeholder="مثال: سيارة للبيع بحالة ممتازة" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>السعر (ل.س):</label>
              <input type="number" placeholder="مثال: 50000" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>المحافظة:</label>
              <select value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                <option value="دمشق">دمشق</option>
                <option value="ريف دمشق">ريف دمشق</option>
                <option value="حلب">حلب</option>
                <option value="حمص">حمص</option>
                <option value="اللاذقية">اللاذقية</option>
                <option value="طرطوس">طرطوس</option>
                <option value="حماة">حماة</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>القسم:</label>
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                <option value="سيارات">سيارات ومركبات</option>
                <option value="عقارات">عقارات</option>
                <option value="إلكترونيات">إلكترونيات وهواتف</option>
                <option value="أثاث">أثاث ومستلزمات منزلية</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>التفاصيل والوصف:</label>
              <textarea placeholder="اكتب مواصفات المنتج وطريقة التواصل..." value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required rows="4" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              نشر الإعلان الآن
            </button>
          </form>
        </div>

        {/* قسم عرض الإعلانات */}
        <div style={{ flex: '2 1 500px' }}>
          <h2 style={{ marginTop: 0, color: '#0f172a' }}>الإعلانات المعروضة</h2>
          
          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>جاري تحميل الإعلانات من السيرفر...</p>
          ) : ads.length === 0 ? (
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', textAlign: 'center', color: '#64748b' }}>
              لا توجد إعلانات معروضة حالياً. كن أول من يضيف إعلاناً!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {ads.map((ad) => (
                <div key={ad._id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderRight: '5px solid #2563eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, color: '#1e293b' }}>{ad.title}</h3>
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                      {ad.price} ل.س
                    </span>
                  </div>
                  <p style={{ color: '#475569', margin: '0 0 10px 0' }}>{ad.description}</p>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#64748b' }}>
                    <span>📍 المحافظة: <strong>{ad.city}</strong></span>
                    <span>🏷️ القسم: <strong>{ad.category}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;