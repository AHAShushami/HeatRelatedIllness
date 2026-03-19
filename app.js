document.addEventListener('DOMContentLoaded', () => {
    // Quiz Data
    const quizData = [
        {
            q: "1. Apakah dua (2) kriteria klinikal mandatori untuk mendiagnos pesakit sebagai menghidap Strok Haba (Heat Stroke)?",
            options: [
                "Suhu > 40°C dan dehidrasi teruk",
                "Suhu > 40°C dan disfungsi Sistem Saraf Pusat (CNS)",
                "Suhu > 38°C dan otot kejang",
                "Kelesuan melampau dan koma"
            ],
            answer: 1 // Index 1 is B
        },
        {
            q: "2. Seorang anggota tentera rebah semasa latihan kawad. Suhu badannya 40.5°C, dia meracau, tetapi kulit bajunya basah lencun dengan peluh. Apakah diagnosis yang betul?",
            options: [
                "Heat Exhaustion",
                "Classic Heat Stroke",
                "Exertional Heat Stroke",
                "Kekeringan Lampau (Severe Dehydration)"
            ],
            answer: 2
        },
        {
            q: "3. Pesakit yang disyaki Strok Haba sedang resah dan keliru di Zon Merah. Apakah sasaran kaedah Rapid Cooling yang sedang anda lakukan?",
            options: [
                "Menurunkan suhu teras kepada 37°C dalam masa 1 jam",
                "Menurunkan suhu teras kepada 39°C dalam masa 30 minit",
                "Menurunkan suhu luaran kepada 36°C secepat mungkin",
                "Memasukkan cecair IV yang disejukkan sebanyak 3 Liter berterusan"
            ],
            answer: 1
        },
        {
            q: "4. Semasa di Jabatan Kecemasan, kaedah penilaian suhu apakah yang merupakan Gold Standard bagi mengesahkan Strok Haba?",
            options: [
                "Termometer Tympanic (Telinga)",
                "Imbasan Inframerah (Dahi)",
                "Termometer Axillary (Ketiak)",
                "Termometer Rektal (Suhu Teras)"
            ],
            answer: 3
        },
        {
            q: "5. Antara tanda-tanda berikut, manakah merupakan satu ciri Disfungsi Sistem Saraf Pusat (CNS)?",
            options: [
                "Kekejangan otot betis",
                "Kulit kemerahan",
                "Sawan dan Delirium (meracau)",
                "Pernafasan pantas (Tachypnea)"
            ],
            answer: 2
        },
        {
            q: "6. Adakah kes Heat Cramps (Kekejangan Haba) di Zon Hijau wajib dilaporkan di dalam Reten Harian HRI?",
            options: [
                "Tidak, ia terlalu ringan",
                "Ya, semua spektrum HRI (Cramps, Exhaustion, Stroke) wajib dilaporkan",
                "Hanya laporkan jika pesakit dimasukkan ke wad",
                "Hanya dilaporkan pada penghujung tahun"
            ],
            answer: 1
        },
        {
            q: "7. Berdasarkan amaran suhu 37°C berterusan di Pokok Sena, apakah frekuensi laporan (reten) Penyakit Berkaitan Haba yang perlu dihantar oleh pihak Hospital/KK ke PKD?",
            options: [
                "Reten Mingguan",
                "Reten Bulanan",
                "Reten Harian (sebelum jam 8.00 pagi esoknya)",
                "Selepas musim panas tamat"
            ],
            answer: 2
        },
        {
            q: "8. Siapakah yang WAJIB mengesahkan diagnosis HRI pesakit (verifikasi) sebelum ia dilaporkan ke dalam rekod KKM?",
            options: [
                "Pegawai Perubatan (MO) yang merawat",
                "Jururawat Terlatih Triage",
                "Pakar Perubatan Kecemasan (EP) / Pakar Perubatan Keluarga (FMS)",
                "Pengarah Hospital"
            ],
            answer: 2
        },
        {
            q: "9. Bagi kes Heat Exhaustion (Kelesuan Haba), yang manakah kenyataan yang TEPAT mengenai keadaan pesakit tersebut?",
            options: [
                "Pesakit berada dalam keadaan koma",
                "Suhu badan melebihi 40°C",
                "Status mental pesakit adalah normal dan waras",
                "Pesakit tidak berpeluh langsung"
            ],
            answer: 2
        },
        {
            q: "10. Anda menerima kes kematian akibat Strok Haba di wad. Apakah tindakan SEGERA selain merawat mayat mengikut SOP biasa?",
            options: [
                "Mendraf satu penerbitan jurnal awam",
                "Panggilan telefon kepada PKD serta-merta untuk siasatan epidemiologi",
                "Menunggu hari Isnin untuk menghantar faks",
                "Meminta waris melaporkan kematian ke CPRC"
            ],
            answer: 1
        }
    ];

    let currentStep = 0;
    const totalSteps = 6;
    let userData = {};

    // Generate Quiz UI
    const quizContainer = document.getElementById('quiz-container');
    quizData.forEach((item, index) => {
        let optionsHtml = '';
        item.options.forEach((opt, optIdx) => {
            optionsHtml += `
                <div class="relative">
                    <input class="radio-custom" type="radio" name="q${index}" id="q${index}o${optIdx}" value="${optIdx}">
                    <label for="q${index}o${optIdx}" class="quiz-label">
                        <span class="opt-char">${String.fromCharCode(65 + optIdx)}.</span>
                        <span class="opt-text">${opt}</span>
                    </label>
                </div>
            `;
        });
        quizContainer.innerHTML += `
            <div class="quiz-item">
                <p class="quiz-q">${item.q}</p>
                <div class="quiz-options">
                    ${optionsHtml}
                </div>
            </div>
        `;
    });

    window.submitRegistration = function() {
        const nama = document.getElementById('reg-nama').value;
        const ic = document.getElementById('reg-ic').value;
        const jawatan = document.getElementById('reg-jawatan').value;
        const fasiliti = document.getElementById('reg-fasiliti').value;

        if(!nama || !ic || !jawatan || !fasiliti) {
            alert("Sila lengkapkan semua medan pendaftaran.");
            return;
        }

        userData = { nama, ic, jawatan, fasiliti, date: new Date().toISOString() };
        
        document.getElementById('nav-footer').classList.remove('hidden');
        document.getElementById('progress-container').classList.remove('hidden');
        nextStep();
    }

    window.updateUI = function() {
        for(let i=0; i<=totalSteps; i++) {
            document.getElementById(`step-${i}`).classList.remove('active');
        }
        document.getElementById(`step-${currentStep}`).classList.add('active');

        if(currentStep > 0 && currentStep < totalSteps) {
            const progress = ((currentStep) / (totalSteps - 1)) * 100;
            document.getElementById('progress-bar').style.width = `${progress}%`;
        }

        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const btnSubmit = document.getElementById('btn-submit');

        if(currentStep === 1) {
            btnPrev.classList.add('hidden');
        } else if (currentStep > 1 && currentStep < totalSteps) {
            btnPrev.classList.remove('hidden');
        }

        if(currentStep === totalSteps - 1) {
            btnNext.classList.add('hidden');
            btnSubmit.classList.remove('hidden');
        } else {
            btnNext.classList.remove('hidden');
            btnSubmit.classList.add('hidden');
        }

        if(currentStep === totalSteps) {
            document.getElementById('nav-footer').classList.add('hidden');
            document.getElementById('progress-container').classList.add('hidden');
        }
    }

    window.nextStep = function() {
        if(currentStep < totalSteps) {
            currentStep++;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateUI();
        }
    }

    window.prevStep = function() {
        if(currentStep > 1) {
            currentStep--;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateUI();
        }
    }

    window.submitQuiz = function() {
        let score = 0;
        let answeredAll = true;

        quizData.forEach((item, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if(selected) {
                if(parseInt(selected.value) === item.answer) score++;
            } else {
                answeredAll = false;
            }
        });

        if(!answeredAll) {
            alert("Sila jawab semua 10 soalan sebelum menghantar.");
            return;
        }

        userData.score = score;
        userData.maxScore = quizData.length;
        
        // Show result on UI
        document.getElementById('display-nama').textContent = userData.nama;
        document.getElementById('display-score').textContent = score;
        
        nextStep();

        // Submit to Google Sheets via Web App URL
        submitToGoogleSheets(userData);
    }

    window.goHome = function() {
        if (currentStep === 0) return;
        
        if (currentStep > 0 && currentStep < totalSteps) {
            if (!confirm("Adakah anda pasti untuk kembali ke halaman utama? Kemajuan modul anda akan terpadam.")) {
                return;
            }
        }
        
        currentStep = 0;
        document.getElementById('registration-form').reset();
        const radios = document.querySelectorAll('.radio-custom');
        radios.forEach(radio => radio.checked = false);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateUI();
        
        document.getElementById('nav-footer').classList.add('hidden');
        document.getElementById('progress-container').classList.add('hidden');
    }

    function submitToGoogleSheets(data) {
        // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
        const scriptURL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL'; 
        
        if (scriptURL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
            console.warn("Google Apps Script URL has not been set yet. Data will not be saved.");
            return;
        }

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            console.log("Data successfully submitted!");
        })
        .catch((error) => {
            console.error('Error!', error.message);
        });
    }
});
