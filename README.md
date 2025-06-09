
# Finolo - Ön Muhasebe & CRM Uygulaması

Finolo, küçük ve orta ölçekli işletmeler için geliştirilen modern, hızlı ve kullanıcı dostu bir ön muhasebe ve CRM çözümüdür.

---

## ✨ Mevcut Özellikler

### Backend (Java - Spring Boot)
- [x] JWT tabanlı kullanıcı kimlik doğrulama
- [x] Kayıt / giriş işlemleri
- [x] Müşteri CRUD işlemleri
- [x] Fatura oluşturma ve listeleme
- [x] Dashboard özet verileri
- [x] Aylık fatura gelirleri (bar chart)
- [x] Ödenmiş/ödenmemiş oranı (doughnut chart)
- [x] BaseResponse yapısı
- [x] Unit test altyapısı

### Frontend (React + Vite + Tailwind)
- [x] Login / Register ekranları
- [x] Protected Routes (Token kontrollü)
- [x] Dashboard ekranı (özet kartlar + grafikler)
- [x] Müşteri ve fatura yönetimi ekranları
- [x] Reusable bileşen yapısı (Cards, Charts, Modals)
- [x] Mobil uyumlu tasarım

---

## 🚧 Yapılacaklar

-### Teknik
- [ ] Rol bazlı yetkilendirme (ADMIN / USER)
- [x] Gelişmiş form validasyonları (zaman, tutar, email)
- [ ] Export (PDF/Excel) özellikleri
- [ ] Hata yönetimi için global logging sistemi
- [ ] E-posta bildirim altyapısı (kayıt sonrası vs)

### UI / UX
- [ ] Temalandırma (Dark / Light Mode)
- [ ] Kullanıcı ayarları ekranı
- [ ] Müşteri/Fatura detay sayfaları
- [ ] Dashboard’a son işlemler bölümü
- [ ] Kullanıcı rehberi & onboarding

---

## 📁 Kurulum

```bash
git clone https://github.com/ErtasBunyamin/finolo.git
cd finolo
```

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✍️ Katkı ve Geri Bildirim

Geliştirme süreci solo olarak ilerlemektedir. Geri bildirim ve katkılar için [Issues](https://github.com/ErtasBunyamin/finolo/issues) sayfasını kullanabilirsiniz.

---

> Proje durumu: Aktif Geliştirme  
> Lisans: MIT
