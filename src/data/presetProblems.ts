import { MathProblem } from '../types';

export const PRESET_PROBLEMS: MathProblem[] = [
  {
    id: 'pyth-tangga-1',
    title: 'Panjang Tangga dan Teorema Pythagoras',
    gradeLevel: 'SMP',
    topic: 'Teorema Pythagoras & Geometri',
    difficulty: 'Sedang',
    questionText:
      'Sebuah tangga disandarkan pada dinding tegak sebuah rumah. Jarak ujung bawah tangga ke dinding adalah $6\\text{ m}$, sedangkan tinggi ujung atas tangga dari permukaan tanah adalah $8\\text{ m}$. Berapakah panjang tangga tersebut?',
    diagramType: 'pythagoras',
    diagramParams: {
      val1: 6,
      val2: 8,
      unit: 'm',
      label1: 'Jarak ke Dinding (a)',
      label2: 'Tinggi Dinding (b)',
      label3: 'Panjang Tangga (c)',
      caption: 'Model segitiga siku-siku: tanah dan dinding membentuk sudut 90°',
      showProof: false,
    },
    simulationInstructions:
      'Geser slider alas dan tinggi pada laboratorium untuk melihat bagaimana panjang sisi miring (tangga) berubah, lalu aktifkan "Kotak Pembuktian" untuk membuktikan $a^2 + b^2 = c^2$.',
    options: ['8 m', '10 m', '12 m', '14 m'],
    correctAnswerIndex: 1,
    correctAnswerLabel: 'B',
    explanation:
      'Berdasarkan Teorema Pythagoras pada segitiga siku-siku:\n$$c^2 = a^2 + b^2$$\n$$c^2 = 6^2 + 8^2 = 36 + 64 = 100$$\n$$c = \\sqrt{100} = 10\\text{ meter}$$\nJadi, panjang tangga tersebut adalah 10 meter.',
    keyFormula: 'c = \\sqrt{a^2 + b^2}',
    tags: ['pythagoras', 'segitiga siku-siku', 'smp'],
  },
  {
    id: 'circle-juring-taman-1',
    title: 'Luas Juring Rumput Taman Lingkaran',
    gradeLevel: 'SMP',
    topic: 'Lingkaran & Busur',
    difficulty: 'Sedang',
    questionText:
      'Sebuah taman kota berbentuk lingkaran memiliki jari-jari $r = 14\\text{ m}$. Pengelola taman ingin menanam rumput jepang pada area juring dengan sudut pusat $\\theta = 60^\\circ$. Berapakah luas area juring rumput tersebut? (Gunakan $\\pi = \\frac{22}{7}$)',
    diagramType: 'circle_sector',
    diagramParams: {
      val1: 14,
      val2: 60,
      unit: 'm',
      caption: 'Juring lingkaran dengan sudut pusat 60° dan jari-jari 14 m',
    },
    simulationInstructions:
      'Ubah slider besar sudut pusat atau pilih tombol sudut khusus (misal 90° atau 180°) untuk melihat perbandingan luas juring terhadap luas lingkaran penuh.',
    options: ['88,33 m²', '102,67 m²', '154 m²', '616 m²'],
    correctAnswerIndex: 1,
    correctAnswerLabel: 'B',
    explanation:
      'Rumus luas juring lingkaran adalah:\n$$L = \\frac{\\theta}{360^\\circ} \\times \\pi r^2$$\n$$L = \\frac{60^\\circ}{360^\\circ} \\times \\frac{22}{7} \\times 14 \\times 14$$\n$$L = \\frac{1}{6} \\times 616 \\approx 102{,}67\\text{ m}^2$$\nJadi, luas area juring yang ditanami rumput adalah sekitar $102{,}67\\text{ m}^2$.',
    keyFormula: 'L_{\\text{juring}} = \\frac{\\theta}{360^\\circ} \\times \\pi r^2',
    tags: ['lingkaran', 'juring', 'smp'],
  },
  {
    id: 'fraction-kue-ulang-tahun',
    title: 'Pembagian Kue Ulang Tahun',
    gradeLevel: 'SD',
    topic: 'Pecahan Sederhana',
    difficulty: 'Mudah',
    questionText:
      'Ibu memotong sebuah kue tart menjadi $8$ bagian sama besar. Budi dan adiknya telah memakan $3$ bagian dari kue tersebut. Berapakah nilai pecahan bagian kue yang telah dimakan, dan berapa persentase bagian tersebut?',
    diagramType: 'fraction_pie',
    diagramParams: {
      val1: 3,
      val2: 8,
      unit: 'bagian',
      caption: 'Model pecahan kue: 3 potong berwarna biru dari total 8 potong',
    },
    simulationInstructions:
      'Geser jumlah potongan kue (pembilang) dan total potongan (penyebut) untuk melihat bagaimana pecahan merepresentasikan proporsi bagian kue secara visual.',
    options: ['3/8 (37,5%)', '5/8 (62,5%)', '3/5 (60%)', '1/4 (25%)'],
    correctAnswerIndex: 0,
    correctAnswerLabel: 'A',
    explanation:
      'Pecahan dinyatakan sebagai $\\frac{\\text{bagian yang diambil}}{\\text{total potongan sama besar}} = \\frac{3}{8}$.\nDalam bentuk persentase:\n$$\\frac{3}{8} \\times 100\\% = 37{,}5\\%$$\nJadi, nilai pecahan adalah $\\frac{3}{8}$ atau $37{,}5\\%$.',
    keyFormula: '\\text{Pecahan} = \\frac{\\text{Pembilang}}{\\text{Penyebut}}',
    tags: ['pecahan', 'persentase', 'sd'],
  },
  {
    id: 'linear-grafik-tarif-taksi',
    title: 'Tarif Taksi dan Persamaan Linear',
    gradeLevel: 'SMP',
    topic: 'Persamaan Garis Lurus & Aljabar',
    difficulty: 'Sedang',
    questionText:
      'Sebuah armada taksi menetapkan tarif awal buka pintu sebesar Rp 5.000, dan tarif per kilometer perjalanan sebesar Rp 3.000. Jika jarak perjalanan dinotasikan dengan $x$ (km) dan total tarif dinotasikan dengan $y$ (ribu rupiah), tentukan persamaan garis yang menyatakan hubungan tersebut serta tarif untuk perjalanan $4\\text{ km}$!',
    diagramType: 'linear_function',
    diagramParams: {
      val1: 3,
      val2: 5,
      unit: 'ribu Rp',
      caption: 'Grafik garis lurus tarif taksi: kemiringan m = 3 dan titik potong-Y c = 5',
    },
    simulationInstructions:
      'Gerakkan slider gradien (m) untuk melihat perubahan kemiringan tarif per km, dan slider konstanta (c) untuk melihat perubahan tarif awal buka pintu.',
    options: [
      'y = 3x + 5, Tarif = Rp 17.000',
      'y = 5x + 3, Tarif = Rp 23.000',
      'y = 3x - 5, Tarif = Rp 7.000',
      'y = 4x + 5, Tarif = Rp 21.000',
    ],
    correctAnswerIndex: 0,
    correctAnswerLabel: 'A',
    explanation:
      'Bentuk umum fungsi linear adalah $y = mx + c$, di mana:\n- Gradien $m$ adalah tarif per km $= 3$ (ribu rupiah)\n- Titik potong sumbu-Y $c$ adalah tarif awal $= 5$ (ribu rupiah)\nMaka persamaan garisnya adalah $y = 3x + 5$.\nUntuk $x = 4\\text{ km}$:\n$$y = 3(4) + 5 = 12 + 5 = 17\\text{ (ribu rupiah) atau Rp 17.000}$$.',
    keyFormula: 'y = mx + c',
    tags: ['aljabar', 'garis lurus', 'smp'],
  },
  {
    id: 'trig-mercusuar-elevasi',
    title: 'Sudut Elevasi Mercusuar Pelabuhan',
    gradeLevel: 'SMA',
    topic: 'Trigonometri',
    difficulty: 'Sedang',
    questionText:
      'Seorang pengamat berada di tepi dermaga pada jarak horizontal $30\\text{ m}$ dari dasar mercusuar. Pengamat tersebut memandang puncak mercusuar dengan sudut elevasi sebesar $45^\\circ$. Berapakah tinggi mercusuar tersebut jika tinggi pengamat diabaikan? (Diketahui $\\tan 45^\\circ = 1$)',
    diagramType: 'trigonometry_elevation',
    diagramParams: {
      val1: 30,
      val2: 30,
      val3: 45,
      unit: 'm',
      caption: 'Pengamat pada jarak 30 m melihat puncak mercusuar dengan sudut elevasi 45°',
    },
    simulationInstructions:
      'Geser jarak pengamat atau tinggi mercusuar untuk melihat bagaimana besar sudut pandang (elevasi) berubah secara dinamis sesuai perbandingan $\\tan(\\alpha) = \\frac{\\text{depan}}{\\text{samping}}$.',
    options: ['15 m', '30 m', '30√3 m', '60 m'],
    correctAnswerIndex: 1,
    correctAnswerLabel: 'B',
    explanation:
      'Pada segitiga siku-siku, hubungan trigonometri tangen adalah:\n$$\\tan(\\alpha) = \\frac{\\text{sisi depan (tinggi)}}{\\text{sisi samping (jarak)}}$$\n$$\\tan(45^\\circ) = \\frac{t}{30}$$\n$$1 = \\frac{t}{30} \\implies t = 30\\text{ meter}$$\nJadi, tinggi mercusuar tersebut adalah 30 meter.',
    keyFormula: '\\tan(\\theta) = \\frac{\\text{depan}}{\\text{samping}}',
    tags: ['trigonometri', 'sma'],
  },
  {
    id: 'quad-lintasan-roket',
    title: 'Lintasan Ketinggian Roket Air (Fungsi Kuadrat)',
    gradeLevel: 'SMA',
    topic: 'Fungsi Kuadrat & Parabola',
    difficulty: 'Sulit',
    questionText:
      'Sebuah roket air diluncurkan vertikal ke udara. Ketinggian roket $h(t)$ dalam meter setelah $t$ detik dimodelkan oleh fungsi kuadrat $h(t) = -t^2 + 6t$. Berapakah ketinggian maksimum yang dapat dicapai roket tersebut dan pada detik keberapakah ketinggian maksimum itu tercapai?',
    diagramType: 'quadratic_function',
    diagramParams: {
      val1: -1,
      val2: 6,
      val3: 0,
      unit: 'm',
      caption: 'Parabola lintasan roket air membuka ke bawah dengan titik puncak di detik ke-3',
    },
    simulationInstructions:
      'Ubah koefisien a, b, dan c pada laboratorium simulasi untuk mengamati bagaimana nilai diskriminan dan koordinat titik puncak parabola bergerak.',
    options: [
      'Tinggi maksimum 6 m pada detik ke-3',
      'Tinggi maksimum 9 m pada detik ke-3',
      'Tinggi maksimum 12 m pada detik ke-6',
      'Tinggi maksimum 18 m pada detik ke-4',
    ],
    correctAnswerIndex: 1,
    correctAnswerLabel: 'B',
    explanation:
      'Untuk fungsi kuadrat $h(t) = at^2 + bt + c$ dengan $a = -1, b = 6, c = 0$:\n1. Waktu mencapai titik puncak (sumbu simetri):\n$$t_p = -\\frac{b}{2a} = -\\frac{6}{2(-1)} = 3\\text{ detik}$$\n2. Ketinggian maksimum (nilai optimum):\n$$h_{\\text{maks}} = h(3) = -(3)^2 + 6(3) = -9 + 18 = 9\\text{ meter}$$\nJadi, ketinggian maksimum adalah 9 meter pada detik ke-3.',
    keyFormula: 'y_p = -\\frac{D}{4a} = -\\frac{b^2 - 4ac}{4a}',
    tags: ['fungsi kuadrat', 'parabola', 'sma'],
  },
  {
    id: 'scale-neraca-aljabar',
    title: 'Menyelesaikan Persamaan Linear dengan Neraca Timbangan',
    gradeLevel: 'SMP',
    topic: 'Persamaan Linear Satu Variabel',
    difficulty: 'Mudah',
    questionText:
      'Sebuah neraca timbangan berada dalam keadaan seimbang sempurna. Di piringan kiri terdapat $2$ buah kotak misterius berbobot identik masing-masing seberat $x\\text{ kg}$ dan $3$ buah bola besi seberat masing-masing $1\\text{ kg}$. Di piringan kanan terdapat $11$ buah bola besi yang sama seberat masing-masing $1\\text{ kg}$. Berapakah bobot $x$ dari satu kotak misterius tersebut?',
    diagramType: 'scale_balance',
    diagramParams: {
      val1: 2,
      val2: 3,
      val3: 11,
      unit: 'kg',
      caption: 'Model neraca timbangan seimbang: 2x + 3 = 11',
    },
    simulationInstructions:
      'Eksplorasi neraca aljabar: jika Anda mengurangi 3 bola dari kedua sisi, berapa bola yang tersisa untuk dibagi rata ke 2 kotak x?',
    options: ['2 kg', '3 kg', '4 kg', '5 kg'],
    correctAnswerIndex: 2,
    correctAnswerLabel: 'C',
    explanation:
      'Model persamaan linear dari neraca yang seimbang adalah:\n$$2x + 3 = 11$$\nKurangkan 3 dari kedua ruas:\n$$2x = 11 - 3$$\n$$2x = 8$$\nBagi kedua ruas dengan 2:\n$$x = \\frac{8}{2} = 4\\text{ kg}$$\nJadi, bobot 1 kotak misterius adalah 4 kg.',
    keyFormula: 'ax + b = c \\implies x = \\frac{c - b}{a}',
    tags: ['aljabar', 'persamaan linear', 'smp'],
  },
  {
    id: 'spinner-roda-peluang',
    title: 'Peluang Teoritis Roda Putar Berhadiah',
    gradeLevel: 'SMP',
    topic: 'Peluang & Teori Probabilitas',
    difficulty: 'Mudah',
    questionText:
      'Dalam sebuah festival sekolah, terdapat permainan roda putar (spinner) yang dibagi menjadi $8$ juring kongruen (sama besar). Dari ke-8 juring tersebut, terdapat $2$ juring berwarna merah berlabel hadiah utama. Berapakah peluang seorang peserta memutar roda dan jarum menunjuk ke juring merah berhadiah?',
    diagramType: 'probability_spinner',
    diagramParams: {
      val1: 2,
      val2: 8,
      unit: 'juring',
      caption: 'Roda putar peluang: 2 juring target dari total 8 juring sama besar',
    },
    simulationInstructions:
      'Tekan tombol "Putar Roda Sekarang!" pada simulator beberapa kali untuk melihat apakah frekuensi kemunculan empiris mendekati peluang teoritis 25%.',
    options: ['1/8 (12,5%)', '1/4 (25%)', '3/8 (37,5%)', '1/2 (50%)'],
    correctAnswerIndex: 1,
    correctAnswerLabel: 'B',
    explanation:
      'Peluang suatu kejadian $A$ didefinisikan sebagai:\n$$P(A) = \\frac{n(A)}{n(S)}$$\ndi mana:\n- $n(A) = 2$ (banyaknya juring merah)\n- $n(S) = 8$ (ruang sampel seluruh juring)\nMaka:\n$$P(A) = \\frac{2}{8} = \\frac{1}{4} = 0{,}25 = 25\\%$$\nJadi, peluangnya adalah $\\frac{1}{4}$ atau $25\\%$.',
    keyFormula: 'P(A) = \\frac{n(A)}{n(S)}',
    tags: ['peluang', 'probabilitas', 'smp'],
  },
  {
    id: 'angle-garis-berpelurus',
    title: 'Besar Sudut Saling Berpelurus',
    gradeLevel: 'SMP',
    topic: 'Garis dan Sudut',
    difficulty: 'Mudah',
    questionText:
      'Garis lurus $AB$ dipotong oleh sinar garis $OC$ di titik $O$, membentuk dua sudut yang saling berpelurus: $\\angle AOC$ dan $\\angle BOC$. Jika besar $\\angle AOC = 115^\\circ$, tentukanlah besar sudut pelurusnya yaitu $\\angle BOC$!',
    diagramType: 'angle_geometry',
    diagramParams: {
      val1: 115,
      val2: 65,
      unit: 'derajat',
      caption: 'Sudut saling berpelurus: ∠AOC + ∠BOC = 180°',
    },
    simulationInstructions:
      'Geser slider besar sudut α untuk melihat bagaimana sudut β secara otomatis menyesuaikan diri agar jumlah keduanya selalu tepat 180°.',
    options: ['55°', '65°', '75°', '85°'],
    correctAnswerIndex: 1,
    correctAnswerLabel: 'B',
    explanation:
      'Dua sudut yang saling berpelurus (suplemen) memiliki jumlah sudut tepat $180^\\circ$:\n$$\\angle AOC + \\angle BOC = 180^\\circ$$\n$$115^\\circ + \\angle BOC = 180^\\circ$$\n$$\\angle BOC = 180^\\circ - 115^\\circ = 65^\\circ$$\nJadi, besar $\\angle BOC$ adalah $65^\\circ$.',
    keyFormula: '\\alpha + \\beta = 180^\\circ',
    tags: ['sudut', 'geometri', 'smp'],
  },
  {
    id: 'area-kebun-persegi-panjang',
    title: 'Keliling dan Luas Kebun Sayur',
    gradeLevel: 'SD',
    topic: 'Pengukuran Bangun Datar',
    difficulty: 'Mudah',
    questionText:
      'Pak Ahmad memiliki sebidang kebun sayur berbentuk persegi panjang dengan ukuran panjang $15\\text{ m}$ dan lebar $8\\text{ m}$. Pak Ahmad ingin memasang pagar kawat mengelilingi seluruh kebun tersebut. Berapakah panjang kawat yang dibutuhkan untuk mengelilingi kebun tersebut?',
    diagramType: 'area_perimeter',
    diagramParams: {
      val1: 15,
      val2: 8,
      unit: 'm',
      label1: 'Panjang (p)',
      label2: 'Lebar (l)',
      caption: 'Kebun persegi panjang: panjang 15 m dan lebar 8 m',
    },
    simulationInstructions:
      'Geser panjang dan lebar pada simulator untuk melihat bagaimana luas ($p \\times l$) dan keliling ($2(p + l)$) dihitung secara instan.',
    options: ['23 m', '46 m', '120 m', '140 m'],
    correctAnswerIndex: 1,
    correctAnswerLabel: 'B',
    explanation:
      'Panjang kawat yang dibutuhkan untuk mengelilingi kebun sama dengan keliling persegi panjang:\n$$K = 2 \\times (p + l)$$\n$$K = 2 \\times (15 + 8) = 2 \\times 23 = 46\\text{ meter}$$\n(Sebagai perbandingan, luas kebun adalah $L = 15 \\times 8 = 120\\text{ m}^2$).\nJadi, panjang kawat yang dibutuhkan adalah 46 meter.',
    keyFormula: 'K = 2(p + l)',
    tags: ['bangun datar', 'keliling', 'sd'],
  },
];
