const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// Canvas'ı tam ekran yap
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // İlk açılışta boyutu ayarla

// Kalp Formülü Parametreleri
let time = 0;

function drawHeart() {
    // Ekranı her karede temizle (Hafif iz bırakması için temizleme rengini siyah yapıyoruz)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Bu hafif iz bırakır, kapatmak istersen 'black' yap
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // --- Kalp Atışı Animasyonu (Pulsing) ---
    // Math.sin(time) -1 ile 1 arasında değişir. Bunu büyüme çarpanı olarak kullanacağız.
    // 0.9 ile 1.1 arasında gidip gelen bir ölçek yaratırız.
    const pulseFactor = 1 + 0.1 * Math.sin(time * 5); // 5 hızı ayarlar
    
    // Devasa boyutu ayarla (Ekranın küçük boyutuna göre ölçekle)
    const baseSize = Math.min(canvas.width, canvas.height) * 0.4; 
    const finalSize = baseSize * pulseFactor;

    // --- Işıklı Renk Efektleri (Neon Glow) ---
    ctx.shadowBlur = 40 + 20 * Math.sin(time * 5); // Işığın şiddeti de atışla birlikte değişsin
    ctx.shadowColor = 'rgba(255, 0, 50, 1)'; // Canlı kırmızı/pembe ışık rengi
    ctx.strokeStyle = 'rgba(255, 50, 80, 0.9)'; // Kalbin ana hat rengi
    ctx.lineWidth = 5;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Kalbin içinin hafif kırmızı dolgusu (Opsiyonel, kapatmak için transparency'i 0 yap)

    ctx.beginPath();
    
    // --- Kalp Çizim Formülü (Yüksek Çözünürlüklü) ---
    // Geleneksel kalp eğrisi formülü
    for (let i = 0; i < Math.PI * 2; i += 0.01) {
        // Formül: x = 16sin^3(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
        let xt = 16 * Math.pow(Math.sin(i), 3);
        let yt = 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i);
        
        // Formülü canvas koordinatlarına ve boyutuna uyarla
        // (Not: y ekseni canvas'ta aşağı doğrudur, bu yüzden -yt kullanıyoruz)
        let x = centerX + xt * (finalSize / 20);
        let y = centerY - yt * (finalSize / 20);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.closePath();
    ctx.stroke(); // Çizgiyi çiz (Işıklı ana hat)
    ctx.fill();   // İçini doldur (Hafif dolgu)

    // Gölgeleri temizle (Diğer çizimleri etkilememesi için iyi alışkanlık)
    ctx.shadowBlur = 0;

    // Zamanı ilerlet (Animasyon hızı)
    time += 0.02;
}

// Animasyon Döngüsü
function animate() {
    drawHeart();
    requestAnimationFrame(animate); // Sonraki kareyi çiz
}

// Başlat
animate();
